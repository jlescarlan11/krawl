# Security Policy

We take the security of Krawl and our users seriously. Thank you for helping us keep the community safe.

## Supported Versions

We accept reports for active branches:
- main (current)
- develop (pre-release)

## Reporting a Vulnerability

Please report vulnerabilities privately. Do not open public issues.

- Email: security@krawl.app
- Optionally use GitHub Security Advisories
- Include: affected components, version/commit, PoC, impact, remediation ideas

We follow Coordinated Vulnerability Disclosure (CVD). If you inadvertently access user data, stop and report immediately.

## Response Targets

- Acknowledgment: within 3 business days
- Triage: within 7 business days
- Remediation plan: within 14 business days
- Public disclosure: mutually agreed after a fix/mitigation is available

## Scope

In scope:
- Backend API (Spring Boot), DB (PostgreSQL + PostGIS)
- Frontend PWA (Next.js), Service Worker, IndexedDB
- CI/CD configuration and deployment manifests

Out of scope (unless impact shown):
- DoS/volumetric attacks, rate-limit bypass without user impact
- SPF/DMARC/SSL best-practice suggestions without exploitability
- Clickjacking on non-sensitive pages, missing headers on static assets

## Safe Harbor

We will not initiate legal action against researchers who:
- Make a good-faith effort to comply with this policy
- Avoid privacy violations, service disruption, and data destruction
- Do not exfiltrate more data than necessary to prove a finding
- Provide reasonable time to remediate before disclosure

## References

- docs/reference/security-requirements.md
- docs/explanation/security-approach.md
- docs/how-to/implement-security.md

Thank you for your responsible disclosure and support.
