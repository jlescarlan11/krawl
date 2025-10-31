# Security Requirements: Krawl

> **Purpose:** This document specifies the technical security requirements, standards, and compliance measures for the Krawl application.

**Version:** 2.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Security Team

---

## Quick Reference

| Category | Requirement | Standard |
|----------|-------------|----------|
| **Password** | 8+ chars, mixed case, number | BCrypt cost 12 |
| **Token** | JWT, 24-hour expiration | HS256 algorithm |
| **TLS** | Minimum TLS 1.2 | Prefer TLS 1.3 |
| **Rate Limit** | Auth: 5/15min, API: 100/min | HTTP 429 on exceed |
| **Session** | 24-hour timeout | 30-day max lifetime |

---

## Authentication Requirements

### Password Standards

**Minimum Requirements:**

| Requirement | Specification |
|-------------|--------------|
| **Length** | Minimum 8 characters |
| **Uppercase** | At least 1 uppercase letter (A-Z) |
| **Lowercase** | At least 1 lowercase letter (a-z) |
| **Number** | At least 1 digit (0-9) |
| **Special Characters** | Optional but recommended |
| **Common Passwords** | Blocked (check against top 10,000 list) |
| **Hashing Algorithm** | BCrypt with cost factor 12 |
| **Storage** | Never store plaintext |
| **Transmission** | Only over HTTPS |

**Rejected Passwords:**
- Less than 8 characters
- All lowercase or all uppercase
- No numbers
- Common passwords (e.g., "password123", "qwerty")
- Sequential characters (e.g., "12345678", "abcdefgh")

---

### JWT Token Specifications

**Token Structure:**

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "uuid-123",
    "email": "user@example.com",
    "iat": 1698508800,
    "exp": 1698595200
  }
}
```

**Standards:**

| Property | Value | Rationale |
|----------|-------|-----------|
| **Algorithm** | HS256 (HMAC-SHA256) | Symmetric, fast, secure |
| **Access Token Expiration** | 24 hours | Balance security and UX |
| **Refresh Token Expiration** | 30 days | Reasonable re-auth interval |
| **Token Storage (Client)** | localStorage or memory | Accessible to JavaScript |
| **Refresh Token Storage** | HttpOnly cookie | XSS protection |
| **Secret Key Length** | Minimum 256 bits | Strong cryptographic security |

---

### Session Management Standards

| Parameter | Specification |
|-----------|--------------|
| **Session Type** | Stateless (JWT-based) |
| **Inactivity Timeout** | 24 hours |
| **Maximum Lifetime** | 30 days |
| **Concurrent Sessions** | Allowed (up to 5 devices) |
| **Post-Password-Change** | Force logout all sessions |
| **Post-Account-Deletion** | Immediate token blacklist |

---

## Authorization Requirements

### Permission Matrix

| Resource | Anonymous | User | Moderator | Admin |
|----------|-----------|------|-----------|-------|
| **View Gems** | ✅ Read | ✅ Read | ✅ Read | ✅ Read |
| **Create Gem** | ❌ | ✅ | ✅ | ✅ |
| **Edit Gem** | ❌ | ✅ Own only | ✅ Any | ✅ Any |
| **Delete Gem** | ❌ | ✅ Own only | ✅ Flagged | ✅ Any |
| **Vouch for Gem** | ❌ | ✅ | ✅ | ✅ |
| **Rate Gem** | ❌ | ✅ | ✅ | ✅ |
| **Create Krawl** | ❌ | ✅ | ✅ | ✅ |
| **Edit Krawl** | ❌ | ✅ Own only | ✅ Any | ✅ Any |
| **Delete Krawl** | ❌ | ✅ Own only | ✅ Flagged | ✅ Any |
| **Review Reports** | ❌ | ❌ | ✅ | ✅ |
| **Ban Users** | ❌ | ❌ | ❌ | ✅ |

---

## Encryption Standards

### Data at Rest

| Data Type | Encryption Method | Key Management |
|-----------|------------------|----------------|
| **Passwords** | BCrypt (one-way hash, cost 12) | N/A (irreversible) |
| **Sensitive User Data** | AES-256-GCM | Cloud KMS |
| **Database Backups** | AES-256 | Encrypted storage |
| **File Uploads** | Provider encryption (Cloudinary) | Cloud managed |

---

### Data in Transit

**Transport Layer Security (TLS):**

| Parameter | Requirement |
|-----------|------------|
| **Protocol** | TLS 1.3 (minimum TLS 1.2) |
| **Cipher Suite** | ECDHE-RSA-AES256-GCM-SHA384 |
| **Certificate Provider** | Let's Encrypt (auto-renewed) |
| **HSTS** | Enabled (max-age=31536000) |
| **HTTP Enforcement** | All HTTP → HTTPS redirect |
| **Certificate Transparency** | Enabled |

---

## API Security Requirements

### Rate Limiting

| Endpoint Category | Rate Limit | Time Window | Action on Exceed |
|-------------------|------------|-------------|------------------|
| **Authentication** | 5 requests | 15 minutes | Block for 1 hour |
| **Gem Creation** | 10 gems | 1 hour | HTTP 429 + warning |
| **Krawl Creation** | 5 krawls | 1 hour | HTTP 429 |
| **Ratings/Vouches** | 50 actions | 1 hour | HTTP 429 |
| **General API** | 100 requests | 1 minute | HTTP 429 |
| **Search/Browse** | 200 requests | 1 minute | HTTP 429 |

**HTTP 429 Response Format:**

```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 3600,
  "message": "Too many requests. Please try again later."
}
```

Password reset endpoints:
- `POST /api/v1/auth/password/reset-request` and `POST /api/v1/auth/password/reset` are subject to the Authentication rate limit.
- Responses for reset-request are always generic (200) to prevent user enumeration.

---

### CORS Policy

**Allowed Origins:**

| Environment | Origin | Credentials |
|-------------|--------|-------------|
| **Production** | `https://krawl.app` | ✅ Allowed |
| **Staging** | `https://staging.krawl.app` | ✅ Allowed |
| **Development** | `http://localhost:3000` | ✅ Allowed |

**Allowed Methods:** `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`  
**Allowed Headers:** `Authorization`, `Content-Type`  
**Max Age:** 3600 seconds (1 hour)  
**Credentials:** Allowed for whitelisted origins only

**Security Rule:** No wildcard (`*`) origins in production.

---

### Input Validation Standards

**General Rules:**

| Field Type | Max Length | Validation | Sanitization |
|------------|-----------|------------|--------------|
| **Gem Name** | 255 chars | Required, 3-255 chars | HTML escaped |
| **Description** | 2000 chars | Optional | HTML sanitized |
| **Email** | 255 chars | RFC 5322 format | Lowercase |
| **Username** | 50 chars | Alphanumeric + underscore | Trimmed |
| **Tags** | 50 chars each | Max 10 tags | Lowercase, trimmed |
| **Coordinates** | N/A | Lat: -90 to 90, Lng: -180 to 180 | Number validation |

**Rejected Input:**
- SQL keywords in user input
- Script tags (`<script>`)
- Null bytes (`\0`)
- Excessively long strings
- Invalid coordinate ranges

---

## Data Classification

### Sensitivity Levels

**🔴 Critical (Encrypted at rest)**
- Passwords (BCrypt hashed)
- Payment information (future)
- API keys and secrets
- Private encryption keys

**🟡 Sensitive (Access controlled)**
- Email addresses
- User profiles (name, bio)
- Private Krawls
- IP addresses (logged temporarily)
- Session tokens

**🟢 Public (No restrictions)**
- Public Gems
- Public Krawls
- User ratings and vouches
- Usernames
- Public photos

---

## Compliance Requirements

### Data Retention Policy

**Active Users:**

| Data Type | Retention Period |
|-----------|-----------------|
| Profile data | Indefinite (until user deletion) |
| Activity logs | 90 days |
| IP addresses | 30 days |
| Authentication logs | 90 days |

**Deleted Users:**

| Data Type | Action |
|-----------|--------|
| Personal data (email, name, bio) | Immediate deletion |
| Created content (Gems, Krawls) | Anonymized (user ID removed) |
| Ratings and vouches | Deleted |
| Backups containing deleted data | Purged within 30 days |

**Audit Logs:**

| Log Type | Retention Period |
|----------|-----------------|
| Security events | 1 year |
| Admin actions | 2 years |
| Access logs | 90 days |

---

### User Privacy Rights

**Required Implementations:**

| Right | API Endpoint | Response Time |
|-------|-------------|---------------|
| **Right to Access** | `GET /api/v1/users/me/export` | Within 30 days |
| **Right to Rectification** | `PUT /api/v1/users/me` | Immediate |
| **Right to Erasure** | `DELETE /api/v1/users/me` | Within 30 days |
| **Right to Portability** | `GET /api/v1/users/me/export` | Within 30 days |
| **Right to Object** | `PUT /api/v1/users/me/preferences` | Immediate |

---

### Cookie Requirements

| Cookie Name | Type | Purpose | Expiration | HttpOnly | Secure | SameSite |
|-------------|------|---------|------------|----------|--------|----------|
| `refresh_token` | Essential | Token refresh | 30 days | ✅ Yes | ✅ Yes | Lax |
| `session_id` | Essential | Session tracking | Session | ✅ Yes | ✅ Yes | Strict |
| `preferences` | Functional | User settings | 1 year | ❌ No | ✅ Yes | Lax |
| `analytics` | Analytics | Usage tracking | 1 year | ❌ No | ✅ Yes | Lax |

**Consent Required:** Functional and Analytics cookies (Essential cookies exempt)

---

## Infrastructure Requirements

### Firewall Rules

**Inbound Traffic:**

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 443 | TCP | Any | HTTPS (Application) |
| 80 | TCP | Any | HTTP (Redirect to HTTPS) |
| 22 | TCP | Admin IPs only | SSH (Key-based only) |

**Blocked Ports:** All other ports closed

---

### Database Security

**PostgreSQL Configuration:**

| Setting | Value | Purpose |
|---------|-------|---------|
| **SSL Mode** | `require` or `verify-full` | Encrypted connections |
| **Max Connections** | 100 | Prevent resource exhaustion |
| **Connection Timeout** | 10 seconds | Avoid hanging connections |
| **Password Encryption** | SCRAM-SHA-256 | Secure authentication |
| **Log Connections** | Enabled | Audit trail |
| **Statement Timeout** | 30 seconds | Prevent long-running queries |

**Access Control:**
- Application user has SELECT, INSERT, UPDATE, DELETE only
- No DROP, CREATE, ALTER permissions
- No direct superuser access from application

---

### Backup Requirements

| Backup Type | Frequency | Retention | Encryption |
|-------------|-----------|-----------|------------|
| **Full Backup** | Daily (3 AM UTC) | 30 days | AES-256 |
| **Incremental** | Every 6 hours | 7 days | AES-256 |
| **Transaction Logs** | Continuous | 7 days | AES-256 |

**Disaster Recovery Metrics:**
- **RTO** (Recovery Time Objective): 4 hours
- **RPO** (Recovery Point Objective): 1 hour
- **Backup Testing**: Monthly restoration test

---

## Security Testing Requirements

### Required Testing

| Test Type | Frequency | Tool | Pass Criteria |
|-----------|-----------|------|---------------|
| **SAST** | Every commit | SonarQube | No critical issues |
| **Dependency Scan** | Daily | npm audit, OWASP | No high/critical vulnerabilities |
| **DAST** | Weekly | OWASP ZAP | No high/critical findings |
| **Penetration Test** | Monthly | Burp Suite | No critical vulnerabilities |
| **Container Scan** | Every build | Trivy/Snyk | No critical vulnerabilities |

---

## Monitoring Requirements

### Security Metrics

| Metric | Threshold | Alert Level |
|--------|-----------|-------------|
| Failed login attempts | > 5 per user in 15 min | 🟡 Medium |
| Failed login attempts | > 100 per IP in 1 hour | 🔴 High |
| API error rate | > 5% of requests | 🟡 Medium |
| Unauthorized access attempts | > 10 per minute | 🔴 High |
| Database connection failures | > 5 in 5 minutes | 🔴 High |
| Rate limit violations | > 50 per IP in 1 hour | 🟡 Medium |

---

## Pre-Launch Security Checklist

### Mandatory Requirements

**Authentication & Authorization:**
- ✅ Password hashing with BCrypt (cost factor 12)
- ✅ JWT token implementation secure
- ✅ RBAC properly configured
- ✅ Session management tested
- ✅ Account lockout after 5 failed attempts

**Data Security:**
- ✅ HTTPS enforced on all endpoints
- ✅ TLS 1.3 configured
- ✅ HSTS header enabled
- ✅ Database connections encrypted
- ✅ No secrets in codebase

**API Security:**
- ✅ Rate limiting implemented
- ✅ CORS properly configured
- ✅ Input validation on all endpoints
- ✅ Output encoding implemented

**Infrastructure:**
- ✅ Firewall configured
- ✅ Unnecessary ports closed
- ✅ Secrets management implemented
- ✅ Backup strategy in place

**Compliance & Privacy:**
- ✅ Privacy policy published
- ✅ Cookie consent implemented
- ✅ Data export functionality working
- ✅ Account deletion working

**Testing:**
- ✅ Security test cases passed
- ✅ Penetration testing completed
- ✅ Vulnerability scan completed
- ✅ Dependency audit clean

---

## Security Standards References

### External Standards

- **OWASP Top 10** - https://owasp.org/www-project-top-ten/
- **OWASP API Security Top 10** - https://owasp.org/www-project-api-security/
- **CWE/SANS Top 25** - https://cwe.mitre.org/top25/
- **NIST Cybersecurity Framework** - https://www.nist.gov/cyberframework
- **Philippine Data Privacy Act** - https://www.privacy.gov.ph/

---

## 📚 Related Documents

- [Security Approach](../explanation/security-approach.md) - Security philosophy and principles
- [Implement Security](../how-to/implement-security.md) - Implementation procedures
- [API Documentation](./api-endpoints.md) - API security details
- [Database Schema](./database-schema.md) - Database security

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.0 | 2025-10-31 | Split from security-plan.md, focused on standards and requirements | Security Team |
| 1.0.0 | 2025-10-28 | Original security plan | Security Team |

---

*Document maintained by Security Team • Last reviewed: 2025-10-31*

