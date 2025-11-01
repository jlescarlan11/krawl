# 📘 Version Control Strategy: Krawl

> **Purpose:** This document defines the Git branching model, naming conventions, workflow practices, and commit standards for the Krawl project to ensure code consistency and effective collaboration.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Development Team

---

## 📋 Table of Contents

1. [Repository Platform](#1-repository-platform)
2. [Main Branch](#2-main-branch)
3. [Branching Model](#3-branching-model-feature-branch-workflow)
4. [Naming Conventions](#4-naming-conventions)
5. [Commit Message Guidelines](#5-commit-message-guidelines)
6. [Pull Request Process](#6-pull-request-process)
7. [CI/CD Integration](#7-cicd-integration)
8. [Best Practices](#8-best-practices)

---

## 1. Repository Platform

- **Platform**: GitHub (or GitLab/Bitbucket as chosen by the team)
- **Access**: All core team members require write access

---

## 2. Main Branch

- **Name**: `main`
- **Purpose**: Represents the stable, production-ready state of the application
- **Rules**:
  - Direct commits to `main` are **strictly prohibited**
  - Merges to `main` only happen via approved Pull Requests (PRs)
  - Typically merged from release branches or hotfix branches

---

## 3. Branching Model: Feature Branch Workflow

We will use a simple and effective feature branch workflow:

### Workflow Steps

1. **Create Feature Branch**: For any new feature, bug fix, or task (corresponding to a Kanban task like `KRW-XX`), create a new branch from the `main` branch

2. **Develop**: Make commits on the feature branch

3. **Push**: Push the feature branch to the remote repository regularly

4. **Open Pull Request (PR)**: When the feature/fix is complete and tested locally, open a PR to merge the feature branch back into `main`

5. **Code Review & CI Checks**: 
   - Team members review the PR
   - Automated checks (linters, tests, builds via CI/CD pipeline) must pass

6. **Merge**: Once approved and checks pass, merge the PR into `main`
   - Preferably using a squash merge or rebase merge for a cleaner history

7. **Delete Branch**: Delete the feature branch after merging

---

## 4. Naming Conventions

### Branch Names

**Format**: `[type]/[task-id]-[short-description]`

#### Branch Types

| Type | Purpose | Example |
|------|---------|---------|
| `feature/` | New features or enhancements | `feature/KRW-15-add-gem-pinning-ui` |
| `fix/` | Bug fixes | `fix/KRW-21-map-zoom-performance` |
| `chore/` | Maintenance tasks, refactoring, dependency updates | `chore/KRW-35-update-nextjs` |
| `release/` | Preparing a production release (optional for simpler workflows) | `release/v0.1.0` |
| `hotfix/` | Urgent fixes directly off main (use sparingly) | `hotfix/KRW-42-fix-login-crash` |

#### Naming Guidelines

- **Task ID**: Reference the corresponding Kanban/Issue tracker ID (e.g., `KRW-15`)
- **Short Description**: Use kebab-case, brief and descriptive (2-5 words)

**Example**: `feature/KRW-51-krawl-mode-offline`

---

### Commit Messages (Conventional Commits Recommended)

**Format**:
```
<type>(<scope>): <subject>

<body> (Optional)

<footer> (Optional: e.g., Closes KRW-XX)
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `chore`: Build/config changes
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Testing changes

#### Commit Guidelines

- **Type**: Required
- **Scope** (Optional): Module or area affected (e.g., `auth`, `map`, `gem-pinning`, `krawl-mode`)
- **Subject**: Imperative mood, concise (max 50 chars), lowercase
- **Body** (Optional): Detailed explanation of changes
- **Footer** (Optional): Reference related issues/tasks

#### Commit Examples

**Example 1** (Simple):
```
feat(gem-pinning): add duplicate check warning UI
```

**Example 2** (With scope):
```
fix(auth): correct JWT expiration validation
```

**Example 3** (With body and footer):
```
refactor(map): optimize gem marker rendering

Switched from individual markers to layer group for better performance
when displaying large numbers of gems.

Closes KRW-65
```

---

## 5. Pull Request Guidelines

### PR Title
- Follow the same convention as commit messages
- Example: `feat(krawl-mode): implement offline data sync`

### PR Description Template
```markdown
## Description
Brief description of changes

## Related Task
Closes KRW-XX

## Type of Change
- [ ] Feature
- [ ] Bug Fix
- [ ] Chore/Refactor
- [ ] Documentation

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Passes CI checks

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project conventions
- [ ] Self-reviewed code
- [ ] Updated documentation
- [ ] No console errors/warnings
```

---

## 6. Protected Branch Rules (Recommended)

Configure the following rules for the `main` branch on GitHub:

- ✅ Require pull request reviews before merging (at least 1 approval)
- ✅ Require status checks to pass before merging (CI/CD)
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow force pushes
- ✅ Do not allow deletions

---

## 7. Best Practices

### General
- Keep branches focused and short-lived
- Regularly sync your feature branch with `main` to avoid conflicts
- Write clear, descriptive commit messages
- Commit early and often (smaller, logical commits)
- Never commit secrets, API keys, or sensitive data

### Before Opening a PR
- [ ] Run linter and fix all issues
- [ ] Test changes thoroughly
- [ ] Update relevant documentation
- [ ] Ensure all tests pass
- [ ] Rebase on latest `main` if needed

### Code Review
- Be respectful and constructive
- Review within 24 hours when possible
- Test the changes locally if needed
- Approve only when all concerns are addressed

---

## 8. Git Commands Quick Reference

### Creating a Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/KRW-XX-description
```

### Making Changes
```bash
git add .
git commit -m "feat(scope): description"
git push origin feature/KRW-XX-description
```

### Syncing with Main
```bash
git checkout main
git pull origin main
git checkout feature/KRW-XX-description
git rebase main
# or
git merge main
```

### Cleaning Up After Merge
```bash
git checkout main
git pull origin main
git branch -d feature/KRW-XX-description
```

---

## 9. Handling Conflicts

1. Pull the latest changes from `main`
2. Rebase or merge `main` into your feature branch
3. Resolve conflicts in your editor
4. Test to ensure nothing broke
5. Continue the rebase: `git rebase --continue`
6. Force push if needed: `git push --force-with-lease`

---

## 10. Release Process (To Be Refined)

1. Create a `release/vX.Y.Z` branch from `main`
2. Perform final testing and bug fixes on the release branch
3. Update version numbers and changelog
4. Merge release branch into `main` via PR
5. Tag the release: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
6. Push tags: `git push origin --tags`
7. Deploy from `main`

---

## 11. Emergency Hotfixes

For critical production issues:

1. Create a `hotfix/KRW-XX-description` branch from `main`
2. Fix the issue
3. Test thoroughly
4. Open a PR with priority review
5. Merge into `main`
6. Deploy immediately
7. Backport to any active development branches if needed

---

## Summary

This branching strategy prioritizes:
- **Simplicity**: Feature branch workflow is easy to understand and follow
- **Quality**: Code review and CI checks ensure high standards
- **Collaboration**: Clear naming and commit conventions improve team communication
- **Stability**: Protected main branch ensures production reliability

All team members are expected to follow these guidelines to maintain a healthy, organized codebase.

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial version control strategy | Development Team |

---

## 📚 Related Documents

- [Project Setup](./project-setup.md) - Development environment setup
- [Kanban Task](./kanban-task.md) - Task tracking and management
- [Testing Plan](./testing-plan.md) - Testing workflow and CI integration
- [Hosting Deployment Plan](./hosting-deployment-plan.md) - Deployment procedures

---

*Document maintained by Development Team • Last reviewed: 2025-10-28*

