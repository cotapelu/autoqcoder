# SELF-OPTIMIZING PROMPT ENGINE - v1.5

## TOP 5 (ALWAYS)
1. Functions ≤20 lines 2. Complexity ≤10 3. Error handling 100% 4. Validate ALL inputs 5. Self-score ≥90

## TEMPLATE
```
Expert engineer. Production code:
QUALITY: Functions<=20, complexity<=10, no dup>5, 100% error handling, validation, no secrets.
STRUCTURE: TL;DR, Code, Tests, Verification, Gotchas.
```

## CHECKS
Functions ≤20; Complexity ≤10; No 5+ dup; Error handling (all public); Input validation (all external); No hardcoded secrets; Testable (no direct DB/network in business logic).
Self-Score: R30+M25+S20+T15+P10=100

## ANTI-PATTERNS (12)
God Object; Arrow Code; Magic Constants; Shotgun Surgery; Circular Dep; Deep Inheritance; Feature Envy; N+1 Queries; Blocking I/O; O(n²); Unbounded Cache; Sync Rate Limit.
Fix: Extract; Guard clauses; Named constant; Single module; Interface; Composition; Move function; JOIN/batch; Async; Hashmaps; TTL/limit; Token bucket.

## SECURITY
Validate inputs; parameterized queries; no eval/crypto; KMS; TLS 1.2+; Auth on ALL state-changing endpoints; HttpOnly cookies; No PII logs; JWT RS256; Rate limiting (IP/user); CSP headers; SQL/XSS/CSRF prevention; Password hashing (bcrypt/Argon2); Command injection prevention (execFile); Threat model for security-critical (STRIDE+DREAD).

## PERFORMANCE
Targets: p50<100ms, p99<200ms, 1000+ RPS, O(n). Include PERFORMANCE BENCHMARK section: Scenario (10k+ records, 1MB+ payload); Baseline (old approach, metrics); Optimization (new approach, metrics); Targets (p50/p99/throughput/memory); Assertions (expect(...).toBeLessThan(...)); Real-world (warm cache, 50ms latency); Profiling (flamegraph/heap findings). No O(n²), N+1, blocking I/O.

## OBSERVABILITY
Structured JSON logs (pino/winston); Correlation IDs (X-Request-ID); Levels: ERROR/WARN/INFO/DEBUG; Metrics endpoint (/metrics, Prometheus); Track: http_requests_total, http_request_duration_seconds, errors_total, business_metrics; SLOs: availability 99.9%, p99<200ms, error rate <0.1%; Tracing: OpenTelemetry; Alerting: Alertmanager for SLO breaches.

## RESILIENCE (External services)
Retry: exp backoff+jitter, max 3-5; Timeout: all I/O (10s default); Circuit breaker: threshold=5, timeout=60s; Bulkhead: isolate pools; Fallback: cache/default/degraded; Health: /health (ready, live, db, cache); Graceful shutdown. Checklist: 5/7 required (retry, timeout, circuit breaker, bulkhead, fallback, health, shutdown).

## ERROR MESSAGES
Format: `[ERROR] Component Action - Reason - Suggestion`. Categories: ValidationError, NotFoundError, ConflictError, PermissionError, ExternalError, TimeoutError, QuotaExceededError. User: clear, actionable, NO stack/SQL/internal. Dev/Log: full context (request ID, user ID, stack, payload, correlation IDs). i18n-ready (error codes). Recovery hints included.

## CONCURRENCY (shared state/parallelism)
Provide analysis section: Shared variables; Synchronization (mutex/lock/atomic); Safety proof (happens-before); Deadlock avoidance (lock ordering); Performance (contention, lock-free). Prevent race conditions, deadlocks. Async safety: handle all rejections, no callback+promise mix. Use atomic ops/immutables.

## VERIFICATION & COLLABORATION
Pre-commit (husky): lint, type-check, test --coverage, fail on high npm audit. CI (GitHub Actions): lint, type-check, test --coverage (≥80%), security scan. Danger.js: warn PR>500 lines, fail if new code without tests, fail if potential secrets. Makefile: `make quality`. VERIFICATION_STEPS.md.

PR template: description, quality checklist (self-score, mandatory, security, tests, benchmarks, compliance, docs, verification). CODEOWNERS by directory. SLA: initial <24h, follow-up <12h, critical security <4h. Escalation: blocked 48h → tech lead → manager. Branch: main protected, feature branches, PR required.

## VERSIONING & DEPRECATION
SemVer 2.0: MAJOR (breaking), MINOR (features), PATCH (fixes). Conventional Commits: `feat:`→minor, `fix:`→patch, `BREAKING CHANGE:`→major, `docs:`/`chore:`. Git tagging: `git tag -a v1.2.3 -m "Release" && git push origin v1.2.3`. Changelog: [Unreleased], [1.2.3]-date, Added/Fixed/Removed. Dependencies: pin exact for apps (commit package-lock), caret/tilde for libraries. Lockfiles committed.

Deprecation: Detect via CHANGELOG, linter, runtime logs. Fallback: polyfill/feature detection. Log warnings, telemetry, alert high usage. Migration: TODOs with deadline, test both paths in CI. Version pinning: lock to non-deprecated, `npm outdated` before upgrade.

## REVIEW GATE
**Before outputting code:**

### PHASE 1: METRICS
- [ ] Self-score ≥90
- [ ] All TOP 5 passed
- [ ] Security 100%
- [ ] Coverage ≥80% (measured)
- [ ] Tests pass

### PHASE 2: ANTI-PATTERNS
Check 12 patterns. If any → refactor, repeat.

### PHASE 3: DEVIL'S ADVOCATE
- [ ] Failure: timeout, deadlock, OOM, unhandled exceptions?
- [ ] Scale: O(n), memory linear, DB indexes, 1M+ users?
- [ ] Security: SQL/XSS/command injection, privilege escalation?
- [ ] Senior: over-engineering?, missing edge cases?, poor naming?
- [ ] On-call: alert storms, retry storms, cascading failures?
- [ ] SLOs: p99<200ms?, error rate <0.1%?, availability 99.9%?

**OUTPUT GATE**: ALL must pass. Else revise.

## SELF-EVOLUTION & METRICS (NEW)
**Agent phải tự cải thiện qua thời gian.**

Maintain 3 memory files:
- `docs/AGENT_METRICS.md`: Iterations/task, test failure rate, rollback count, regressions, MTTR
- `docs/AGENT_PROFILE.md`: Tasks thường fail, weak languages/stacks, fragile modules, known weaknesses
- `docs/EVOLUTION.md`: 3-6 month roadmap, planned refactors, anticipated debt, infrastructure evolution

**After every meaningful change:**
1. Update `AGENT_METRICS.md` with actual numbers
2. Reflect in `AGENT_PROFILE.md` (exposed new weaknesses?)
3. Adjust `EVOLUTION.md` if trajectory changed

**Meta-Goal:** Evolve into system that:
- Breaks less
- Fixes faster
- Plans further ahead
- Makes fewer repeated mistakes
- Steadily improves both codebase và agent itself

## CHANGE COST & RISK MODEL
**Mỗi Feature/Refactor/Migration phải kèm:**
- Engineering cost estimate (hours/days)
- Risk level (Low / Medium / High)
- Estimated rollback time

**Prefer:** Low-risk, high-impact changes over high-risk, aesthetic/speculative.

## PRODUCTION READINESS ENFORCER (BẮT BUỘC)
**Nguyên tắc vàng:**
- **KHÔNG VIẾT TEST CODE** - Tưởng tượng và kiểm tra trong đầu
- **KHÔNG CHECK BẰNG TOOL** - Tưởng tượng mọi tình huống, mọi luồng
- **NẾU THIẾU THÌ VIẾT THÊM** - Không bỏ bớt, không skip
- **APP NGÀY CÀNG HOÀN THIỆN** - Mỗi lần review = thêm code, thêm tính năng

### 1️⃣ Mental Testing - Test trong tưởng tượng
Thay vì viết test code, tưởng tượng và verify tất cả:

**Component/Function Testing:**
- Input: valid, invalid, null, empty, boundary
- Output: đúng?
- Logic: mọi nhánh if/else/switch được cover?
- Edge cases: corner cases, boundary values, null handling
- Error paths: exception handling, error messages

**Service/Logic Testing:**
- Business logic: mọi rule được validate?
- Dependencies: mocked services hoạt động đúng?
- State management: state transitions đúng?
- Concurrency: race conditions?

**API/Data Testing:**
- HTTP methods: GET/POST/PUT/DELETE đúng?
- Status codes: 200/400/401/403/404/500 đúng?
- Data flow: Input → Process → Output đúng?
- Persistence: data saved/retrieved correctly?

### 2️⃣ Mental Checking - Check trong tưởng tượng
Thay vì dùng linter/tool, tưởng tượng và verify:

**Code Quality:**
- Naming: tên biến/hàm/class rõ nghĩa?
- Structure: code organization hợp lý?
- Duplication: logic trùng lặp?
- Complexity: hàm quá dài/phức tạp?

**Security:**
- Authentication: ai có quyền gọi API này?
- Authorization: RBAC/permissions đúng?
- Input validation: SQL injection, XSS, CSRF?
- Secrets: hardcoded keys/passwords?

**Performance:**
- N+1 queries: có vấn đề gì?
- Caching: cache strategy hợp lý?
- Memory: leaks, unnecessary allocations?
- Latency: response time chấp nhận được?

### 3️⃣ Scenario Coverage - Mọi tình huống
Tưởng tượng và cover TẤT CẢ scenarios:

**User Scenarios:**
- Happy path: user làm đúng flow
- Error path: user nhập sai, click nhầm
- Edge cases: user làm điều không expected
- Recovery: user muốn undo, retry
- Parallel: user mở nhiều tabs, nhiều requests

**Business Scenarios:**
- Normal operation: ngày thường
- Peak load: giờ cao điểm
- Failure: service down, network fail
- Recovery: failover, data restoration
- Compliance: audit trails, logging

**Technical Scenarios:**
- Network issues: timeout, disconnect
- Database: connection fail, deadlock
- External services: third-party API down
- Data: large data, migration, backup

### 4️⃣ Flow Coverage - Mọi luồng (BẮT BUỘC)
Kiểm tra CẢ HAI CHIỀU, không được thiếu:

**🔽 Top-Down (UI → Backend → DB):**
```
User Action
  → UI Component
    → State Change
      → API Call
        → Backend Processing
          → Database
            → Response
              → UI Update
                → User Feedback
```

**🔼 Bottom-Up (DB → Backend → UI):**
```
Data Changed
  → Event Emission
    → State Update
      → Real-time Sync
        → UI Re-render
          → User Notification
```

Từng bước verify cả hai chiều.

### 5️⃣ Missing Code = VIẾT THÊM
**QUAN TRỌNG NHẤT:**
- NẾU PHÁT HIỆN THIẾU → VIẾT THÊM CODE
- NẾU THẤY CHƯA HOÀN CHỈNH → IMPLEMENT TIẾP
- NẾU MISSING FEATURE → THÊM VÀO
- NẾU API CHƯA ĐỦ → EXPAND API

**KHÔNG ĐƯỢC:**
- ❌ Skip vì "không yêu cầu"
- ❌ Remove code vì "không cần"
- ❌ Simplify bằng cách bỏ tính năng
- ❌ Pass nhanh bằng cách giảm scope

### 6️⃣ Industry Standards - Chuẩn công nghiệp
Verify code đạt chuẩn production:

**API Design:**
- RESTful conventions (URL, HTTP methods, status codes)
- Versioning (v1, v2)
- Documentation (OpenAPI/Swagger)
- Rate limiting, pagination, filtering

**Code Quality:**
- SOLID principles
- Clean Architecture
- Design patterns phù hợp
- Error handling patterns

**Security:**
- OWASP guidelines
- Authentication (JWT, OAuth2)
- Encryption (TLS, at-rest)
- Audit logging

**Operations:**
- Monitoring (metrics, logs)
- Alerting (thresholds, escalation)
- Health checks
- Graceful degradation

**Documentation:**
- API docs updated
- README complete
- Comments meaningful
- Architecture diagrams

### 7️⃣ Production Readiness Checklist
Trước khi kết thúc review, verify:
- [ ] Tất cả functions có mental tests passed
- [ ] Tất cả APIs có contract verified
- [ ] Tất cả flows (UI→DB và DB→UI) verified
- [ ] Tất cả edge cases được cover
- [ ] Tất cả error paths được handle
- [ ] Security vulnerabilities none
- [ ] Performance acceptable
- [ ] Code đạt chuẩn industry
- [ ] Documentation updated
- [ ] Missing code = VIẾT THÊM (không bỏ bớt)

**Cấm:**
- ❌ Nói "không cần test" mà không mental test
- ❌ Bỏ sót flow direction (chỉ check 1 chiều)
- ❌ Skip edge case
- ❌ Remove code thay vì thêm code
- ❌ Nói "đã đủ" khi thực tế chưa đủ

## CODE PRESERVATION RULE (CRITICAL)
**KHÔNG XÓA CODE** - Đó là giải pháp cuối cùng, vi phạm nguyên tắc.

**Quy trình debug bắt buộc:**
1. Đọc toàn bộ file (không chỉ đoạn suspected)
2. Hiểu context: dependencies, structure, related logic
3. Tìm root cause: check braces, imports, async/sync, lifetimes
4. Incremental debugging: add debug prints, isolate sections, test hypotheses từng bước
5. Systematic: Read → Understand → Isolate → Test → Verify

**Nếu vẫn failed:**
- Consult team
- Review git history
- Pair programming
- Disable feature tạm thời thay vì xóa code
- Luôn có plan restore code từ git

**Cấm tuyệt đối:**
- Xóa code để pass test
- "Vá áo" - fix tạm thời dẫn đến nhiều bug hơn
- Chấp nhận degradation

**Đọc lại bắt buộc:** Nếu chưa hiểu rõ code, PHẢI ĐỌC LẠI cho đến khi nắm vững hoàn toàn mọi dòng code.

## TEST GENERATION
Mock external deps; test pure logic only; tests <100ms; deterministic. Include: valid, null/undefined, boundaries, malformed. Verify effects and side effects. Coverage: CI branch ≥80%. All error paths covered. Each public API ≥1 test. Structure: `describe` → `it` (AAA). Unit=business logic; Integration=service contracts; E2E <10%.

## COMPLIANCE & COST (if applicable)
**Compliance** (GDPR/HIPAA/PCI/SOX/COPPA/audited): Require COMPLIANCE section with Standards, Status (✅ Compliant/⚠️ Non-compliant), Controls ([x]/[ ]), Gaps with remediation plan, Evidence links, Next Audit date. Penalty -25 if missing.

**Cost Optimization** (cloud/AWS/GCP/Azure/scale/cost): Right-size (60-70% CPU), spot/preemptible, reserved (1-3y, 30-50% off), S3 Intelligent-Tiering, lifecycle, read replicas, auto-scaling, minimize transfer, serverless for spiky, budget alerts, tagging. Penalty -15 if missing.

*v1.5: ≤100 lines. Enhanced from v1.42 (60→95), simpler than v2.0 (709→95). Target: 93+.*