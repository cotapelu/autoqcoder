# Security Policy

**Supported Versions:** 2.0.x (current), 1.5.x (legacy, security fixes only)

## Reporting a Vulnerability

**DO NOT** open a public GitHub issue for security vulnerabilities.

**Email:** security@autoqcoder.dev (PGP encrypted: [download key](https://autoqcoder.dev/pgp-key.asc))

**Response Time:**
- **Critical** (RCE, SQLi, auth bypass): < 4 hours
- **High** (information disclosure, DoS): < 24 hours
- **Medium** (XSS, CSRF, config issues): < 48 hours
- **Low** (documentation, best practices): < 7 days

**Please include:**
- Description of vulnerability
- Steps to reproduce
- Affected version(s)
- Potential impact
- Suggested fix (if any)

---

## Security Features

autoqcoder v2.0 enforces:

### 1. Input Validation
- All external inputs validated (route + service layer)
- Type checking (TypeScript strict mode)
- Schema validation (Pydantic, Pydantic-core, express-validator)

### 2. SQL Injection Prevention
- Parameterized queries only (never string concatenation)
- ORM usage (SQLAlchemy, Entity Framework, GORM, sqlx)
- Repository pattern abstracts data access

### 3. Authentication & Authorization
- JWT with RS256 (asymmetric keys)
- Short-lived access tokens (15-30 min)
- Refresh tokens with rotation
- RBAC via IAM platform layer
- HttpOnly cookies (recommended)

### 4. Secrets Management
- Never hardcode secrets in source
- Use environment variables or secret managers
- `.env` in `.gitignore`
- Pre-commit scanning for leaked credentials (truffleHog)

### 5. Rate Limiting
- Redis-backed token bucket (5-100 req/min configurable)
- Per-user/IP limits
- Rate limit headers (`X-RateLimit-*`)

### 6. Error Handling
- User-friendly error messages (no stack traces, internal paths)
- Detailed server-side logs (for debugging)
- No information leakage

### 7. HTTPS & TLS
- Enforce HTTPS in production (redirect HTTP → HTTPS)
- TLS 1.2+ minimum
- HSTS headers (Strict-Transport-Security)

### 8. CORS Configuration
- Explicit allowed origins (no `*` in production)
- Credentials flag properly configured
- Methods restricted to needed only

### 9. CSRF Protection
- SameSite cookies (Strict or Lax)
- Anti-CSRF tokens for state-changing operations
- Double-submit cookie pattern

### 10. Logging & Auditing
- Structured JSON logs (noPlain text)
- Correlation IDs (X-Request-ID) for tracing
- Audit trail for auth events, data changes
- Log retention policies (30-90 days)

---

## Security Scanning

### Pre-commit Hooks

```bash
# Running automatically on git commit
- ESLint (security rules)
- TypeScript type check
- Secret scanning (truffleHog, detect-secrets)
- Commit message format validation
```

### CI/CD Pipeline

```yaml
security-scan:
  - Trivy: vulnerability scanning (dependencies, container images)
  - CodeQL: code analysis (SQL injection, XSS, etc.)
  - OWASP ZAP: dynamic scanning (optional)
  - Snyk: dependency vulnerability monitoring
```

### Production Monitoring

- Failed login attempts → alert
- Rate limit breaches → alert
- Unusual traffic patterns → alert
- Error rate spikes → alert (SLO: <0.1%)

---

## Best Practices (Enforced)

1. **No `eval()`** - Never use `eval`, `Function` constructor, `innerHTML` with untrusted data
2. **No `any` in TypeScript** - Use `unknown` or proper types
3. **Password hashing** - bcrypt, Argon2 (never plaintext/MD5/SHA1)
4. **No debug flags** in production (`DEBUG=*` exposes internals)
5. **Secure headers** - CSP, X-Frame-Options, X-Content-Type-Options
6. **Dependency updates** - `npm audit`, `npm outdated` regular
7. **Least privilege** - Database users with minimal permissions
8. **Encryption at rest** - Sensitive data encrypted in database
9. **Session management** - Secure cookie flags, session expiration
10. **Principle of least surprise** - APIs behave predictably, no hidden gotchas

---

## Known Security Considerations

### Mental Testing vs Actual Security Scans

- **Mental testing** validates logic correctness (via AGENTS.md Mental Testing Mode)
- **Security scans** (Trivy, CodeQL) find actual vulnerabilities in dependencies/code
- **Both required** for production readiness

### Code Preservation Rule & Security

- Code deletion prevented to preserve audit trail
- If vulnerable code found: **fix it**, don't delete
- Create security patch, document in SECURITY.md

### Evolution Files & Sensitive Data

- Never put secrets in `docs/AGENT_METRICS.md` or `PROJECT_STATE.md`
- These files may be public (in open source)
- Keep metrics generic (counts, percentages)
- Never log: passwords, tokens, PII, private keys

---

## Dependency Security

### Update Policy

- **Critical vulnerabilities**: patch within 48 hours
- **High vulnerabilities**: patch within 1 week
- **Medium vulnerabilities**: patch within 1 month
- **Low vulnerabilities**: next scheduled update

### Tools

- `npm audit` - Node.js dependencies
- `trivy` - Container images, filesystem
- `snyk` - Multi-language scanning
- `dependabot` - Auto-PR for updates (GitHub)

### Lockfiles

- **`package-lock.json`** committed to pin versions
- **Do not** use floating versions (`^`, `~`) in production
- Review lockfile changes in PRs

---

## Incident Response

### If You Discover a Vulnerability

1. **Contain** - Can you reproduce? Is it in production?
2. **Assess** - Impact? Exploitability? Data exposure?
3. **Fix** - Develop patch, test thoroughly
4. **Disclose** - Follow coordinated vulnerability disclosure
5. **Post-mortem** - Document root cause, prevent recurrence

### Security Incident Template

```markdown
## Incident Report

**Date:** YYYY-MM-DD
**Severity:** Critical/High/Medium/Low
**Vulnerability:** [CWE ID if known]
**Affected Versions:** v2.0.0 - v2.0.2
**Summary:** Brief description

### Timeline
- HH:MM - Discovered
- HH:MM - Containment actions
- HH:MM - Patch developed
- HH:MM - Deployed to production
- HH:MM - Public disclosure

### Root Cause
- Technical deep dive
- How it happened
- Why it wasn't caught earlier

### Impact
- Data exposure? (PII, credentials, financial)
- System compromise? (RCE, privilege escalation)
- Service disruption? (DoS)

### Remediation
- Patch applied (commit/PR link)
- Additional controls added
- Monitoring/alerting updates
- Process improvements

### Lessons Learned
- What went wrong
- How we improve
- Preventive measures for future
```

---

## Security Checklist (Before Release)

- [ ] All dependencies up-to-date (`npm audit` clean)
- [ ] No secrets in git history (truffleHog scan)
- [ ] SQL injection prevention verified (parameterized queries)
- [ ] XSS prevention verified (auto-escaping, CSP)
- [ ] CSRF protection enabled
- [ ] Authentication secure (JWT RS256, short expiry)
- [ ] Authorization checks complete (RBAC)
- [ ] Rate limiting configured
- [ ] HTTPS enforced (HSTS)
- [ ] Security headers present (CSP, X-Frame-Options, etc.)
- [ ] Audit logging enabled
- [ ] Penetration test completed (if high-risk)
- [ ] Security review signed off by @autoqcoder/security-team

---

## Compliance

### GDPR (if handling EU user data)

- Data minimization (collect only needed)
- Right to erasure (delete user data on request)
- Data portability (export user data)
- Privacy by design
- Data processing agreements (DPAs)

### SOC 2 Type II (if required)

- Security
- Availability
- Processing integrity
- Confidentiality
- Privacy

**Controls:**
- Access controls (RBAC, MFA)
- Change management (code reviews, CI/CD)
- Incident response (defined procedures)
- Monitoring & logging (centralized, retained)
- Risk assessment (annual)

---

## Contact

- **Security Team:** security@autoqcoder.dev
- **PGP Key:** https://autoqcoder.dev/pgp-key.asc
- **Security Advisories:** https://github.com/autoqcoder/security-advisories
- **Bug Bounty:** Coming soon (Phase 5)

---

**Last Updated:** 2025-05-25  
**Version:** 2.0
