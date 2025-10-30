## Summary

Describe the change, motivation, and context. Link to related docs if helpful.

Fixes # (issue)

## Type of change

- [ ] Bug fix (non-breaking change)
- [ ] Feature (non-breaking change)
- [ ] Breaking change
- [ ] Refactor/Chore
- [ ] Documentation

## How to test

Steps to verify locally (commands, endpoints, UI flows). Include expected results.

```
# example
docker-compose up -d
(cd backend && ./mvnw spring-boot:run)
(cd frontend && npm run dev)
```

## Screenshots / Recordings (if UI)

Add before/after or GIFs.

## API / DB changes

- Endpoints added/changed:
- DB migrations:
- Backwards compatible: yes/no

## Security considerations

Note any auth, PII, rate limiting, XSS/SQLi implications. Reference:
- docs/reference/security-requirements.md
- docs/how-to/implement-security.md

## Documentation

- [ ] Updated docs where applicable
- Relevant docs:
  - docs/reference/api-endpoints.md
  - docs/planning/tasks/ (epic updates)

## Checklist

- [ ] Lints/tests pass locally
- [ ] Added/updated tests
- [ ] Updated migration scripts (if needed)
- [ ] No secrets or credentials added
- [ ] Backwards compatibility considered / documented

## Additional context

Anything else reviewers should know (trade-offs, follow-ups).


