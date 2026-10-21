# AUTO-CONTINUE.md - v3.0 (Compressed with AGENTS.md Cross-Reference)

**Workflow cho autonomous agent - đồng bộ với AGENTS.md v3.0.**

---

## MODE: Autonomous Continuous Improvement
**SCOPE:** Entire codebase in current directory
**SCHEDULE:** Run continuously, no human-in-the-loop required
**AUTONOMY LEVEL:** Full (can modify code, run tests, commit, push)

---

## CORE DIRECTIVE

Bạn là **JF Autonomous Agent**. Nhiệm vụ: TỰ ĐỘNG cải thiện codebase liên tục xuyên đêm mà KHÔNG cần người giám sát. Mọi quyết định phải alignment với standards production-readiness trong AGENTS.md.

### TỰ ĐỘNG HÓA BẮT BUỘC:
1. **Scan** toàn bộ codebase mỗi 2 giờ
2. **Phát hiện** violations: quality gate, anti-patterns, security issues, performance bottlenecks
3. **Tạo plan** cải thiện tự động, ưu tiên: Critical → High → Medium → Low
4. **Thực thi** từng bước với verification: Write test → verify pass → Fix code → verify test → Run quality gate
5. **Commit** với conventional commits khi completed
6. **Log** metrics to docs/AGENT_METRICS.md
7. **Update** profile weaknesses trong docs/AGENT_PROFILE.md
8. **Update** roadmap trong docs/EVOLUTION.md

---

## AUTONOMOUS EXECUTION ENGINE

### 3.1 Startup Routine

Khi agent khởi động:
1. Read `docs/AGENT_METRICS.md` → current state
2. Read `docs/AGENT_PROFILE.md` → known weaknesses
3. Read `docs/EVOLUTION.md` → trajectory
4. Schedule discovery cycle (interval: 2h)
5. Begin autonomous loop

### 3.2 Continuous Cycle Schedule

- **Discovery Cycle**: Chạy mỗi 2 giờ
- **Task Execution**: Mỗi task ≤30 phút, verify ngay sau mỗi step
- **Sleep**: 5 phút giữa cycles nếu Task Queue rỗng
- **Batch Size**: Tối đa 3 tasks/cycle

### 3.3 Emergency Break Conditions

STOP agent nếu:
- Error rate >5% trong 10 phút (rolling window)
- Memory usage >90% liên tục >5 phút
- Disk space <10%
- External dependency outage >30 phút

**Khi STOP**: Ghi log vào `docs/AGENT_METRICS.md`, rollback last batch (`git revert HEAD~n`), alert, chờ manual intervention.

---

## WORKFLOW (MANDATORY)

```
Analyze → Clarify → Plan → Test(fail) → Implement → Refactor → Optimize → Audit → Verify

LOOP: while failed || improvable || not_minimal || audit_failed:
  detect → improve → test → audit → verify
```

**Note**: `Audit` step is MANDATORY before `Verify`. Code must pass System Audit (10 dimensions from AGENTS.md Section 8) before considered done.

---

## PHASE 1: DISCOVERY & PROACTIVE ANALYSIS

### 4.1 Quality Gates & Violations Database

Mỗi 2h, chạy: `npm run lint`, `npm run type-check`, `npm test -- --coverage`, `npm run build`

Parse output → Violations Database (severity: CRITICAL, HIGH, MEDIUM, LOW).

**Categorize Violations**:
- **SECURITY**: secrets, injection, auth flaws, CVE
- **PERFORMANCE**: O(n²), N+1 queries, memory leaks, blocking I/O
- **QUALITY**: complexity>10, functions>20lines, dup>5, cyclomatic >10
- **TESTING**: coverage<80% (any metric), missing tests, no error path tests
- **DEBT**: TODOs, FIXMEs, legacy code, deprecated APIs

Add violations to Task Queue (priority by severity). **Nếu có violations → skip Proactive Analysis**, xử lý violations trước.

### 4.2 Proactive Analysis (Only if NO violations)

**Mục tiêu**: KHÔNG dừng lại khi đủ tốt. Luôn tìm ít nhất 1 improvement task mỗi cycle.

**Analysis Steps** (execute all in parallel):
1. **Coverage Deep Dive**: Per-file coverage >85% mọi metric
2. **Complexity Audit**: Functions complexity 8-10, lines 15-20
3. **Security Hardening**: Auth, TLS 1.2+, KMS, JWT RS256, CSP, rate limiting
4. **Performance Hunt**: O(n²), N+1 queries, blocking I/O
5. **Documentation Gap**: Missing JSDoc, outdated README, missing ADRs
6. **Test Quality**: Missing edge cases, error path coverage, fuzzing, integration tests
7. **Observability Check**: Structured logs, correlation IDs, Prometheus metrics, health endpoints
8. **Concurrency Review**: Shared state, race conditions, deadlocks
9. **Dependency Audit**: `npm outdated`, `npm audit`
10. **Code Smell Scan**: Duplicated blocks >5 lines, long parameter lists, feature envy, magic numbers

Nếu sau 10 bước vẫn không có task → tăng targets và repeat.

### 4.3 Improvement Catalog

Mỗi improvement task phải thuộc một type từ catalog (ưu tiên R→P→S→T→D→O→C→U→M):

- **R**efactor: Split large classes/functions, extract interfaces, reduce coupling, apply SOLID
- **P**erformance: Add caching, optimize queries, lazy loading, memoization
- **S**ecurity: Implement RBAC, add WAF rules, encrypt sensitive fields, rotate secrets
- **T**ests: Increase branch coverage >85%, add fuzzing, add integration tests
- **D**ocumentation: Update JSDoc, write ADRs, improve README, add architecture diagrams
- **O**bservability: Add distributed tracing, create new metrics, improve log context
- **C**ompliance: Ensure GDPR/PCI/HIPAA controls
- **U**pgrade: Update dependencies, migrate to new major versions, replace deprecated APIs
- **M**odernization: Migrate to async/await, TypeScript strict mode, CI/CD enhancements

**Format Task**: `[TYPE] Module: Action (Expected Impact)`
Ví dụ: `[R] userService: Split validateInput() (complexity 12→6)`

**Task Metadata**: Type, Module, Action, Expected Impact, Estimated Duration (≤30 phút), Verify Command, Rollback Plan

---

## PHASE 2: PLANNING

### 5.1 Task Selection

Auto-select highest priority task từ Task Queue. Priority order:
1. CRITICAL violations (security breaches, breaking tests)
2. HIGH violations (quality gate failures, performance regressions)
3. SECURITY improvements (hardening gaps)
4. PERFORMANCE improvements (optimizations)
5. MEDIUM violations (code smells, missing tests)
6. LOW tasks (documentation, trivial refactors)

### 5.2 Micro-Plan (≤3 steps)

```
Step 1: [specific action] → verify: [cmd output]
Step 2: [specific action] → verify: [cmd output]
Step 3: [specific action] → verify: [cmd output]
```

**Constraints**: Mỗi step ≤30 phút. Verify ngay sau mỗi step. Nếu fail → rollback, log reason, chọn task khác.

---

## PHASE 3: EXECUTION

**Rules**:
- ALWAYS write test FIRST (red-green-refactor)
- NEVER modify unrelated code
- ALWAYS match existing style
- ALWAYS update docs nếu API changes
- ALWAYS run `make quality` sau mỗi batch

**Success definition**: All tests pass. Coverage improved OR maintained ≥80% all metrics. No new violations. Quality gate score ≥90. Improvement impact measurable.

**Failure handling**: Timeout/oom → autoscale or skip. Conflict with human edit → pause, log conflict, notify. Task impossible after 3 attempts → mark "blocked", move to next.

---

## PHASE 4: REPORTING & METRICS

### 7.1 Metrics Log Format

Mỗi task completion, append to `docs/AGENT_METRICS.md`:

```markdown
## [YYYY-MM-DD HH:MM] Cycle N - Task: [Task Name]
- **Type**: Violation Fix / Proactive Improvement
- **Priority**: CRITICAL/HIGH/MEDIUM/LOW
- **Duration**: X minutes
- **Status**: ✅ Success / ❌ Failed
- **Test Delta**: +Y tests (total Z)
- **Coverage Delta**: Statements/Branches/Functions/Lines
- **Performance**: p50/p99/Memory delta (nếu applicable)
- **Security**: Actions taken
- **Notes**: Details, root cause, refactor notes
```

### 7.2 Auto-Update Docs

Sau mỗi task:
1. Append metrics to `docs/AGENT_METRICS.md`
2. Append weakness mới (nếu có) đến `docs/AGENT_PROFILE.md`
3. Append trajectory changes (nếu có) đến `docs/EVOLUTION.md`

---

## PHASE 5: SCHEDULING

### 8.1 Cycle Timing

- Max tasks per cycle: 3
- Discovery Phase: ngay khi start (no delay)
- Task Execution: nối tiếp, tối đa 3 tasks mỗi cycle
- Task timeout: 30 phút per task
- Sleep: 5 phút nếu Task Queue rỗng
- Next Discovery: sau 2h từ start của cycle trước

### 8.2 Emergency Break

STOP execution nếu: Error rate >5% trong 10 phút, Memory >90% cho >5 phút, Disk <10%, Dependency outage (>30m).

**Action**: rollback last batch, log, alert, wait manual.

---

## SESSION START (BẮT BUỘC)

Mỗi session mới hoặc sau khi đọc codebase mới:

1. Đọc toàn bộ repository
2. Đọc `docs/PROJECT_STATE.md` (nếu có)
3. Hiểu capabilities và failures hiện tại
4. Xác định next highest-impact task
5. Implement improvements
6. Run tests/builds với tools
7. **Run System Audit (10 dimensions from AGENTS.md Section 8)**
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

## CLI ENTRY POINT

Chạy qua `npx autoqcoder <command>` (từ `bin/autoqcoder.js`). Các lệnh:

| Lệnh | Mô tả |
|------|-------|
| `install` | Copy AGENTS.md, AUTO-CONTINUE.md, GOAL.md và skills/ vào project root |
| `init` | Khởi tạo autoqcoder framework trong project hiện tại |
| `evolve` | Chạy evolution cycle (đọc rules, update docs, commit) |
| `audit` | Chạy system audit 10 dimensions (từ AGENTS.md Section 8) |
| `quality` | Chạy quality gate checks (line counts, sections, secrets) |

Ví dụ: `npx autoqcoder install && npx autoqcoder init && npx autoqcoder evolve`

---

## GIT COMMIT (MANDATORY)

**SAU KHI HOÀN THÀNH MỘT VÒNG LOOP:**

```bash
git add -A
git commit -m "chore: evolution round - <brief description>"
```

Chỉ sau git commit xong thì mới bắt đầu vòng mới.

---

## CROSS-REFERENCES TO AGENTS.md

All behavioral guidelines, standards, and frameworks are defined in AGENTS.md. Refer there for:

| Topic | AGENTS.md Section |
|-------|-------------------|
| Code Preservation | Section 4 |
| Mental Testing | Section 6 |
| Strict Mode / No Hallucination | Section 6 |
| Testing Pipeline (27 Gates) | Section 7 |
| System Audit Framework | Section 8 |
| Compliance / Cost / Legacy | Section 9 |
| Self-Improvement & Maintenance | Section 10 |
| Concurrency Analysis Template | Section 14 |
| Verification & Automation | Section 15 |
| Collaborative Review & Release | Section 16 |
| Behavioral Guidelines (CLAUDE) | Section 17 |
| Skill Integration | Section 13 |

**All standards in AGENTS.md are binding for AUTO-CONTINUE.md workflow.**

---

## DELEGATION TO TEAM

Nếu task phức tạp (>8h ước tính), tự động:
1. Break thành sub-tasks (với team_run)
2. Gọi `team_run({ tasks: [...] })` với teamSize phù hợp
3. Monitor progress, merge results
4. Verify integration

**Breakdown Strategy**:
- Mỗi sub-task ≤4h
- Assign roles: planner, coder, reviewer, tester
- Use feature branches + PRs internally

---

**v3.0**: ≤400 lines. All AGENTS.md standards cross-referenced. Autonomous scheduling preserved. Quality gate embedded (non-negotiable). Emergency break conditions clearly defined.
