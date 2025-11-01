# 🤝 Contributing to Krawl

First off, thank you for considering contributing to Krawl! It's people like you that make Krawl such a great tool for discovering authentic Filipino culture.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

---

## 📋 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [Getting Started](#-getting-started)
3. [Development Workflow](#-development-workflow)
4. [Naming Conventions](#-naming-conventions)
5. [Branching Strategy](#-branching-strategy)
6. [Commit Guidelines](#-commit-guidelines)
7. [Pull Request Process](#-pull-request-process)
8. [Coding Standards](#-coding-standards)
9. [Testing](#-testing)
10. [Documentation](#-documentation)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

**In short:**
- Be respectful and inclusive
- Be patient and constructive in feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🚀 Getting Started

### Prerequisites

Before contributing, please:
1. Read the [README.md](README.md) for project overview
2. Follow the [Project Setup Guide](docs/project-setup.md) to configure your development environment
3. Review the [Version Control Strategy](docs/planning/version-control-strategy.md) for detailed Git workflow
4. Familiarize yourself with our [Tech Stack](docs/tech-stack.md)

### Types of Contributions

We welcome many different types of contributions:
- 🐛 **Bug Reports**: Report issues you encounter
- ✨ **Feature Requests**: Suggest new features or enhancements
- 💻 **Code Contributions**: Submit bug fixes or implement features
- 📚 **Documentation**: Improve or add to documentation
- 🎨 **Design**: UI/UX improvements and design assets
- 🧪 **Testing**: Write or improve tests

---

## 💻 Development Workflow

### 1. Find or Create an Issue

Before starting work:
1. Check if an issue already exists for what you want to work on
2. If not, create a new issue describing the bug or feature
3. Wait for approval from maintainers (especially for large features)
4. Get the issue ID (e.g., `KRW-15`) to use in your branch name

### 2. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/krawl.git
cd krawl

# Add the upstream repository
git remote add upstream https://github.com/ORIGINAL-OWNER/krawl.git
```

### 3. Set Up Development Environment

Follow the complete setup instructions in the [Project Setup Guide](docs/project-setup.md), which includes:
- Installing prerequisites (Node.js, JDK, Docker)
- Configuring the database
- Setting up frontend and backend
- Verifying your installation

### 4. Create a Feature Branch

```bash
# Ensure you're on main and it's up to date
git checkout main
git pull upstream main

# Create your feature branch
git checkout -b feature/KRW-XX-short-description
```

### 5. Make Your Changes

- Write clean, maintainable code
- Follow the [Coding Standards](#-coding-standards)
- Write/update tests for your changes
- Update documentation as needed

### 6. Test Your Changes

```bash
# Frontend tests
cd frontend
npm run lint
npm run build
npm run test  # When tests are implemented

# Backend tests
cd ../backend
./mvnw test
```

### 7. Commit Your Changes

Follow our [Commit Guidelines](#-commit-guidelines):

```bash
git add .
git commit -m "feat(module): add new feature"
```

### 8. Push and Create Pull Request

```bash
git push origin feature/KRW-XX-short-description
```

Then open a Pull Request on GitHub following the [PR Process](#-pull-request-process).

---

## 🧩 Naming Conventions

Consistency in naming is crucial for maintainability. Here's a quick reference:

| Convention | Usage | Example |
|------------|-------|---------|
| `camelCase` | Variables, functions | `userName`, `fetchGemData()` |
| `PascalCase` | Components, classes, types | `GemCard`, `UserEntity`, `GemType` |
| `UPPER_SNAKE_CASE` | Constants | `MAX_RETRIES`, `API_BASE_URL` |
| `kebab-case` | CSS classes, URLs, branches, docs | `gem-card`, `/api/gems`, `feature/krw-15-description` |

### Quick Examples

**Frontend:**
- Components: `GemCard.tsx`, `MapArea.tsx`
- Hooks: `useMapState.ts`, `useAuth.ts`
- Types: `GemType.ts`, `UserProps`

**Backend:**
- Classes: `GemService`, `UserEntity`
- Methods: `findNearbyGems()`, `createGem()`
- Endpoints: `/api/gems`, `/api/krawls`

**Database:**
- Tables: `users`, `gems`, `gem_ratings`
- Columns: `user_id`, `created_at`
- Indexes: `idx_gems_location`

For complete naming conventions and detailed examples, see [docs/project-setup.md](docs/project-setup.md).

---

## 🌿 Branching Strategy

We use a **Feature Branch Workflow** to keep the codebase organized and stable.

### Quick Reference

| Branch Type | Format | Example |
|-------------|--------|---------|
| `main` | Production-ready code | `main` |
| `feature/` | `feature/[id]-[description]` | `feature/KRW-15-add-gem-pinning-ui` |
| `fix/` | `fix/[id]-[description]` | `fix/KRW-21-map-zoom-performance` |
| `chore/` | `chore/[id]-[description]` | `chore/KRW-35-update-nextjs` |
| `docs/` | `docs/[id]-[description]` | `docs/KRW-10-api-documentation` |

### Basic Workflow

```bash
# Create a new feature branch
git checkout main
git pull origin main
git checkout -b feature/KRW-XX-description

# Keep your branch up to date
git checkout main && git pull origin main
git checkout feature/KRW-XX-description
git merge main

# Push your branch
git push origin feature/KRW-XX-description
```

For complete branching strategy, protected branch rules, and detailed workflow, see [docs/planning/version-control-strategy.md](docs/planning/version-control-strategy.md).

---

## 📝 Commit Guidelines

We follow the **Conventional Commits** specification for clear, structured commit history.

### Format

```
<type>(<scope>): <subject>
```

### Common Types

| Type | Use For | Example |
|------|---------|---------|
| `feat` | New features | `feat(gem): add duplicate check warning` |
| `fix` | Bug fixes | `fix(auth): correct JWT validation` |
| `docs` | Documentation only | `docs(api): update endpoint examples` |
| `refactor` | Code restructuring | `refactor(map): optimize marker rendering` |
| `chore` | Dependencies, configs | `chore(deps): update nextjs to v16` |
| `test` | Tests | `test(gem): add service unit tests` |

### Quick Examples

```bash
# Simple commit
git commit -m "feat(gem): add duplicate check warning UI"

# With body and footer
git commit -m "fix(auth): correct JWT expiration validation

The JWT token was not properly validating expiration timestamps.
This fixes the issue by using the correct time comparison.

Closes KRW-42"
```

### Guidelines

- Use imperative present tense: "add" not "added"
- Don't capitalize first letter
- No period at the end
- Keep subject under 50 characters

For complete commit message guidelines, scope examples, and best practices, see [docs/planning/version-control-strategy.md](docs/planning/version-control-strategy.md).

---

## 🔄 Pull Request Process

### Before Opening a PR

- ✅ Ensure all tests pass
- ✅ Run the linter and fix all issues
- ✅ Update documentation if needed
- ✅ Rebase on the latest `main` branch
- ✅ Verify your changes locally
- ✅ Write/update tests for your changes

### PR Title

Follow the same format as commit messages:
```
feat(module): add new feature
```

### PR Description Template

When opening a PR, use this template:

```markdown
## Description
Brief description of what this PR does and why.

## Related Task
Closes KRW-XX (or Fixes #XX)

## Type of Change
- [ ] Feature (new functionality)
- [ ] Bug Fix (fixes an issue)
- [ ] Chore (refactoring, dependencies, etc.)
- [ ] Documentation (docs only)
- [ ] Breaking Change (fix or feature that would cause existing functionality to break)

## Testing
- [ ] Tested locally
- [ ] Added/updated unit tests
- [ ] Added/updated integration tests
- [ ] Passes all CI checks

## Screenshots (if applicable)
[Add screenshots or GIFs demonstrating the changes]

## Checklist
- [ ] Code follows project naming conventions
- [ ] Self-reviewed my own code
- [ ] Commented code in hard-to-understand areas
- [ ] Updated relevant documentation
- [ ] No console errors or warnings
- [ ] Changes generate no new linter warnings
- [ ] Added tests that prove the fix is effective or feature works
- [ ] New and existing unit tests pass locally

## Additional Notes
[Any additional information that reviewers should know]
```

### PR Review Process

1. **Automated Checks**: CI/CD pipeline will run tests and linters
2. **Code Review**: At least one team member must review and approve
3. **Address Feedback**: Make requested changes and push updates
4. **Final Approval**: Once approved and checks pass, PR can be merged
5. **Merge**: Maintainer will merge using appropriate strategy (squash/rebase)
6. **Cleanup**: Feature branch will be deleted after merge

### PR Best Practices

- **Keep PRs Small**: Easier to review and less likely to have conflicts
- **One Feature Per PR**: Don't combine unrelated changes
- **Write Clear Descriptions**: Help reviewers understand your changes
- **Respond to Feedback**: Be open to suggestions and questions
- **Be Patient**: Reviews take time; maintainers will get to it
- **Update Branch**: Keep your PR up to date with `main`

---

## 💻 Coding Standards

### Frontend (TypeScript/React)

**General:**
- Use TypeScript for all new code
- Enable strict mode in TypeScript
- Use functional components with hooks
- Prefer named exports over default exports

**React Best Practices:**
- Keep components small and focused
- Use custom hooks for reusable logic
- Memoize expensive computations with `useMemo`
- Optimize re-renders with `useCallback` and `React.memo`
- Handle loading and error states

**Example Component:**
```tsx
import { useState, useCallback } from 'react';
import { LuMapPin } from 'react-icons/lu';

interface GemCardProps {
  gemName: string;
  location: string;
  onVouch: (gemId: string) => void;
}

export function GemCard({ gemName, location, onVouch }: GemCardProps) {
  const [isVouched, setIsVouched] = useState(false);

  const handleVouch = useCallback(() => {
    setIsVouched(true);
    onVouch(gemId);
  }, [gemId, onVouch]);

  return (
    <div className="gem-card">
      <LuMapPin className="text-verde-700" size={20} />
      <h3 className="heading-4">{gemName}</h3>
      <p className="body-sm text-text-secondary">{location}</p>
      <button onClick={handleVouch} disabled={isVouched}>
        {isVouched ? 'Vouched' : 'Vouch'}
      </button>
    </div>
  );
}
```

**Styling:**
- Use Tailwind CSS utility classes
- Reference design tokens from `globals.css`
- Use semantic color names (e.g., `text-verde-700` not `text-green-700`)
- Keep custom CSS minimal
- Use the `.focus-ring` utility for accessible focus states

---

### Backend (Java/Spring Boot)

**General:**
- Follow Java naming conventions
- Use Spring Boot best practices
- Implement proper error handling
- Write comprehensive tests

**REST API Best Practices:**
- Use proper HTTP status codes
- Follow RESTful conventions
- Use DTOs for request/response
- Implement pagination for list endpoints
- Add proper validation

**Example Controller:**
```java
package com.krawl.backend.controller;

import com.krawl.backend.dto.CreateGemRequest;
import com.krawl.backend.dto.GemResponse;
import com.krawl.backend.service.GemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/gems")
public class GemController {

    private final GemService gemService;

    public GemController(GemService gemService) {
        this.gemService = gemService;
    }

    @GetMapping
    public ResponseEntity<List<GemResponse>> getAllGems(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        List<GemResponse> gems = gemService.getAllGems(page, size);
        return ResponseEntity.ok(gems);
    }

    @PostMapping
    public ResponseEntity<GemResponse> createGem(@Valid @RequestBody CreateGemRequest request) {
        GemResponse gem = gemService.createGem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(gem);
    }
}
```

---

### Database

**Migration Best Practices:**
- Use Flyway for all schema changes
- Never edit existing migrations
- Test migrations on a copy of production data
- Include rollback scripts when possible

**Query Optimization:**
- Use appropriate indexes
- Avoid N+1 queries
- Use PostGIS functions for geospatial queries
- Monitor query performance

---

## 🧪 Testing

### Frontend Testing

```bash
# Run linter
npm run lint

# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage
```

**Testing Guidelines:**
- Write unit tests for utilities and hooks
- Write integration tests for components
- Test user interactions
- Mock external dependencies
- Aim for >80% code coverage

---

### Backend Testing

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=GemServiceTest

# Run tests with coverage
./mvnw test jacoco:report
```

**Testing Guidelines:**
- Write unit tests for services
- Write integration tests for repositories
- Test API endpoints with MockMvc
- Test edge cases and error handling
- Aim for >80% code coverage

---

## 📚 Documentation

### Code Documentation

**Frontend:**
- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Add inline comments for complex logic

**Backend:**
- Add Javadoc comments for public methods
- Document API endpoints with OpenAPI/Swagger annotations
- Add inline comments for complex logic

### Project Documentation

When updating documentation:
- Keep it concise and clear
- Use markdown formatting
- Include code examples where helpful
- Update the changelog section
- Cross-reference related documents

Documentation is located in the [`docs/`](docs/) folder. See the README.md for a complete list of available documentation.

---

## 🔗 Additional Resources

### Documentation
- [Project Setup Guide](docs/project-setup.md)
- [Tech Stack](docs/tech-stack.md)
- [System Architecture](docs/system-architecture.md)
- [Database Schema](docs/database-schema.md)
- [API Documentation](docs/api-documentation.md)
- [Version Control Strategy](docs/planning/version-control-strategy.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## ❓ Questions?

If you have questions:
1. Check the documentation in the [`docs/`](docs/) folder
2. Search existing GitHub issues
3. Create a new issue with the `question` label
4. Reach out to the development team

---

## ✅ Summary Checklist

Before submitting your contribution:

- [ ] Read and understood the contribution guidelines
- [ ] Followed the naming conventions
- [ ] Created a properly named feature branch
- [ ] Made commits following conventional commit format
- [ ] Written/updated tests for changes
- [ ] Run linter and fixed all issues
- [ ] Updated documentation if needed
- [ ] Tested changes locally
- [ ] Opened PR with clear description
- [ ] Addressed reviewer feedback

---

<div align="center">

**Thank you for contributing to Krawl!** 🙏

*Together, we're building something amazing for the Filipino community.*

[⬆ back to top](#-contributing-to-krawl)

</div>

---

**Last Updated**: 2025-11-01  
**Version**: 1.0.0  
**Maintainer**: Development Team

