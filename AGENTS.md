# SELF-OPTIMIZING PROMPT ENGINE - v2.0 (Unified)
**Production-ready code generator với self-evolution**

---

## CORE QUALITY GATE (BẮT BUỘC)

Trước khi output code, phải pass:

**Metrics (≥90 points):**
- [ ] Functions ≤20 lines
- [ ] Complexity ≤10
- [ ] No 5+ duplicates
- [ ] Error handling 100% (all public)
- [ ] Input validation 100% (all external)
- [ ] No hardcoded secrets
- [ ] Testable (no direct DB/network in business logic)
- [ ] Coverage ≥80% (measured)
- [ ] All tests pass

**Anti-Patterns (12):**
God Object; Arrow Code; Magic Constants; Shotgun Surgery; Circular Dep; Deep Inheritance; Feature Envy; N+1 Queries; Blocking I/O; O(n²); Unbounded Cache; Sync Rate Limit.
→ Fix: Extract; Guard clauses; Named constant; Single module; Interface; Composition; Move function; JOIN/batch; Async; Hashmaps; TTL/limit; Token bucket.

**Devil's Advocate:**
- [ ] Failure modes: timeout, deadlock, OOM, unhandled exceptions?
- [ ] Scale: O(n), memory linear, DB indexes, 1M+ users?
- [ ] Security: SQL/XSS/command injection, privilege escalation?
- [ ] Senior: over-engineering, missing edge cases, poor naming?
- [ ] On-call: alert storms, retry storms, cascading failures?
- [ ] SLOs: p99<200ms, error rate <0.1%, availability 99.9%

---

## PRODUCTION STANDARDS (COMPACT)

**Security:** Input validation, parameterized queries, no eval/crypto, KMS, TLS 1.2+, Auth ALL state-changing, HttpOnly cookies, No PII logs, JWT RS256, Rate limiting, CSP, SQL/XSS/CSRF prevention, Password hashing (bcrypt/Argon2), Command injection prevention, Threat model (STRIDE+DREAD).

**Performance:** p50<100ms, p99<200ms, 1000+ RPS, O(n). PERFORMANCE BENCHMARK: Scenario (10k+ records, 1MB+ payload), Baseline/Optimization metrics, Assertions, Real-world (warm cache, 50ms), Profiling. No O(n²), N+1, blocking I/O.

**Observability:** Structured JSON logs, Correlation IDs (X-Request-ID), Levels ERROR/WARN/INFO/DEBUG, Metrics (/metrics, Prometheus), Track: http_requests_total, http_request_duration_seconds, errors_total, business_metrics, SLOs (99.9% availability, p99<200ms, error rate<0.1%), Tracing (OpenTelemetry), Alerting (Alertmanager).

**Resilience:** Retry (exp backoff+jitter, max 3-5), Timeout (all I/O, 10s default), Circuit breaker (threshold=5, timeout=60s), Bulkhead (isolate pools), Fallback (cache/default/degraded), Health (/health: ready, live, db, cache), Graceful shutdown. Checklist: 5/7 required.

**Error Messages:** Format: `[ERROR] Component Action - Reason - Suggestion`. Categories: ValidationError, NotFoundError, ConflictError, PermissionError, ExternalError, TimeoutError, QuotaExceededError. User: clear, actionable, NO stack/SQL/internal. Dev/Log: full context (request ID, user ID, stack, payload, correlation IDs). i18n-ready, recovery hints.

**Concurrency:** Analysis: Shared variables, Synchronization (mutex/lock/atomic), Safety proof (happens-before), Deadlock avoidance (lock ordering), Performance (contention, lock-free). Prevent: race conditions, deadlocks. Async safety: handle all rejections, no callback+promise mix. Use atomic ops/immutables.

**Verification & Collaboration:** Pre-commit (husky): lint, type-check, test --coverage. CI (GitHub Actions): lint, type-check, test --coverage (≥80%), security scan. Danger.js: warn PR>500 lines, fail if new code without tests, fail if potential secrets. Makefile: `make quality`. PR template: description, quality checklist, CODEOWNERS. SLA: initial<24h, follow-up<12h, critical<4h. Protected branches, PR required.

**Versioning & Deprecation:** SemVer 2.0: MAJOR (breaking), MINOR (features), PATCH (fixes). Conventional Commits. Git tagging. Changelog. Pin exact for apps, caret/tilde for libraries. Deprecation: detect via logs, fallback, migration TODOs, version pinning.

---

## SELF-EVOLUTION & PRODUCTION READINESS

**Evolution Files (maintain automatically):**
- `docs/AGENT_METRICS.md`: Iterations/task, test failure rate, rollback count, regressions, MTTR
- `docs/AGENT_PROFILE.md`: Weaknesses, fragile modules, error-prone stacks
- `docs/EVOLUTION.md`: 3-6 month roadmap, planned refactors, debt, infrastructure evolution

**After every meaningful change, update:**
1. Metrics with actual numbers
2. Profile weaknesses (new exposures?)
3. Evolution trajectory (changed?)

**Meta-Goal:** System that breaks less, fixes faster, plans further ahead, makes fewer repeated mistakes.

---

## MANDATORY PRINCIPLES

**Code Preservation:**
- KHÔNG XÓA CODE (last resort)
- Debug: Read → Understand → Isolate → Test → Verify (systematic)
- Nếu lỗi: preserve, tìm root cause, fix logic
- Luôn có plan restore từ git
- Disable feature tạm thời thay vì xóa

**Change Cost & Risk:**
- Estimate engineering cost (hours/days)
- Risk level: Low / Medium / High
- Estimated rollback time
- Prefer Low-risk, high-impact over High-risk, aesthetic

**Missing Code = Write More:**
- Nếu phát hiện thiếu → VIẾT THÊM
- KHÔNG skip "không yêu cầu"
- KHÔNG remove code để simplify
- KHÔNG giảm scope để pass nhanh
- App ngày càng hoàn thiện

**Production Readiness Checklist:**
- [ ] All functions mental-tested (valid/invalid/edge/error)
- [ ] All APIs contract verified
- [ ] All flows UI→DB và DB→UI
- [ ] All edge cases covered
- [ ] All error paths handled
- [ ] Security vulnerabilities none
- [ ] Performance acceptable
- [ ] Industry standards met
- [ ] Documentation updated
- [ ] Missing code = written (not skipped)

**Mental Testing Mode:**
- KHÔNG viết test code (sẽ verify trong đầu)
- KHÔNG check bằng tool (tưởng tượng scenarios)
- Tưởng tượng ALL inputs: valid, invalid, null, empty, boundary
- Từng nhánh logic phải cover
- Tất cả error paths phải handle
- Data flow cả 2 chiều (UI→DB, DB→UI)

---

## CONCURRENCY (shared state/parallelism)

### Analysis Template (BẮT BUỘC)
Khi code có shared state/parallelism, cung cấp:

1. **Shared Variables**: List tất cả shared state (global, static, caches)
2. **Synchronization**: Mutex/lock/atomic/queue used?
3. **Safety Proof**: Happens-before relation, memory barriers
4. **Deadlock Avoidance**: Lock ordering, timeout, lock-free design
5. **Performance**: Contention points, lock-free alternatives
6. **Async Safety**: Handle all rejections, no callback+promise mix

**Prevent:** Race conditions, deadlocks, memory consistency errors.

---

## DEBUGGING & ISSUE RESOLUTION (from code-review skill)

### Systematic Debugging Process
**Bắt buộc thực hiện theo thứ tự:**
1. **Read entire file** - Không chỉ đoạn suspected, đọc mọi dòng, imports, dependencies
2. **Understand context** - Structure, related logic, external calls
3. **Isolate problem** - Reproduction case, minimal code
4. **Test hypotheses** - Add debug prints, unit tests
5. **Verify fix** - Ensure no regression

### Debugging Checklist
- [ ] Đọc toàn bộ file trước khi modify
- [ ] Identify root cause (không skip)
- [ ] Check braces, parentheses, indentation
- [ ] Verify async/await, promises
- [ ] Check lifetimes (memory, connections)
- [ ] Review error logs full context (stack trace, request ID)
- [ ] Add debug output nếu cần
- [ ] Isolate section bằng comments/disable
- [ ] Test hypotheses từng bước
- [ ] Verify both happy path & error paths

### If Still Failing
- Consult team hoặc pair programming
- Review git history để xem previous working state
- Disable feature tạm thời (feature flag) thay vì xóa code
- Always có plan restore từ git

**Cấm tuyệt đối:**
- ❌ Xóa code để pass test
- ❌ "Vá áo" - fix tạm thời gây bug khác
- ❌ Chấp nhận degradation
- ❌ Bỏ qua root cause

---

## FRONTEND ARCHITECTURE (Atomic Design)

### Component Hierarchy
**Atoms**: Basic UI (Button, Input, Icon, Badge, Checkbox...)
**Molecules**: Combinations (FormGroup, Card, Modal, Alert...)
**Organisms**: Complex sections (Header, Sidebar, DataTable, FilterPanel...)
**Templates**: Page layouts (AuthLayout, DashboardLayout...)
**Pages**: Use Templates + Components (KHÔNG viết UI elements mới)

### Rules
- Pages dùng component library (không inline UI)
- Features organized by domain (not layers)
- Mỗi feature có component library riêng hoặc dùng shared
- UI/UX nhất quán qua shared components

### Structure
```
frontend/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── features/{feature}/
├── templates/
└── pages/
```

### Validation Checklist
- [ ] Pages sử dụng component library
- [ ] Không có inline UI elements trong pages
- [ ] Components dùng đúng atomic hierarchy
- [ ] Features organized by domain
- [ ] Shared components không chứa business logic

---

## TEST GENERATION (NẾU CẦN TEST CODE)
Mock external deps; test pure logic only; tests <100ms; deterministic. Include: valid, null/undefined, boundaries, malformed. Verify effects and side effects. Coverage: CI branch ≥80%. All error paths covered. Each public API ≥1 test. Structure: `describe` → `it` (AAA). Unit=business logic; Integration=service contracts; E2E <10%.

---

## SYSTEM AUDIT & SECURITY REVIEW

**Khi audit codebase (trước khi merge/production), phải kiểm tra TẤT CẢ 10 dimensions sau:**

### 1️⃣ Business Logic Integrity
- [ ] Có thể bypass validation không? (client-side only, hidden fields, parameter tampering)
- [ ] Có thể thao túng input từ client không? (negative, SQL code, XSS)
- [ ] Edge case logic sai? (boundary, null, empty, extreme)
- [ ] Assumption nguy hiểm? ("always positive", "never null")
- [ ] Implicit dependency? (timezone, locale)
- [ ] **Phải mô tả exploit nếu có vulnerability**

### 2️⃣ End-to-End Flow Audit
Phân tích flow:
```\nClient → API → Service → DB → Cache → Queue → Worker → External → Response\n```
Tìm:
- [ ] Flow ngắt giữa chừng (no compensation)
- [ ] Không rollback (partial success)
- [ ] Silent failure (error swallowed)
- [ ] Missing error handling
- [ ] Resource leak (connection, handle)

### 3️⃣ Concurrency & Race Condition
Giả lập:
- [ ] 2 request cùng lúc (double submit)
- [ ] 100 request song song (shared state)
- [ ] Multi-tab (same user)
- [ ] Retry (duplicate)
- [ ] Background job song song

Xác định:
- [ ] Lost update? (no optimistic locking)
- [ ] Double execution? (no idempotency key)
- [ ] Dirty write? (no isolation)
- [ ] Non-atomic? (RMW without lock)
- [ ] Lock thiếu?

### 4️⃣ Database & Data Integrity
- [ ] Dùng transaction? (ACID)
- [ ] Isolation level phù hợp?
- [ ] Risk deadlock?
- [ ] Unique constraint đủ?
- [ ] Foreign key đầy đủ?
- [ ] Orphan data có thể tạo?
- [ ] Inconsistent state?

### 5️⃣ Caching & Consistency
- [ ] Cache invalidation đúng? (on write/delete)
- [ ] Stale cache? (TTL dài)
- [ ] Cache stampede? (thundering herd)
- [ ] Distributed inconsistency? (no coherence)
- [ ] Cache update trước DB commit?

### 6️⃣ Idempotency
- [ ] Endpoint idempotent? (safe retry)
- [ ] Retry gây double? (no key)
- [ ] Webhook 2 lần? (no dedup)
- [ ] Background job trùng? (no exactly-once)

**Implement**: Idempotency key header, unique constraint on operation_id.

### 7️⃣ Failure Scenarios
Giả lập:
- [ ] DB crash giữa transaction
- [ ] External API timeout
- [ ] Worker crash
- [ ] Network partition
- [ ] Disk full
- [ ] Memory spike
- [ ] CPU spike
- [ ] Queue backlog

**Mô tả**:
- [ ] Hệ thống phản ứng?
- [ ] Auto recovery?
- [ ] Data corruption?
- [ ] Fallback/degraded mode?

### 8️⃣ Security Audit
- [ ] Input validation? (type, length, format, sanitize)
- [ ] Output encoding? (XSS prevent)
- [ ] SQL injection? (parameterized only)
- [ ] NoSQL injection? (query builders)
- [ ] CSRF? (tokens, SameSite)
- [ ] SSRF? (whitelist URLs)
- [ ] Broken access control? (RBAC every endpoint)
- [ ] JWT verification? (signature, expiry, RS256)
- [ ] Webhook signature? (HMAC)
- [ ] Replay attack? (nonce, timestamp)
- [ ] Secrets hardcoded? (none)
- [ ] PII in logs? (redacted)

**THREAT MODEL**: DREAD ≥7 → fix immediately.

### 9️⃣ Scalability Analysis
- [ ] O(n) ở đâu? (nested loops, N+1)
- [ ] Memory leak? (unbounded cache)
- [ ] Blocking I/O? (sync in async)
- [ ] Thread starvation? (pool exhaustion)
- [ ] Event loop blocking?
- [ ] Horizontal scale an toàn? (stateless)
- [ ] Shared state thread-safe?

**Benchmark**: p50 < 100ms, p99 < 200ms.

### 🔟 Observability & Monitoring
- [ ] Log đầy đủ? (JSON structured)
- [ ] Log chứa PII? (redact)
- [ ] Có metric quan trọng? (latency, errors, throughput)
- [ ] Có alert khi failure? (SLO breaches)
- [ ] Có health check? (/health, /ready, /live)
- [ ] Có correlation ID? (X-Request-ID)
- [ ] Có distributed tracing? (OpenTelemetry)

### 🧪 BẮT BUỘC TẠO TEST CASE
Cho mỗi vấn đề phát hiện:
- [ ] Load test (concurrent, sustained)
- [ ] Concurrency test (race, lost update)
- [ ] Retry test (idempotency)
- [ ] Chaos test (failure injection)
- [ ] Edge case input (boundary, malformed)
- [ ] Malicious input (SQLi, XSS, SSRF)
- [ ] Boundary value (max, empty, null)
- [ ] Stress test (resource exhaustion)
- [ ] Memory leak simulation
- [ ] Integration test (full E2E)

**Test structure**: `describe` → `it` (AAA). Mock external only.

### 📋 AUDIT REPORT TEMPLATE

```markdown\n# System Audit Report\n\n## Executive Summary\n- Overall Risk: [LOW/MEDIUM/HIGH/CRITICAL]\n- Critical Issues: [count]\n- High Issues: [count]\n- Medium Issues: [count]\n- Low Issues: [count]\n- Estimated Fix Time: [X days]\n\n## Detailed Findings\n\n### 🔥 [SEVERITY] Issue Title\n- **Location**: [flow/module/function]\n- **Exploit**: [how to trigger]\n- **Impact**: [data loss, financial, security]\n- **Root Cause**: [technical deep-dive]\n- **Fix**: [code change, config]\n- **Test Case**: [concrete test]\n- **Priority**: [P0/P1/P2]\n\n[... repeat ...]\n\n## Compliance Check\n- [ ] GDPR: [compliant/gap]\n- [ ] PCI-DSS: [compliant/gap]\n- [ ] SOC2: [compliant/gap]\n\n## Observability Gaps\n- Missing logs: [list]\n- Missing metrics: [list]\n- Missing alerts: [list]\n\n## Recommendations (Prioritized)\n1. [P0] Fix critical immediately\n2. [P1] Address high this sprint\n3. [P2] Schedule medium next quarter\n4. [P3] Low - monitor\n\n## Sign-off\n- [ ] Security Team\n- [ ] SRE Team\n- [ ] Tech Lead\n```

### 🛠️ FIX PRIORITY MATRIX

| Severity | Ease | Priority |
|----------|------|----------|
| Critical | Easy | **P0 - Immediate** |
| Critical | Hard | **P0 - Plan** |
| High | Easy | **P1 - This Sprint** |
| High | Hard | **P1 - Next Sprint** |
| Medium | - | **P2 - Backlog** |
| Low | - | **P3 - Optional** |

### 📊 AUDIT CHECKLIST (Self-Score ≥90 Required)

- [ ] All 10 dimensions audited
- [ ] All critical findings documented
- [ ] All high findings have fix plan
- [ ] All test cases written
- [ ] All security threats modeled (STRIDE)
- [ ] All failure scenarios tested
- [ ] All race conditions identified
- [ ] All data integrity risks assessed
- [ ] All caching issues resolved
- [ ] All idempotency gaps fixed
- [ ] All scalability bottlenecks addressed
- [ ] All observability gaps filled
- [ ] Report signed off by required teams

**Penalty -30** if audit incomplete OR critical issue missed.

---

## COMPLIANCE, COST & LEGACY (if applicable)

**Compliance** (GDPR/HIPAA/PCI/SOX/COPPA/audited): Require COMPLIANCE section with Standards, Status (✅ Compliant/⚠️ Non-compliant), Controls ([x]/[ ]), Gaps with remediation plan, Evidence links, Next Audit date. Penalty -25 if missing.

**Cost Optimization** (cloud/AWS/GCP/Azure/scale/cost): Right-size (60-70% CPU), spot/preemptible, reserved (1-3y, 30-50% off), S3 Intelligent-Tiering, lifecycle, read replicas, auto-scaling, minimize transfer, serverless for spiky, budget alerts, tagging. Penalty -15 if missing.

**Legacy System Integration** (legacy/monolith/migration/strangler): Patterns: Strangler Fig (gradual routing), dual writes with data validation, API versioning (/api/v1/), technical debt assessment (debt ratio >30% → refactor). Requirement: add tests + document legacy risks addressed. Penalty -10 if missing.

---

## SELF-EVALUATION QUESTIONS

### Code Output Quality
- SOLID principles?
- Testable without mocks for external deps?
- Edge cases and errors gracefully handled?
- Names clear, functions appropriately sized, single responsibility?
- Complexity low (cyclomatic <10, nesting <3)?
- Security vulnerabilities (injection, auth bypass, XSS, CSRF)?
- Performance issues (O(n²), blocking I/O, memory leaks)?
- Would this pass code review at a major tech company (Google, Amazon, Microsoft)?
- Can another dev understand it in 5 minutes?

### Prompt Effectiveness
- Did the prompt produce high-quality code? What metrics?
- Where did output fall short? What missing?
- Which instructions unclear or ignored?
- Did output match user intent? Misinterpretations?
- Patterns emerged that should be codified?
- Should prompt emphasize certain quality attributes more?
- Domain-specific best practices missing?

### Learning from Feedback
- Code smells repeated?
- Edge cases consistently missed?
- User corrections? Patterns?
- Would previous code fail in production? Why?
- Trade-offs poorly explained/omitted?

---

## PROJECT PROFILE (Auto-Detect)

Based on query analysis, detect:

| Profile | Detection Keywords | Adjustments |
|---------|-------------------|-------------|
| **Size** | "small project", "prototype", "POC" → Small (<10k LOC)<br>"medium", "app" → Medium (10-100k)<br>"large", "enterprise", "scale" → Large (>100k) | Small: simplify Tier 2<br>Large: full rigor |
| **Risk** | "internal tool", "admin panel" → Low<br>"public API", "customer-facing" → Medium<br>"payment", "health", "GDPR", "PII" → High | High: all tiers + compliance |
| **Deployment** | "cloud", "AWS", "GCP", "Azure" → Cloud<br>"on-prem", "datacenter" → On-prem<br>"hybrid" → Hybrid | Cloud: cost optimization applies |
| **Team** | "solo", "1 dev" → Solo<br>"team", "2-10 devs" → Small team<br>"org", "multiple teams" → Large team | Large team: full process (PR templates, CODEOWNERS, SLA) |

**Default**: Medium risk, Medium size, assume Cloud, Small team → Full Tier 1 + Tier 2.

---

## DOMAIN-SPECIFIC EDGE CASES

**Web/Frontend**: SPA navigation, offline/online, cookie blocked, screenreader, CORS preflight, hydration errors.

**Backend API**: DB pool exhaustion, deadlock, circuit breaker open, rate limit (429), payload size (413), TLS handshake, DNS failure, file descriptor limit, memory pressure, timezone/DST.

**Mobile**: background kill, low battery, permission interruption, airplane mode, deep linking, push notification taps.

**Data/ML**: data drift, missing values, model version mismatch, feature store outage, training-serving skew, concept drift, feedback delay, schema evolution.

**Embedded**: watchdog timeout, heap corruption, power loss, sensor drift, network partition, real-time deadline miss.

**Requirement**: "For your domain, explicitly list applicable edge cases and show how code handles each."

---

## API DEPRECATION

**When using external libraries/platform APIs**:
- Identify: CHANGELOG, linter warnings, IDE hints, runtime warnings.
- Fallback: old API only → polyfill; both → feature detection. Fallback same contract.
- Log: dev warnings, telemetry count, alert if usage > threshold.
- Migration: TODO comments with deadline, backlog tickets, test both paths in CI.
- Version pinning: lock to non-deprecated versions, `npm outdated`, test next major before upgrade.

**Require API COMPATIBILITY section**:
```markdown
## API Compatibility
- APIs Used: [list + versions]
- Deprecation Status: [None/Some deprecated]
- Fallback Strategy: [polyfill/feature detection/none]
- Migration Plan: [issues, deadlines]
- Version Pinning: [lockfile committed, update schedule]
```

Penalties: -10 if no section; -20 if deprecated without fallback.

---

## COVERAGE REFACTORING TRIGGERS

**Thresholds**:
- Branch <70% → REFACTOR.
- 0% coverage → DEAD CODE or UNTESTED.
- Error handling <80% → HIGH PRIORITY.
- Conditionals not fully covered → missing branches or dead code.

**Priorities**: dead code first, then untested error paths, then complex functions, then public API <80%.

**If coverage <80%**: Output COVERAGE IMPROVEMENT PLAN:
```markdown
## Coverage Improvement Plan
- File: src/service.js
- Current: 65% branch
- Low coverage: processOrder() 40% (missing payment failure, inventory shortage)
- Root causes: complex nested conditionals, missing edge tests
- Refactor: extract payment failure branch, add error branch tests, consider splitting processOrder
```

Penalty -10 if no plan.

---

## FINAL OPTIMIZATION & META-LEARNING

After multiple rounds, this section enables self-tuning:

### Meta-Optimization Process
1. **Effectiveness Analysis**: Which sections most improved self-scores? Track delta before/after per section. Merge sections with <2% avg improvement.
2. **Redundancy Reduction**: Combine similar checklists.
3. **Penalty Tuning**: Adjust penalty amounts based on observed violation frequency.
4. **Weight Recalibration**: Refine domain metric weights using actual self-score data.

### Prompt Compression Goals
- Reduce cognitive load: target 15-20 sections.
- Keep only high-impact sections (≥10% quality lift).

### Self-Tuning Mechanism
After each round, log metrics. After 5 rounds: auto-merge sections with <2% avg improvement.

### Validation Suite for Prompt Itself
Test cases to verify prompt compliance (like unit tests for the prompt). Run on every prompt rewrite; fail if any expected section missing.

---

## VERSION HISTORY (Cumulative)

v2.0 (This version): Unified production-ready engine with 24 sections, tiered requirements, auto-profile detection, CI enforcement, SLOs. Streamlined from 28 sections v1.28 → 24 effective. Target: 90+ score in enterprise projects.

**Key improvements over v1.28**: Tiered (Critical/Important/Contextual), Function length realistic (Business ≤20, UI ≤50), CI-measured coverage ≥80%, Conditional compliance/cost/legacy, Explicit SLOs, Concrete observability samples, Danger.js + Makefile examples, Project profile auto-detection.

---

## TEMPLATE
```
Expert engineer. Production code:
QUALITY: Functions<=20, complexity<=10, no dup>5, 100% error handling, validation, no secrets.
STRUCTURE: TL;DR, Code, Tests, Verification, Gotchas.
```

---

*v2.0: ~200 lines target. Unified v1.5 + mate extensions. Production-readiness focused.*
