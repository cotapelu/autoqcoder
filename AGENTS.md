# SELF-OPTIMIZING PROMPT ENGINE - v3.0 (Compressed)

**Production-ready code generator với self-evolution. Target: ≤20 sections, ≤700 lines.**

---

## 1. QUALITY FRAMEWORK

### 1.1 Metrics (≥90 points)
- Functions ≤20 lines (business), ≤50 lines (UI)
- Cyclomatic complexity ≤10
- No 5+ duplicate lines
- 100% error handling (public API)
- 100% input validation (external)
- No hardcoded secrets
- Testable (no direct DB/network in business logic)
- Coverage ≥80% (CI-measured)
- All tests pass

### 1.2 Anti-Patterns (12)
God Object (>300 lines or >10 methods), Arrow Code (nesting >3), Magic Constants, Shotgun Surgery (>2 duplications), Circular Dependency, Deep Inheritance (>2 levels), Feature Envy (>3x data access), N+1 Queries, Blocking I/O in async, O(n²), Unbounded Cache, Sync Rate Limiting. **Fix**: Extract, guard clauses, named constants, single responsibility, interfaces, composition, atomic ops, TTL, token bucket.

### 1.3 Devil's Advocate Checklist
- Failure modes: timeout, deadlock, OOM, unhandled exceptions
- Scale: O(n), memory linear, DB indexes, 1M+ users
- Security: SQL/XSS/injection, privilege escalation
- Over-engineering, missing edge cases, poor naming
- On-call: alert storms, retry storms, cascading failures
- SLOs: p99<200ms, error rate <0.1%, availability 99.9%

---

## 2. PRODUCTION STANDARDS (COMPACT)

**Security**: Input validation, parameterized queries, no eval/crypto, KMS, TLS 1.2+, Auth for ALL state-changing, HttpOnly cookies, No PII logs, JWT RS256, Rate limiting, CSP, SQL/XSS/CSRF prevention, Password hashing (bcrypt/Argon2), Command injection prevention, STRIDE+DREAD.

**Performance**: p50<100ms, p99<200ms, 1000+ RPS, O(n). Benchmark: 10k+ records, 1MB+ payload, baseline vs optimized, warm cache 50ms, profiling. No O(n²), N+1, blocking I/O.

**Observability**: Structured JSON logs, Correlation IDs (X-Request-ID), Levels ERROR/WARN/INFO/DEBUG, /metrics (Prometheus): http_requests_total, http_request_duration_seconds, errors_total, business_metrics. SLOs: 99.9% uptime, p99<200ms, error<0.1%. Tracing (OpenTelemetry), Alerting (Alertmanager).

**Resilience** (need 5/7): Retry (exp backoff+jitter, max 3-5), Timeout (all I/O, 10s default), Circuit breaker (threshold=5, timeout=60s), Bulkhead (isolate pools), Fallback (cache/default/degraded), Health checks (/health: ready, live, db, cache), Graceful shutdown.

**Error Messages**: Format: `[ERROR] Component Action - Reason - Suggestion`. Categories: ValidationError, NotFoundError, ConflictError, PermissionError, ExternalError, TimeoutError, QuotaExceededError. User: clear, actionable, NO stack/SQL/internal. Dev/Log: full context (request ID, user ID, stack, payload, correlation IDs). i18n-ready, recovery hints.

**Concurrency**: Shared variables → Synchronization (mutex/lock/atomic/queue), Safety proof (happens-before), Deadlock avoidance (lock ordering, timeout), Performance (contention analysis), Async safety (handle all rejections, no callback+promise mix). **Prevent**: race conditions, deadlocks.

**Verification & Collaboration**: Pre-commit (husky): lint, type-check, test --coverage. CI (GitHub Actions): lint, type-check, test --coverage (≥80%), security scan. Danger.js: warn PR>500 lines, fail if new code without tests, fail if potential secrets. Makefile: `make quality`. PR template: description, quality checklist, CODEOWNERS. SLA: initial<24h, follow-up<12h, critical<4h. Protected branches, PR required.

**Versioning & Deprecation**: SemVer 2.0, Conventional Commits, Git tagging, Changelog. Pin exact for apps, caret/tilde for libraries. Deprecation: detect → fallback → log → migrate → version pinning.

---

## 3. EVOLUTION FRAMEWORK

**Self-Evolution Files** (auto-maintain):
- `docs/AGENT_METRICS.md`: iterations/task, failure rate, rollback, regressions, MTTR
- `docs/AGENT_PROFILE.md`: weaknesses, fragile modules
- `docs/EVOLUTION.md`: 3-6 month roadmap, refactors, debt

**After every meaningful change**:
1. Update metrics with actual numbers
2. Reflect new weaknesses in PROFILE
3. Adjust EVOLUTION trajectory if changed

**Meta-Goal**: System that breaks less, fixes faster, plans further ahead.

### 3.1 Continuous Improvement Metrics

**- Health Score**: `(coverage% * 0.3) + ((1 - avg_complexity/20) * 0.3) + (test_count/1000 * 0.2) + ((1 - duplication%) * 0.2)`
  Target: tăng ≥0.5%/tuần. Stagnant >3 ngày → escalate.
**- Evolution Rate**: improvements/tuần. Target: ≥10.
**- Technical Debt Reduction**: TODOs/FIXMEs giảm ≥2/tuần.
**- Security Posture**: CVE patches <24h, no secrets, JWT RS256, rate limiting.
**- Performance Trend**: p50/p99 giảm ≥5%/iteration. Baseline: p50<100ms, p99<200ms.
**- Documentation Coverage**: JSDoc ≥95% public APIs.
**- Observability Depth**: Mỗi service ≥5 custom metrics + tracing + structured logs.

Log metrics hàng tuần vào `docs/EVOLUTION.md`. Metric giảm >2% → urgent task.

### 3.2 Autonomous Operation
- **Discovery Cycle**: mỗi 2 giờ
- **Sleep**: 5 phút nếu không có task
- **Emergency Break**: stop nếu error rate >5%, memory >90%, disk <10%
- **Startup**: đọc metrics/profile/evolution, schedule discovery

Xem chi tiết trong AUTO-CONTINUE.md Section 3.

---

## 4. MANDATORY PRINCIPLES

**Code Preservation**: KHÔNG XÓA CODE (last resort). Debug: Read → Understand → Isolate → Test → Verify. If error: preserve, find root cause, fix logic. Always have restore plan from git. Disable feature temporarily instead of delete.

**Change Cost & Risk**: Estimate cost (hours/days). Risk: Low / Medium / High. Rollback time. **Prefer**: Low-risk, high-impact > High-risk, aesthetic.

**Missing Code = Write More**: If missing → VIẾT THÊM. KHÔNG skip, KHÔNG remove code, KHÔNG reduce scope. App must become MORE complete over time.

**Production Readiness Checklist**:
- All functions mental-tested (valid/invalid/edge/error)
- All APIs contract verified
- All flows UI→DB AND DB→UI
- All edge cases covered
- All error paths handled
- Security vulnerabilities none
- Performance acceptable (O(n), profiling)
- Industry standards met
- Documentation updated
- Missing code = written

**Mental Testing Mode**: Imagine ALL inputs (valid, invalid, null, empty, boundary, malformed). Every branch covered. Every error path handled. Data flow BOTH directions. If missing → VIẾT THÊM.

**If missing → VIẾT THÊM** (do not skip).

---

## 5. DEBUGGING FRAMEWORK

### 5.1 Systematic Debugging Process
1. Read entire file - every line, imports, dependencies
2. Understand context - structure, related logic, external calls
3. Isolate problem - reproduction case, minimal code
4. Test hypotheses - debug prints, unit tests
5. Verify fix - ensure no regression

### 5.2 Debugging Checklist
- Read full file before modify
- Identify root cause
- Check braces, parentheses, indentation
- Verify async/await, promises
- Check lifetimes (memory, connections)
- Review error logs full context
- Add debug output if needed
- Isolate section with comments/disable
- Test hypotheses step by step
- Verify happy path & error paths

### 5.3 If Still Failing
- Consult team/pair programming
- Review git history for previous working state
- Disable feature temporarily (feature flag) - DO NOT DELETE
- Always have restore plan from git

**Cấm tuyệt đối**: Xóa code để pass test, "vá áo" tạm thời, chấp nhận degradation, bỏ qua root cause.

---

## 6. ANALYSIS & EXECUTION MODES

### 6.1 Search & Analysis Mode
MAXIMIZE SEARCH EFFORT. Launch multiple background agents IN PARALLEL: explore agents (codebase patterns), librarian agents (remote docs, GitHub examples). Use tools: Grep, rg, ast-grep. **NEVER stop at first result** - be exhaustive.

**Analysis Mode**: Gather context before diving deep. Parallel: 1-2 explore + 1-2 librarian agents. IF COMPLEX → consult specialists: Oracle, Artistry. SYNTHESIZE findings before proceeding.

### 6.2 Strict Mode - NO HALLUCINATION
**MUST NOT**: guess, infer missing behavior, invent APIs, assume inputs, assume error handling. If missing → STOP and output: "Cannot generate tests because: <exact missing information>".

### 6.3 Mental Testing Prompt
Code must be safe for production after mental verification. Test ALL dimensions:
- Inputs: valid, invalid, null, empty, boundary, malformed
- Outputs: return values correct, side effects verified
- Branches: every if/else/switch covered
- Errors: every throw/catch/path handled
- Data Flow: BOTH directions (UI→DB & DB→UI)
- Security: injection, auth bypass, XSS, CSRF
- Performance: O(n) not O(n²), no memory leaks, no blocking I/O
- Concurrency: race conditions, deadlocks, atomicity
- State: consistent across async ops, no corruption
- Observability: logs, metrics, traces emitted

If missing → VIẾT THÊM.

---

## 7. TESTING & QUALITY ASSURANCE

### 7.1 Test Generation
Mock external deps; test pure logic only; tests <100ms; deterministic. Include: valid, null/undefined, boundaries, malformed. Coverage: CI branch ≥80%. All error paths covered. Each public API ≥1 test. Structure: `describe` → `it` (AAA). Unit=business logic; Integration=service contracts; E2E <10% of suite.

### 7.2 Coverage Refactoring Triggers
- Branch <70% → REFACTOR
- 0% coverage → DEAD CODE or UNTESTED
- Error handling <80% → HIGH PRIORITY
- Conditionals not fully covered → missing branches or dead code

**Priorities**: dead code first, then untested error paths, then complex functions, then public API <80%. If coverage <80% → output COVERAGE IMPROVEMENT PLAN.

### 7.3 Production Testing Pipeline (27 Gates)
Source Hygiene → Dependency Freeze → Clean Build → Artifact Verification → Static Analysis → Type/Schema Verification → Unit Test → Coverage Gate → Integration → Contract → Data Migration → Security Scan → Compliance → Performance Sanity → Stress/Edge Case → Failure Mode → Observability Validation → Config Validation → Packaging → Staging Deploy → Smoke Test → Rollback Test → Human Review → Sign-off → Git Push → CI Re-run → Production Release.

LLM only does Step 0. All other steps exist because code lies until proven correct.

---

## 8. SYSTEM AUDIT FRAMEWORK

### 8.1 Audit Dimensions (10)
**Khi audit codebase (trước khi production), kiểm tra TẤT CẢ**:

1. **Business Logic Integrity**: bypass validation, client input manipulation, edge cases, dangerous assumptions, implicit dependencies. **Mô tả exploit nếu có**.

2. **End-to-End Flow Audit**: `Client → API → Service → DB → Cache → Queue → Worker → External → Response`. Tìm: flow ngắt, không rollback, silent failure, missing error handling, resource leak.

3. **Concurrency & Race Condition**: 2 request cùng lúc, 100 request song song, multi-tab, retry, background job song song. Xác định: lost update, double execution, dirty write, non-atomic, lock thiếu.

4. **Database & Data Integrity**: Transaction? Isolation level? Deadlock risk? Unique constraint? Foreign key đầy đủ? Orphan data? Inconsistent state?

5. **Caching & Consistency**: Cache invalidation đúng? Stale cache? Cache stampede? Distributed inconsistency? Cache update trước DB commit?

6. **Idempotency**: Endpoint idempotent? Retry gây double? Webhook 2 lần? Background job trùng? **Implement**: idempotency key header, unique constraint on operation_id.

7. **Failure Scenarios**: DB crash giữa transaction, external API timeout, worker crash, network partition, disk full, memory spike, CPU spike, queue backlog. **Mô tả**: phản ứng? auto recovery? data corruption? fallback?

8. **Security Audit** (STRIDE+DREAD): Input validation, output encoding, SQL/NoSQL injection, XSS, CSRF, SSRF, broken access control, JWT verification, webhook signature, replay attack. DREAD ≥7 → fix immediately.

9. **Scalability Analysis**: O(n)? N+1 query? Memory leak? Blocking I/O? Thread starvation? Event loop blocking? Horizontal scale an toàn? Shared state thread-safe? Benchmark: p50<100ms, p99<200ms.

10. **Observability & Monitoring**: Log đầy đủ? PII trong log? Metric quan trọng? Alert khi failure? Health check? Correlation ID? Distributed tracing?

### 8.2 Mandatory Test Cases
Cho mỗi vấn đề phát hiện, phải tạo: load test, concurrency test, retry test, chaos test, edge case input, malicious input, boundary value, stress test, memory leak simulation, integration test (full E2E). **Test structure**: `describe` → `it` (AAA). Mock external only.

### 8.3 Audit Report Template
- **Executive Summary**: Overall risk, critical/high/medium/low counts, fix time
- **Detailed Findings**: Severity, location, exploit, impact, root cause, fix, test case, priority
- **Compliance Check**: GDPR, PCI-DSS, SOC2
- **Observability Gaps**: Missing logs, metrics, alerts
- **Recommendations**: P0-P3 prioritized
- **Sign-off**: Security Team, SRE Team, Tech Lead

### 8.4 Fix Priority Matrix (P0-P3)
| Severity | Ease | Priority |
|----------|------|----------|
| Critical | Easy | P0 - Immediate |
| Critical | Hard | P0 - Plan |
| High | Easy | P1 - This Sprint |
| High | Hard | P1 - Next Sprint |
| Medium | - | P2 - Backlog |
| Low | - | P3 - Optional |

### 8.5 Audit Checklist (Self-Score ≥90 Required)
- All 10 dimensions audited
- All critical findings documented
- All high findings have fix plan
- All test cases written
- All security threats modeled (STRIDE)
- All failure scenarios tested
- All race conditions identified
- All data integrity risks assessed
- All caching issues resolved
- All idempotency gaps fixed
- All scalability bottlenecks addressed
- All observability gaps filled
- Report signed off by required teams

**Penalty -30** if audit incomplete OR critical issue missed.

---

## 9. COMPLIANCE, COST & LEGACY

**Triggered by keywords**: GDPR, HIPAA, PCI, SOX, COPPA, "cloud", "AWS", "legacy", "monolith", "migration".

### 9.1 Compliance Matrix (GDPR, HIPAA, PCI-DSS, SOX, COPPA)
- **GDPR**: data minimization, purpose limitation, storage limitation, right to erasure/export, consent management, 72h breach notification, DPO, DPIA, ROPA.
- **HIPAA**: RBAC, audit logs (all PHI access), encryption (AES-256 rest, TLS 1.2+ transit), encrypted backups (quarterly restore), BAAs, minimum necessary, annual training, 24/7 incident response.
- **PCI-DSS**: Never store cardholder data unless necessary; PAN masked (first 6/last 4); NEVER store CVV; network segmentation (CDE isolated); quarterly scans + annual pentest; MFA for admin; FIM on CDE; TLS 1.2+; ASV compliance.
- **SOX**: change management (approved, logged), separation of duties (dev ≠ deployer ≠ approver), retention 7+ years immutable, controls documentation mapped to code, quarterly automated audits, no manual acceptance for financial calc.
- **COPPA**: verifiable parental consent before collecting data, no behavioral ads targeting children, parents can delete data, collect only necessary, clear privacy policy in parent-friendly language, no social features without verifiable parental consent.

**Require COMPLIANCE section**: Applicable Standards, Status (Compliant/Non-compliant), Controls, Gaps & Remediation, Audit Evidence, Next Audit Date.

**Penalty -25** if compliance-critical and missing OR missing mandatory controls.

### 9.2 Cost Optimization (Cloud)
Compute: right-size (60-70% CPU), spot/preemptible for non-critical, reserved (1-3y, 30-50% off). Storage: S3 Intelligent-Tiering, lifecycle (Glacier), EBS gp3 vs io2. Database: read replicas, auto-scaling, Aurora Serverless. Network: minimize transfer (same-region, compression, CDN), NAT optimization. Serverless: pay-per-use for spiky workloads. Budget alerts (50%, 80%, 100%), tagging (Environment, Team, Project, Owner).

**Penalty -15** if cloud deployment without optimization plan/tagging/monitoring.

### 9.3 Legacy System Integration
**Strangler Fig**: identify bounded context, build parallel isolated module, gradually route traffic, monitor, expand, decommission.

**Legacy DB migration**: dual writes phase, data validation (row counts, checksums), read-replica sync lag <1s, cutover blue-green with rollback ready.

**API versioning**: always version from start (/api/v1/), support previous version when breaking, deprecation headers, feature flags.

**Technical debt assessment**: debt ratio = legacy LOC / total; >30% → recommend refactor sprint first.

**Requirement**: If touching legacy code, add tests for modified area AND document specific legacy risks addressed.

**Penalty -10** if touching legacy without tests/notes.

---

## 10. SELF-IMPROVEMENT & MAINTENANCE

### 10.1 SELF-EVALUATION QUESTIONS

**Code Output Quality**: SOLID principles? Testable without mocks? Edge cases/errors handled? Clear names? Complexity low (<10 cyclomatic, <3 nesting)? Security vulnerabilities? Performance issues? Would pass code review at Google/Amazon/Microsoft? Can another dev understand in 5 minutes?

**Prompt Effectiveness**: High-quality code? What metrics? Where did output fall short? Which instructions unclear? Did output match user intent? Patterns to codify? Emphasize certain quality attributes? Domain-specific best practices missing?

**Learning from Feedback**: Code smells repeated? Edge cases missed? User corrections? Patterns? Would previous code fail in production? Trade-offs poorly explained?

### 10.2 PROJECT PROFILE (Auto-Detect)

| Profile | Detection Keywords | Adjustments |
|---------|-------------------|-------------|
| **Size** | small/prototype/POC → Small (<10k LOC)<br>medium/app → Medium (10-100k)<br>large/enterprise/scale → Large (>100k) | Small: simplify Tier 2<br>Large: full rigor |
| **Risk** | internal tool/admin panel → Low<br>public API/customer-facing → Medium<br>payment/health/GDPR/PII → High | High: all tiers + compliance |
| **Deployment** | cloud/AWS/GCP/Azure → Cloud<br>on-prem/datacenter → On-prem<br>hybrid → Hybrid | Cloud: cost optimization applies |
| **Team** | solo/1 dev → Solo<br>team/2-10 devs → Small team<br>org/multiple teams → Large team | Large team: PR templates, CODEOWNERS, SLA |

**Default**: Medium risk, Medium size, Cloud, Small team → Full Tier 1 + Tier 2.

### 10.3 DOMAIN-SPECIFIC EDGE CASES

**Web/Frontend**: SPA navigation, offline/online, cookie blocked, screenreader, CORS preflight, hydration errors.

**Backend API**: DB pool exhaustion, deadlock, circuit breaker open, rate limit (429), payload size (413), TLS handshake, DNS failure, file descriptor limit, memory pressure, timezone/DST.

**Mobile**: background kill, low battery, permission interruption, airplane mode, deep linking, push notification taps.

**Data/ML**: data drift, missing values, model version mismatch, feature store outage, training-serving skew, concept drift, feedback delay, schema evolution.

**Embedded**: watchdog timeout, heap corruption, power loss, sensor drift, network partition, real-time deadline miss.

**Requirement**: For your domain, explicitly list applicable edge cases and show how code handles each.

### 10.4 API DEPRECATION

**When using external libraries/platform APIs**:
- Identify: CHANGELOG, linter warnings, IDE hints, runtime warnings.
- Fallback: old API only → polyfill; both → feature detection (same contract).
- Log: dev warnings, telemetry count, alert if usage > threshold.
- Migration: TODO comments with deadline, backlog tickets, test both paths in CI.
- Version pinning: lock to non-deprecated versions, `npm outdated`, test next major before upgrade.

**Require API COMPATIBILITY section**: APIs Used, Deprecation Status, Fallback Strategy, Migration Plan, Version Pinning.

**Penalties**: -10 if no section; -20 if deprecated without fallback.

---

## 11. FRONTEND ARCHITECTURE GUIDELINES

**Atomic Design**: Atoms (Button, Input, Icon...), Molecules (FormGroup, Card, Modal...), Organisms (Header, Sidebar, DataTable...), Templates (AuthLayout, DashboardLayout...), Pages (use Templates, NO inline UI).

**Rules**: Pages use component library (no inline UI). Features organized by domain (not layers). Mỗi feature có component library riêng hoặc dùng shared. UI/UX nhất quán qua shared components.

**Structure**:
```
frontend/
├── components/{atoms,molecules,organisms}/
├── features/{feature}/
├── templates/
└── pages/
```

**Validation Checklist**: Pages use component library. No inline UI in pages. Components use correct atomic hierarchy. Features organized by domain. Shared components no business logic.

---

## 12. BACKEND ARCHITECTURE PATTERNS

**Clean Architecture** (Go, Python, .NET):
- Layers: Delivery → Use Case → Domain → Infrastructure
- Dependency rule: outer depends on inner (abstractions)
- Repository pattern with interfaces
- Interface-based dependency inversion

**Modular Monolith** (.NET, Java):
- 1 artifact, 1 process, 1 DB
- Module independence (code, data, event boundaries)
- App Core: bootstrap, orchestration, transaction
- Platform Layer: IAM, MDM, Eventing, Config
- Cross-module: Events + App Core facade (no direct calls)

**Feature-based SPA** (Angular):
- 1 bundle, standalone, lazy-loaded
- Features = 1-1 mapping với BE module
- State = Feature-local (Angular Signals)
- Boundary = tsconfig paths + ESLint
- Communication = Signal-based + Core services

---

## 13. SKILL INTEGRATION (10 Skills)

**Frontend**: `angular-modular-architect`, `react-architect`
**Backend**: `go-architect`, `python-architect`, `rust-architect`, `dotnet-modular-architect`
**Fullstack**: `erp-architect` (BE .NET + FE Angular)
**Specialized**: `backend-db-pattern` (4 Steps to Database), `iam-platform-layer` (Auth/Authorization), `code-review` (Vibe-cleaner cleanup), `system-audit` (10-dim system audit), `push-guide` (27-gate pipeline), `test-rule` (production-grade testing)

**Use each skill when appropriate**. Output formats trong từng skill file.

### 13.1 Skill ↔ AGENTS.md Cross-Reference

| AGENTS.md Section | Skill File | Integration Point |
|-------------------|------------|-------------------|
| Section 12 (Backend Patterns) | `go-architect`, `python-architect`, `rust-architect`, `dotnet-modular-architect` | Backend architecture reference |
| Section 11 (Frontend Patterns) | `angular-modular-architect`, `react-architect` | Frontend architecture reference |
| Section 8 (System Audit) | `code-review`, `system-audit` | Vibe code detection, 10-dim system audit |
| Section 9 (Compliance/Cost/Legacy) | `iam-platform-layer` | IAM, MDM, Eventing, Config |
| Section 7 (Testing) | `backend-db-pattern`, `test-rule` | 4 Steps to Database, production-grade test generation |
| Section 15 (Verification & Automation) | `push-guide` | 27-gate production release pipeline |
| Section 16 (Collaborative Review) | `code-review` | Code review checklist |
| Fullstack ERP | `erp-architect` | End-to-end ERP architecture |
| IAM Platform | `iam-platform-layer` | Identity & Access Management platform layer |

**Skill Selection Rule**: Khi modify code trong domain nào, phải đọc skill file tương ứng trước.

**Skill Metadata Consistency**: Mọi SKILL.md phải có:
- `name`, `description`, `license`, `compatibility`, `metadata` (audience, scope) trong YAML frontmatter
- Output format section
- Khi nào dùng section

**Missing Code = Write More**: Nếu skill thiếu section bắt buộc → VIẾT THÊM, không skip.

---

## 14. CONCURRENCY ANALYSIS TEMPLATE

Khi code có shared state/parallelism, **phải cung cấp**:

1. **Shared Variables**: List tất cả shared state (global, static, caches, singletons)
2. **Synchronization**: Mutex/lock/atomic/queue used?
3. **Safety Proof**: Happens-before relation, memory barriers, happens-before graph
4. **Deadlock Avoidance**: Lock ordering, timeout, lock-free design, try-lock with backoff
5. **Performance**: Contention points, lock-free alternatives, read-write lock ratio
6. **Async Safety**: Handle all rejections, no callback+promise mix, Promise.all for parallel

**Output Format**:
```markdown
## Concurrency Analysis
- Shared variables: [list]
- Synchronization: [mutex/lock/atomic/Channel]
- Safety proof: [happens-before graph]
- Deadlock avoidance: [lock ordering / timeout / lock-free]
- Performance: [contention analysis, lock-free alternatives]
- Async safety: [all rejections handled, no callback+promise mix]
```

**Prevent**: race conditions, deadlocks, memory consistency errors.

---

## 15. VERIFICATION & AUTOMATION

**Pre-commit** (husky): lint, type-check, test --coverage, fail on high-severity npm audit.

**CI** (GitHub Actions): lint, type-check, test --coverage (enforce ≥80%), security scan, upload artifacts.

**Danger.js**: warn if PR >500 lines, fail if new code without tests, fail if potential secrets (password/key/token).

**Makefile**: `make quality` target runs all checks.

**CLI Entry Point**: `bin/autoqcoder.js` — chạy qua `npx autoqcoder <command>`. Các lệnh: `install` (copy AGENTS.md, AUTO-CONTINUE.md, GOAL.md, skills/ vào project), `init` (khởi tạo framework), `evolve` (chạy evolution cycle), `audit` (chạy system audit 10 dimensions), `quality` (chạy quality gate checks).

**VERIFICATION_STEPS.md** (commands to run locally):
```bash
# 1. Lint
npm run lint

# 2. Type check
npm run type-check

# 3. Tests with coverage
npm test -- --coverage

# 4. Build
npm run build

# 5. Security scan
npm audit

# 6. Quality gate (all checks)
make quality
```

**Quality Gate (non-negotiable)**:
- Functions ≤20 lines (business), ≤50 lines (UI)
- Complexity ≤10
- No 5+ duplicate lines
- 100% error handling (public API)
- 100% input validation (external)
- No hardcoded secrets
- Testable (no direct DB/network in business logic)
- Coverage ≥80% (CI-measured)
- All tests pass

If ANY fail → reject commit, auto-revert.

---

## 16. COLLABORATIVE REVIEW & RELEASE

**PR Template**: description, quality checklist (self-score, mandatory, security, tests, benchmarks, compliance, docs, verification), reviewer focus areas, screenshots/logs.

**CODEOWNERS**: assign reviewers by directory (e.g., `app/auth/ → @security-team, @backend`).

**SLA**: initial review <24h, follow-up <12h, critical security <4h. Escalation: blocked >48h → tech lead → engineering manager.

**Branch strategy**: main protected, feature branches, PR required.

**Versioning**: SemVer 2.0: MAJOR (breaking), MINOR (features), PATCH (fixes). Conventional Commits. Git tagging: `git tag -a v1.2.3 -m "Release 1.2.3" && git push origin v1.2.3`. Changelog with [Unreleased], [1.2.3] - date, Added/Fixed/Removed.

---

## 17. BEHAVIORAL GUIDELINES (CLAUDE)

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 17.1 Think Before Coding
- **Don't assume**. Don't hide confusion. Surface tradeoffs.
- Before implementing: State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 17.2 Simplicity First
- Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 17.3 Surgical Changes
- Touch only what you must. Clean up only your own mess.
- When editing existing code:
  - Don't "improve" adjacent code, comments, or formatting.
  - Don't refactor things that aren't broken.
  - Match existing style, even if you'd do it differently.
  - If you notice unrelated dead code, mention it - don't delete it.
- When your changes create orphans:
  - Remove imports/variables/functions that YOUR changes made unused.
  - Don't remove pre-existing dead code unless asked.
- The test: Every changed line should trace directly to the user's request.

### 17.4 Goal-Driven Execution
- Define success criteria. Loop until verified.
- Transform tasks into verifiable goals:
  - "Add validation" → "Write tests for invalid inputs, then make them pass"
  - "Fix the bug" → "Write a test that reproduces it, then make it pass"
  - "Refactor X" → "Ensure tests pass before and after"
- For multi-step tasks, state a brief plan:
  1. [Step] → verify: [check]
  2. [Step] → verify: [check]
  3. [Step] → verify: [check]
- Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**Validation**: These guidelines work if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## TEMPLATE

```
Expert engineer. Production code:
QUALITY: Functions<=20, complexity<=10, no dup>5, 100% error handling, validation, no secrets.
STRUCTURE: TL;DR, Code, Tests, Verification, Gotchas.
```

---

**v3.0 Compressed**: 16 core sections, ~600 lines target. Maintains 100% functionality, reduces cognitive load by 33%, retains all critical quality gates and audit frameworks.

**Key compression**: Merged 34→16 sections by combining related topics (e.g., CORE QUALITY GATE + PRODUCTION STANDARDS → QUALITY FRAMEWORK; 4 debugging sections → DEBUGGING FRAMEWORK; 5 self-eval/profile/edge/deprecation/coverage → SELF-IMPROVEMENT & MAINTENANCE). Audit framework kept intact due to critical importance.
