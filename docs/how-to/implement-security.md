# How to Implement Security

> **Purpose:** Step-by-step implementation guide for security features in the Krawl application.

**Version:** 2.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Security Team

---

## Prerequisites

- Spring Boot 3.x backend setup
- Next.js 14+ frontend setup
- PostgreSQL 14+ with PostGIS
- Basic understanding of JWT authentication

---

## 1. Implement Password Hashing

### Backend (Spring Boot)

**Step 1:** Add Spring Security dependency to `pom.xml` or `build.gradle`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

**Step 2:** Create password service:

```java
@Service
public class PasswordService {
    private final BCryptPasswordEncoder encoder = 
        new BCryptPasswordEncoder(12); // Cost factor 12
    
    public String hashPassword(String plaintext) {
        return encoder.encode(plaintext);
    }
    
    public boolean verifyPassword(String plaintext, String hashed) {
        return encoder.matches(plaintext, hashed);
    }
}
```

**Step 3:** Use in registration:

```java
@PostMapping("/register")
public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterRequest request) {
    // Hash password before saving
    String hashedPassword = passwordService.hashPassword(request.getPassword());
    
    User user = new User();
    user.setEmail(request.getEmail());
    user.setPasswordHash(hashedPassword); // Store hash, not plaintext
    userRepository.save(user);
    
    return ResponseEntity.ok(toDTO(user));
}
```

**✅ Verification:** Passwords should never be readable in database.

---

## 2. Implement JWT Authentication

### Backend Implementation

**Step 1:** Add JWT dependency:

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

**Step 2:** Create JWT provider:

```java
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration:86400000}") // 24 hours default
    private long jwtExpiration;
    
    public String generateToken(Authentication auth) {
        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);
        
        return Jwts.builder()
            .setSubject(principal.getId().toString())
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS256, jwtSecret)
            .compact();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    public UUID getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody();
        return UUID.fromString(claims.getSubject());
    }
}
```

**Step 3:** Create authentication filter:

```java
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                UUID userId = tokenProvider.getUserIdFromToken(jwt);
                User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("User not found"));
                
                UserPrincipal principal = UserPrincipal.create(user);
                UsernamePasswordAuthenticationToken auth = 
                    new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication", ex);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

**Step 4:** Configure Spring Security:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/v1/auth/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/gems/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/v1/**").authenticated()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

### Frontend Implementation

**Step 1:** Create auth service:

```typescript
// lib/auth.ts
export class AuthService {
  private static TOKEN_KEY = 'auth_token';
  
  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
```

**Step 2:** Add auth header to API requests:

```typescript
// lib/api-client.ts
export async function apiRequest(url: string, options: RequestInit = {}) {
  const token = AuthService.getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (response.status === 401) {
    AuthService.removeToken();
    window.location.href = '/login';
  }
  
  return response;
}
```

**✅ Verification:** Protected endpoints return 401 without token, 200 with valid token.

---

## 3. Implement Rate Limiting

### Backend (Spring Boot with Resilience4j)

**Step 1:** Add dependency:

```xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-ratelimiter</artifactId>
</dependency>
```

**Step 2:** Configure rate limiters:

```yaml
# application.yml
resilience4j.ratelimiter:
  instances:
    auth:
      limitForPeriod: 5
      limitRefreshPeriod: 15m
      timeoutDuration: 5s
    api:
      limitForPeriod: 100
      limitRefreshPeriod: 1m
      timeoutDuration: 0s
```

**Step 3:** Create rate limit annotation:

```java
@Aspect
@Component
public class RateLimitAspect {
    
    private final Map<String, RateLimiter> rateLimiters = new ConcurrentHashMap<>();
    
    @Around("@annotation(rateLimited)")
    public Object rateLimit(ProceedingJoinPoint joinPoint, RateLimited rateLimited) throws Throwable {
        String clientId = getClientIdentifier();
        String limiterName = rateLimited.name();
        
        RateLimiter rateLimiter = rateLimiters.computeIfAbsent(
            limiterName,
            name -> RateLimiter.of(name, RateLimiterConfig.ofDefaults())
        );
        
        if (!rateLimiter.acquirePermission()) {
            throw new RateLimitExceededException("Rate limit exceeded. Please try again later.");
        }
        
        return joinPoint.proceed();
    }
    
    private String getClientIdentifier() {
        ServletRequestAttributes attributes = 
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return attributes.getRequest().getRemoteAddr();
    }
}
```

**Step 4:** Apply to endpoints:

```java
@PostMapping("/login")
@RateLimited(name = "auth")
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    // Login logic
}
```

**✅ Verification:** 6th request within 15 minutes returns HTTP 429.

---

## 4. Implement Input Validation

### Backend Validation

**Step 1:** Add validation annotations to DTOs:

```java
public class CreateGemRequest {
    
    @NotBlank(message = "Gem name is required")
    @Size(min = 3, max = 255, message = "Name must be 3-255 characters")
    private String name;
    
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;
    
    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;
}
```

**Step 2:** Enable validation in controller:

```java
@PostMapping
public ResponseEntity<GemDTO> createGem(
    @Valid @RequestBody CreateGemRequest request,
    @AuthenticationPrincipal UserPrincipal user
) {
    // Request is automatically validated
    Gem gem = gemService.createGem(request, user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(gem));
}
```

**Step 3:** Handle validation errors:

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
        MethodArgumentNotValidException ex
    ) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
        
        return ResponseEntity
            .badRequest()
            .body(new ErrorResponse("Validation failed", errors));
    }
}
```

### Frontend Validation

**Step 1:** Create validation schema (using Zod):

```typescript
import { z } from 'zod';

export const gemSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(255, 'Name must not exceed 255 characters'),
  description: z.string()
    .max(2000, 'Description must not exceed 2000 characters')
    .optional(),
  latitude: z.number()
    .min(-90, 'Invalid latitude')
    .max(90, 'Invalid latitude'),
  longitude: z.number()
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude'),
});

export type GemFormData = z.infer<typeof gemSchema>;
```

**Step 2:** Use in form:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function AddGemForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<GemFormData>({
    resolver: zodResolver(gemSchema),
  });
  
  const onSubmit = async (data: GemFormData) => {
    await apiRequest('/api/v1/gems', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* Other fields */}
    </form>
  );
}
```

**✅ Verification:** Invalid input is rejected before submission; backend validates again.

---

## 5. Implement XSS Prevention

### Frontend (React/Next.js)

**React automatically escapes content, but for HTML:**

```typescript
import DOMPurify from 'dompurify';

export function SafeHTMLDisplay({ htmlContent }: { htmlContent: string }) {
  const sanitized = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href'],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

### Backend Sanitization

```java
@Component
public class InputSanitizer {
    
    private final PolicyFactory policy = new HtmlPolicyBuilder()
        .allowElements("p", "br", "strong", "em")
        .allowAttributes("href").onElements("a")
        .toFactory();
    
    public String sanitizeHtml(String input) {
        if (input == null) return null;
        return policy.sanitize(input);
    }
}
```

**✅ Verification:** Script tags and malicious HTML are removed/escaped.

---

## 6. Implement HTTPS & Security Headers

### Frontend (Next.js)

**Configure security headers in `next.config.js`:**

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          }
        ]
      }
    ];
  }
};
```

### Backend (Spring Boot)

```java
@Configuration
public class SecurityHeadersConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers()
            .contentSecurityPolicy("default-src 'self'")
            .and()
            .frameOptions().deny()
            .and()
            .xssProtection().block(true)
            .and()
            .contentTypeOptions();
        
        return http.build();
    }
}
```

**✅ Verification:** Check headers with browser dev tools or `curl -I`.

---

## 7. Implement Database Security

### Secure Connection

**Configure `application.yml`:**

```yaml
spring:
  datasource:
    url: ${DATABASE_URL}?ssl=true&sslmode=require
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 10
      connection-timeout: 30000
```

### Use Parameterized Queries

**✅ Safe (JPA):**

```java
@Query("SELECT g FROM Gem g WHERE g.name LIKE %:name%")
List<Gem> findByNameContaining(@Param("name") String name);
```

**❌ Unsafe:**

```java
// NEVER DO THIS
String query = "SELECT * FROM gems WHERE name = '" + userInput + "'";
```

**✅ Verification:** SQL injection attempts fail safely.

---

## 8. Implement Security Monitoring

### Add Logging

```java
@Component
@Aspect
public class SecurityAuditLogger {
    
    private static final Logger log = LoggerFactory.getLogger("SECURITY_AUDIT");
    
    @After("@annotation(AuditLog)")
    public void logSecurityEvent(JoinPoint joinPoint, AuditLog auditLog) {
        String username = SecurityContextHolder.getContext()
            .getAuthentication().getName();
        String action = auditLog.action();
        String ipAddress = getClientIp();
        
        log.info("AUDIT | User: {} | Action: {} | IP: {} | Time: {}",
            username, action, ipAddress, Instant.now());
    }
}
```

**Usage:**

```java
@AuditLog(action = "DELETE_GEM")
@DeleteMapping("/{gemId}")
public ResponseEntity<Void> deleteGem(@PathVariable UUID gemId) {
    gemService.delete(gemId);
    return ResponseEntity.noContent().build();
}
```

**✅ Verification:** Check logs for security events.

---

## 9. Test Security Implementation

### Authentication Tests

```java
@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationTests {
    
    @Test
    public void testLoginWithValidCredentials() throws Exception {
        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"user@test.com\",\"password\":\"Test123\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").exists());
    }
    
    @Test
    public void testAccessProtectedEndpointWithoutToken() throws Exception {
        mockMvc.perform(post("/api/v1/gems"))
            .andExpect(status().isUnauthorized());
    }
    
    @Test
    public void testAccessProtectedEndpointWithToken() throws Exception {
        String token = obtainAccessToken();
        
        mockMvc.perform(post("/api/v1/gems")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Test\",\"latitude\":14.0,\"longitude\":121.0}"))
            .andExpect(status().isCreated());
    }
}
```

### Input Validation Tests

```java
@Test
public void testCreateGemWithInvalidInput() throws Exception {
    mockMvc.perform(post("/api/v1/gems")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"AB\",\"latitude\":999,\"longitude\":-999}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors").isArray());
}
```

**✅ Verification:** All security tests pass.

---

## Troubleshooting

### Common Issues

**JWT token not recognized:**
- Check Authorization header format: `Bearer <token>`
- Verify JWT secret matches in configuration
- Ensure token hasn't expired

**CORS errors:**
- Verify origin is in allowed list
- Check credentials are allowed
- Ensure preflight requests succeed

**Rate limiting not working:**
- Check client identifier logic
- Verify rate limiter configuration
- Test with multiple requests quickly

---

## 📚 Related Documents

- [Security Approach](../explanation/security-approach.md) - Security philosophy
- [Security Requirements](../reference/security-requirements.md) - Standards and specifications
- [API Documentation](../reference/api-endpoints.md) - API security details
- [Testing Plan](../reference/testing-plan.md) - Security testing procedures

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.0 | 2025-10-31 | Split from security-plan.md, focused on implementation | Security Team |
| 1.0.0 | 2025-10-28 | Original security plan | Security Team |

---

*Document maintained by Security Team • Last reviewed: 2025-10-31*

