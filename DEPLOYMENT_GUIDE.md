# Deployment Guide - autoqcoder v2.0

This guide covers deploying autoqcoder to production environments, whether as a **standalone tool** or **integrated into your CI/CD pipeline**.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Installation Options](#installation-options)
3. [CI/CD Integration](#cicd-integration)
4. [Staging Deployment](#staging-deployment)
5. [Production Deployment](#production-deployment)
6. [Rollback Procedures](#rollback-procedures)
7. [Monitoring & Alerting](#monitoring--alerting)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### For Individual Developers

```bash
# Install globally (once)
npm install -g autoqcoder

# Or use npx (no install)
npx autoqcoder

# Copy files to your project
autoqcoder install /path/to/your/project
```

### For Teams (CI/CD)

```yaml
# .github/workflows/ci.yml (simplified)
name: CI
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install autoqcoder
        run: npm install autoqcoder --save-dev
      - name: Run quality gates
        run: npx autoqcoder validate
```

---

## Installation Options

### Option 1: npm Package (Recommended)

```bash
# Install as dev dependency
npm install autoqcoder --save-dev

# Or globally
npm install -g autoqcoder
```

**What's installed:**
- `AGENTS.md` - Quality standards
- `AUTO-CONTINUE.md` - Workflow
- `mate/skill/` - 10 skill definitions
- `scripts/` - Validation scripts
- `.github/workflows/` - CI templates
- `.husky/` - Pre-commit hooks

### Option 2: Manual Download

```bash
# Download core files
curl -O https://raw.githubusercontent.com/autoqcoder/main/AGENTS.md
curl -O https://raw.githubusercontent.com/autoqcoder/main/AUTO-CONTINUE.md

# Download skills (optional)
curl -O https://raw.githubusercontent.com/autoqcoder/main/mate/skill/angular-modular-architect/SKILL.md
# ... repeat for each skill
```

### Option 3: Clone Repository

```bash
git clone https://github.com/autoqcoder/autoqcoder.git
cd autoqcoder
cp AGENTS.md AUTO-CONTINUE.md /path/to/your/project/
cp -r mate /path/to/your/project/
```

---

## CI/CD Integration

### GitHub Actions (Full Pipeline)

See `.github/workflows/ci.yml` for complete example. Key jobs:

1. **lint-and-type-check**
   - ESLint
   - TypeScript type check
   - Tests with coverage
   - Security audit

2. **security-scan**
   - Trivy vulnerability scanner
   - truffleHog secret detection

3. **performance-benchmark**
   - Run benchmarks (if applicable)
   - Compare with baseline

4. **mental-test-verification**
   - Verify mental testing documented
   - Custom per-project checks

5. **review-gate**
   - Calculate self-score
   - Check anti-patterns
   - Verify code preservation
   - Generate quality report

6. **deployment-readiness**
   - Build Docker image
   - Security scan on image
   - Deploy to staging
   - Run smoke tests
   - Notify Slack

### GitLab CI

```yaml
stages:
  - lint
  - test
  - security
  - review-gate
  - deploy

autoqcoder-validate:
  stage: review-gate
  script:
    - npx autoqcoder validate
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

### Jenkins

```groovy
pipeline {
    agent any
    stages {
        stage('Quality Gates') {
            steps {
                sh 'npx autoqcoder validate'
            }
        }
        stage('Deploy') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
}
```

---

## Staging Deployment

### Pre-Deployment Checklist

```
✅ All CI checks passed
✅ Self-score ≥90
✅ Code preservation verified (no deletions)
✅ Evolution files updated (AGENT_METRICS, AGENT_PROFILE)
✅ Mental testing documented
✅ Risk assessment complete (Low/Medium)
✅ Rollback plan prepared
✅ Team approval obtained
```

### Deploy to Staging

```bash
# 1. Merge to develop branch
git checkout develop
git merge feature/your-feature

# 2. Push to trigger staging deployment
git push origin develop

# 3. Monitor deployment
# - Check GitHub Actions status
# - Verify staging health: https://staging.yourapp.com/health
# - Run smoke tests: npm run test:smoke

# 4. Validate in staging
# - Manual QA
# - Load testing (optional)
# - Security scan (re-run if needed)

# 5. Sign-off
# - Tech lead approval
# - Product owner approval
# - Security approval (if needed)
```

### Staging Validation Checklist

```
✅ App starts without errors
✅ Health check returns 200
✅ All endpoints respond correctly
✅ Metrics endpoint working
✅ Logs structured and complete
✅ No error logs in last 24h
✅ Performance benchmarks meet targets
✅ Security headers present
✅ Rate limiting working
✅ Authentication/authorization working
```

---

## Production Deployment

### Production Readiness Checklist

Before tagging release:

```
✅ All staging checks passed
✅ No high-risk changes (or approved)
✅ All tests pass (≥80% coverage)
✅ Performance benchmarks OK (p99<200ms)
✅ Security scan clean (no critical/high vulnerabilities)
✅ Database migrations tested
✅ Rollback procedure validated
✅ Monitoring/alerting configured
✅ Documentation updated (README, CHANGELOG)
✅ Team notified (deployment window)
✅ Stakeholder approval
```

### Deploy to Production

**Using GitHub Actions (recommended):**

```yaml
# Add to .github/workflows/deploy.yml
on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          echo "Deploying version ${{ github.ref_name }}"
          ./scripts/deploy-prod.sh
      - name: Run post-deploy tests
        run: npm run test:smoke:prod
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#production'
```

**Manual deployment:**

```bash
# 1. Create release tag
git checkout main
git pull origin main
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin v2.0.0

# 2. SSH to production server
ssh deploy@your-server

# 3. Pull and deploy
cd /var/www/your-app
git pull origin main
npm ci --only=production
npm run build
pm2 restart all  # or systemctl restart your-service

# 4. Verify
curl https://your-app.com/health
curl https://your-app.com/metrics | grep autoqcoder

# 5. Monitor
tail -f /var/log/your-app/error.log
```

### Blue-Green Deployment (Zero Downtime)

```bash
# Deploy to green environment
./deploy-green.sh

# Validate green
curl https://green.your-app.com/health

# Switch load balancer to green
./switch-lb-to-green.sh

# Keep blue for 10 min (hot rollback)
sleep 600

# Shutdown blue if all good
./shutdown-blue.sh
```

---

## Rollback Procedures

### Immediate Rollback (Hot)

If production issues detected:

```bash
# 1. Identify last known good version
git tag | grep v2.  # Find previous tag, e.g., v2.0.0

# 2. Rollback code
git checkout v2.0.0
git push origin main --force  # ⚠️ Use with caution, coordinate with team

# 3. Restart services
ssh deploy@your-server
cd /var/www/your-app
git pull origin main
pm2 restart all

# 4. Verify recovery
curl https://your-app.com/health
```

### Database Rollback (if migration failed)

```bash
# Using golang-migrate (or similar)
migrate -path db/migrations -database postgres://... down 1

# Or using Django migrations
python manage.py migrate app_name 0001_previous
```

### Rollback Checklist

```
✅ Identified root cause (minimal viable fix)
✅ Code rolled back to previous version
✅ Database reverted if needed
✅ Services restarted
✅ Health checks passing
✅ Monitoring shows recovery
✅ Team notified of rollback
✅ Post-mortem scheduled
```

---

## Monitoring & Alerting

### Metrics to Track

**From autoqcoder perspective:**
- `self_score` (custom metric) - current quality gate score
- `evolution_rounds_total` - number of rounds completed
- `code_deletions_total` - should be 0
- `checklist_compliance_gauge` - should be 1.0 (100%)

**From application perspective (see skills):**
- HTTP requests (rate, errors, duration)
- Database connection pool metrics
- Cache hit rate
- JWT token usage
- Rate limit rejections

### Prometheus Alerts

```yaml
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - "alerts.yml"

rule_files:
  - alerts.yml

# alerts.yml
groups:
  - name: autoqcoder
    rules:
      - alert: LowSelfScore
        expr: autoqcoder_self_score < 90
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "AutoQCoder self-score dropped below 90"
          description: "Current score: {{ $value }}"

      - alert: CodeDeletionDetected
        expr: autoqcoder_code_deletions_total > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: "Code deletion detected (violation of preservation rule)"
          description: "Deletion count: {{ $value }}"

      - alert: EvolutionFilesOutdated
        expr: time() - file_modified_seconds{dir="docs"} > 86400  # >24h
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Evolution files not updated for >24h"
```

### Logging

Ensure structured JSON logs with correlation IDs:

```javascript
// Example (Node.js)
logger.info('Deployment completed', {
  version: '2.0.0',
  environment: 'production',
  duration_ms: 45000,
  request_id: req.id  // correlation ID
});
```

---

## Troubleshooting

### CI Pipeline Fails on Self-Score Check

**Symptom:** `review-gate` job fails with "Self-score below 90"

**Diagnosis:**
1. Check the quality report artifact
2. Identify failing categories (Security, Performance, etc.)
3. Review code for missing validation, error handling, etc.

**Fix:**
- Add missing error handling
- Improve input validation
- Add mental test documentation
- Recalculate self-score locally before push

### Pre-commit Hook Prevents Commit

**Symptom:** `husky pre-commit` fails

**Common issues:**
- ESLint errors → `npm run lint -- --fix`
- TypeScript errors → `npx tsc --noEmit`
- Tests failing → `npm test`
- Console.log left in code → remove or use logger
- Secrets detected → move to .env, update .gitignore

**Bypass (emergency only):**
```bash
git commit -m "..." --no-verify
# But fix issues immediately after!
```

### Evolution Files Out of Date

**Symptom:** Metrics show 0, or old dates

**Fix:**
Update manually with actual numbers:
```markdown
## Iteration Metrics
- **Tasks completed:** 5 (not 0)
- **Evolution rounds:** 5 (not 1)
```

Better: Use automation script (Phase 4 planned).

### Mental Testing Overwhelming

**Symptom:** Can't cover all scenarios mentally

**Solution:**
- Write actual test code temporarily for complex logic
- Use test-driven development (TDD) approach
- Document test cases in TESTS.md
- Can revert to mental mode once logic stable

---

## Security Considerations

### Secrets Management

- ❌ **Never** commit secrets to git
- ✅ Use `.env` files (in `.gitignore`)
- ✅ Use environment variables in CI/CD
- ✅ Use secret management (AWS Secrets Manager, HashiCorp Vault)
- ✅ Rotate keys regularly

### Production Hardening

- Enable HTTPS (TLS 1.2+)
- Set secure headers (HSTS, CSP, X-Frame-Options)
- Rate limiting (per IP/user)
- IP allowlist for admin endpoints
- Audit logging (immutable)
- Regular security scans (Snyk, Trivy)

---

## Performance Tuning

### Database

- Use connection pooling (pgbouncer, HikariCP)
- Add indexes for slow queries (EXPLAIN ANALYZE)
- Cache hot data (Redis, Memcached)
- Paginate all list endpoints
- Use read replicas for read-heavy workloads

### Application

- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize bundle size (tree-shaking, code-splitting)
- Use background jobs for heavy processing

### Monitoring

- Set up APM (New Relic, Datadog, Scout)
- Track p50/p99 latency
- Monitor error rates (should be <0.1%)
- Alert on SLO breaches

---

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily automated backup (cron)
0 2 * * * pg_dump -U postgres mydb > /backups/mydb-$(date +%Y%m%d).sql

# Restore
psql -U postgres mydb < /backups/mydb-20250525.sql
```

### Application State

- Stateless design (use external DB/cache)
- Can redeploy anytime
- Zero-downtime deployments (blue-green, rolling)

### Recovery Time Objective (RTO)

- Target: <15 minutes
- Procedures documented, tested quarterly
- Runbooks available to on-call team

---

## Compliance & Auditing

### Log Retention

- Application logs: 30 days (rotated)
- Security logs: 90 days (immutable)
- Audit trails: 7 years (if regulated)

### Access Control

- Principle of least privilege
- MFA required for production access
- Audit all admin actions
- Regular access reviews (quarterly)

---

## Support & Escalation

### On-Call Rotation

- Primary: [Name/Email] - 24/7
- Secondary: [Name/Email] - Backup
- Escalation: Tech Lead → Engineering Manager

### Contact Information

- **Technical Issues:** GitHub Issues
- **Security Vulnerabilities:** security@autoqcoder.dev (encrypted)
- **General Questions:** Discord/Slack community
- **Emergency (Production Down):** PagerDuty / Opsgenie

---

## Appendix

### A. Pre-Flight Checklist

Before any deployment:

- [ ] All CI checks green
- [ ] Self-score ≥90
- [ ] Code preservation verified
- [ ] Evolution files updated
- [ ] Risk assessment documented
- [ ] Team approval obtained
- [ ] Monitoring configured
- [ ] Rollback procedure ready
- [ ] Post-deploy tests prepared
- [ ] Stakeholders notified

### B. Deployment Commands Cheatsheet

```bash
# Staging deploy
git push origin develop

# Production deploy (tag)
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin v2.0.0

# Hot rollback
git checkout v2.0.0-1
git push origin main --force

# Health checks
curl -f https://api.your-app.com/health || echo "Unhealthy"

# View logs
journalctl -u your-service -f
# or
pm2 logs your-app
```

### C. Useful Links

- [autoqcoder AGENTS.md](AGENTS.md) - Quality standards
- [autoqcoder AUTO-CONTINUE.md](AUTO-CONTINUE.md) - Workflow
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Version migration
- [QUICK_REFERENCE_CARD.md](QUICK_REFERENCE_CARD.md) - Daily checklist
- [GitHub Actions Logs](https://github.com/your-org/your-repo/actions)
- [Production Dashboard](https://monitor.your-app.com)

---

**Last Updated:** 2025-05-25  
**Version:** 2.0  
**Maintainer:** autoqcoder team <team@autoqcoder.dev>
