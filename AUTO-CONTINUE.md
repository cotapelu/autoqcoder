# AUTO-CONTINUE.md - Optimized Agent Workflow
*Version: v2.1 Compact + Audit Extension (AGENTS.md compliant)*

---

## WORKFLOW (MANDATORY)

```
Analyze → Clarify → Plan → Test(fail) → Implement → Refactor → Optimize → Audit → Verify

LOOP: while failed || improvable || not_minimal || audit_failed:
  detect → improve → test → audit → verify
```

**Note**: `Audit` step is MANDATORY before `Verify`. Code must pass System Audit (10 dimensions) before considered done.

---

## SESSION START (BẮT BUỘC)

Mỗi session mới hoặc sau khi đọc codebase mới:

1. Đọc toàn bộ repository
2. Đọc `docs/PROJECT_STATE.md` (nếu có)
3. Hiểu capabilities và failures hiện tại
4. Xác định next highest-impact task
5. Implement improvements
6. Run tests/builds với tools
7. **Run System Audit (10 dimensions from AGENTS.md)**
8. Update `PROJECT_STATE.md`
9. Update `TODO.md` với completed và follow-ups

---

## CONTINUOUS LOOP MODE

Default: continuous evolution. Sau khi complete iteration, phải identify next highest-impact TODO và tiếp tục work, ngay cả khi không có user prompt mới, UNLESS:
- User explicitly tells you to stop/pause
- Tests/builds fail và cần clarification
- **Audit fails (critical issues found)**
- Không còn actionable TODO items

---

## EVOLUTION & SELF-IMPROVEMENT (CORE)

**Mỗi vòng loop phải update evolution files:**

- `docs/AGENT_METRICS.md`: Iterations/task, test failure rate, rollback count, regressions, MTTR
- `docs/AGENT_PROFILE.md`: Tasks thường fail, weak languages/stacks, fragile modules, weaknesses
- `docs/EVOLUTION.md`: Trajectory changes, planned refactors, anticipated debt updates

**Meta-Goal:** System breaks less, fixes faster, plans further ahead, ít repeated mistakes.

---

## GIT COMMIT (MANDATORY)

**SAU KHI HOÀN THÀNH MỘT VÒNG LOOP:**

```bash
git add -A
git commit -m "chore: evolution round - <brief description>"
```

Chỉ sau git commit xong thì mới bắt đầu vòng mới.

---

## MENTAL TESTING (KHÔNG VIẾT CODE)

- Tưởng tượng valid/invalid/null/edge cases
- Từng nhánh logic được cover?
- Error paths được handle?
- Data flow cả 2 chiều (UI→DB và DB→UI)
- Nếu thiếu → VIẾT THÊM code (không skip)

---

## CODE PRESERVATION (KHÔNG XÓA)

**Debug bắt buộc:**
1. Đọc toàn bộ file (không chỉ đoạn suspected)
2. Hiểu context: dependencies, structure, related logic
3. Tìm root cause: check braces, imports, async/sync, lifetimes
4. Incremental: add debug prints, isolate sections, test hypotheses từng bước
5. Systematic: Read → Understand → Isolate → Test → Verify

**Nếu vẫn fail:** Consult team, review git history, pair programming, disable feature tạm thời thay vì xóa code, luôn có plan restore.

**Cấm tuyệt đối:** Xóa code để pass test, "vá áo" fix tạm thời, chấp nhận degradation.

---

## CHANGE COST & RISK

**Mỗi Feature/Refactor/Migration phải assess:**
- Engineering cost (hours/days)
- Risk: **Low** / **Medium** / **High**
- Estimated rollback time

**Prefer:** Low-risk, high-impact > high-risk, aesthetic/speculative.

---

## MISSING CODE = WRITE MORE

- Nếu thiếu feature, API, logic, edge case → **VIẾT THÊM**
- KHÔNG skip vì "không yêu cầu"
- KHÔNG remove code để simplify
- KHÔNG pass nhanh bằng cách giảm scope
- **App phải ngày càng hoàn thiện**, không less complete

---

## SKILL INTEGRATION (10+ REQUIRED)

Đọc skill file trước khi modify:

| Skill | Use Case |
|-------|----------|
| `angular-modular-architect` | Angular SPA |
| `backend-db-pattern` | Database (4 steps) |
| `code-review` | Cleanup |
| `dotnet-modular-architect` | .NET monolith |
| `erp-architect` | Fullstack ERP |
| `iam-platform-layer` | Auth/Security |
| `go-architect` | Go services |
| `python-architect` | Python apps |
| `react-architect` | React apps |
| `rust-architect` | Rust systems |

---

## DEBUGGING CHECKLIST

**Systematic Process:**
1. Read entire file (mọi dòng, imports)
2. Understand context (structure, related logic)
3. Isolate problem (reproduction case)
4. Test hypotheses (debug prints, unit tests)
5. Verify fix (no regression)

**Per-file:**
- [ ] Đọc toàn bộ file trước khi modify
- [ ] Identify root cause (không skip)
- [ ] Check braces, parentheses, indentation
- [ ] Verify async/await, promises
- [ ] Check lifetimes (memory, connections)
- [ ] Review error logs full context
- [ ] Add debug output nếu cần
- [ ] Isolate section bằng comments
- [ ] Test hypotheses từng bước
- [ ] Verify happy & error paths

**Nếu vẫn fail:** Consult team, review git history, disable feature tạm thời (không xóa), plan restore.

**Cấm:** Xóa code để pass, vá áo, chấp nhận degradation.

---

## PRODUCTION TESTING PIPELINE (PUSHGUIDE COMPLIANT)

**Before push**: Code must pass through ALL 27 gates:

0. **Trạng thái khởi đầu** - Code mới tạo, chưa kiểm chứng → **Untrusted Code Artifact**
1. **Source Hygiene** - Remove placeholders, TODOs, mock hardcode, normalize encoding.
2. **Dependency Freeze** - Resolve all libs, lock versions, snapshot tree, checksum.
3. **Clean Build** - Zero cache, build from scratch, compile/link/bundle/package.
4. **Artifact Verification** - Binary exists, hash stable, size valid, no missing files.
5. **Static Code Analysis** - Undefined behavior, race conditions, null access, injection, memory misuse, dead code.
6. **Type/Schema Verification** - Type compatibility, interface match, API contract, DB schema.
7. **Unit Test Execution** - Business rules, validation, calculation, state transitions.
8. **Test Coverage Gate** - Core logic, auth, payment, data mutation, permission (≥80%).
9. **Integration Test** - API↔DB, service↔service, frontend↔backend, worker↔queue.
10. **Contract Test** - API backward compatible, event schema stable.
11. **Data Migration Validation** - If DB: migration, rollback, no data loss, no corruption.
12. **Security Scan** - Vulnerable deps, secret leak, hardcoded credentials, open ports, dangerous permissions.
13. **Compliance Check** - Logging, audit trail, data retention, PII handling, GDPR/HIPAA/SOC2.
14. **Performance Sanity** - CPU, RAM, IO, thread, connection pool.
15. **Stress/Edge Case** - Empty input, max size, burst traffic, timeout, retry storm.
16. **Failure Mode Test** - DB down, API down, disk full, memory full, network loss.
17. **Observability Validation** - Log, metrics, trace, error report.
18. **Configuration Validation** - Env vars, secret store, feature flags, region, scale.
19. **Packaging** - Docker image, binary, bundle, Helm, artifact versioned.
20. **Staging Deploy** - Real infra, real network, real scale, fake data.
21. **Smoke Test** - App start, API respond, job run, UI load.
22. **Rollback Test** - Deploy new version, rollback old version, no data loss.
23. **Human Review Gate** - Architecture, business rule, security, failure scenarios reviewed by human.
24. **Sign-off** - Tech lead, security, product approve.
25. **Git Push Allowed** - Only now `git push`.
26. **CI Re-run All Gates** - No bypass.
27. **Production Release** - Deploy to production.

**Conclusion**: LLM only does Step 0. All other steps exist because code lies until proven correct. "Vibe code then push straight" = prototype, not software engineering.

---

## SYSTEM AUDIT WORKFLOW (from AUDIT.md)

**Trigger**: Before any production deploy OR after major changes.

**Audit all 10 dimensions** (see AGENTS.md Section 10 for detailed checklist):

1. Business Logic Integrity
2. End-to-End Flow Audit
3. Concurrency & Race Condition
4. Database & Data Integrity
5. Caching & Consistency
6. Idempotency
7. Failure Scenarios
8. Security Audit (STRIDE + DREAD)
9. Scalability Analysis
10. Observability & Monitoring

**For each issue found**, must produce:

- 🔥 **Severity**: Critical / High / Medium / Low
- 📍 **Location**: flow / module / function
- 💥 **Exploit**: how to trigger
- 🧨 **Impact**: data loss, financial, security
- 🛠 **Fix**: code change, config
- 🧪 **Test Case**: concrete test
- **Priority**: P0/P1/P2/P3

**Audit Report Template** (see AGENTS.md).

**Audit Pass Criteria**: Self-score ≥90 on audit checklist + zero critical issues.

If audit fails → return to `Optimize` step, do NOT proceed to `Verify`.

---

## SEARCH & ANALYSIS MODE (from TESTRULE)

### [search-mode]
MAXIMIZE SEARCH EFFORT. Launch multiple background agents IN PARALLEL:
- explore agents (codebase patterns, file structures, ast-grep)
- librarian agents (remote repos, official docs, GitHub examples)
Plus direct tools: Grep, ripgrep (rg), ast-grep (sg)
NEVER stop at first result - be exhaustive.

### [analyze-mode]
ANALYSIS MODE. Gather context before diving deep:

**CONTEXT GATHERING (parallel):**
- 1-2 explore agents (codebase patterns, implementations)
- 1-2 librarian agents (if external library involved)
- Direct tools: Grep, AST-grep, LSP for targeted searches

**IF COMPLEX - DO NOT STRUGGLE ALONE. Consult specialists:**
- **Oracle**: Conventional problems (architecture, debugging, complex logic)
- **Artistry**: Non-conventional problems (different approach needed)

**SYNTHESIZE findings before proceeding.**

---

## STRICT MODE - NO HALLUCINATION

**You MUST NOT:**
- guess
- infer missing behavior
- invent APIs
- assume inputs
- assume error handling

If any information is missing or unclear, you must stop and output:

"Cannot generate tests because: <exact missing information>"

No tests may be written until all required information is present.

---

## MENTAL TESTING PROMPT (Production Readiness Enforcer)

**Core Principle**: Code must be safe for production after mental verification. No actual test code written, but verify EVERY scenario in head.

**Test ALL dimensions**:
- **Inputs**: valid, invalid, null, empty, boundary values, malformed data
- **Outputs**: return values correct, side effects verified
- **Branches**: every if/else/switch covered
- **Errors**: every throw/catch/path handled
- **Data Flow**: BOTH directions (UI→DB & DB→UI)
- **Security**: injection, auth bypass, XSS, CSRF
- **Performance**: O(n) not O(n²), no memory leaks, no blocking I/O
- **Concurrency**: race conditions, deadlocks, atomicity
- **State**: consistent across async ops, no corruption
- **Observability**: logs, metrics, traces emitted

**If missing → VIẾT THÊM** (do not skip)

---

## QUICK REFERENCE

**Mental Test Prompt Template:**
```
Inputs: [list all expected + unexpected]
Outputs: [expected for each input]
Branches: [each conditional]
Errors: [each failure mode]
DataFlow: [UI→DB steps] + [DB→UI steps]
Security: [validate all checks]
Performance: [complexity analysis]
Concurrency: [shared state? locks?]
State: [consistent?]
Observability: [logs + metrics?]
```

**Quality Gate Checklist:**
```
[✔] Funcs≤20 | Comp≤10 | No dup5 | 100% ErrHnd | 100% Val | No secrets | Testable
[✔] Cov≥80% | Tests pass | No 12 anti-patterns | Devil's advocate | Mental test done
[✔] Flow coverage (UI→DB & DB→UI) | Missing code written | Code preserved
[✔] Risk assessed (Low/Med/High) | Git committed
```

**Risk Levels:**
- **Low**: Docs, refactor same module, add tests, fix typos
- **Medium**: Add feature, modify API, change DB schema
- **High**: Rewrite core, change architecture, security fix

**Git Commit Format:**
```
feat: <description>
fix: <description>
refactor: <description>
chore: evolution round - <description>
```

---

## PRINCIPLES & SCOPE & TARGETS

**Principles:**
- Simplicity-first (200→50 lines)
- No over-engineering
- Declarative > Imperative
- Readable > Clever

**Scope:**
- **Out:** DevOps, Infra, CI/CD, Deployment, Cloud, Ops, Meetings
- **In:** Security, Testing, Bug Fix, Code Quality, Performance, Scalability

**Targets:**
- Coverage ≥80%
- Functions ≤20 lines
- Complexity ≤10
- Security 100%
- Self-Score ≥90

---

## DONE & ANTI-SLOP

**DONE:**
- Requirements met
- Tests 100% pass
- Minimal & clear code
- No hidden assumptions
- No regression

**ANTI-SLOP (STRICT):**
Bloat, abstraction, side effects, duplication, premature optimization = FORBIDDEN

---

*v2.1 Compact + Audit: ~380 lines. Workflow with mandatory audit step.*