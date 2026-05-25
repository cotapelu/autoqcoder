# AUTO-CONTINUE.md - Evolution Workflow (v2.0)

---

## WORKFLOW (MANDATORY)

```
Analyze → Clarify → Plan → Test(fail) → Implement → Refactor → Optimize → Verify

LOOP: while failed || improvable || not_minimal:
  detect → improve → test → verify
```

---

## SESSION START (BẮT BUỘC)

Mỗi session mới (hoặc sau khi đọc codebase mới):

1. Đọc toàn bộ repository
2. Đọc `docs/PROJECT_STATE.md` (nếu có)
3. Hiểu capabilities và failures hiện tại
4. Xác định next highest-impact task
5. Implement improvements
6. Run tests/builds với tools
7. Update `PROJECT_STATE.md`
8. Update `TODO.md` với completed và follow-ups

---

## CONTINUOUS LOOP MODE

Default: continuous evolution. Sau khi complete iteration, phải identify next highest-impact TODO và tiếp tục work, ngay cả khi không có user prompt mới, UNLESS:
- User explicitly tells you to stop or pause
- Tests/builds fail và cần clarification
- Không còn actionable TODO items

---

## EVOLUTION & SELF-IMPROVEMENT

**Mỗi vòng loop phải update evolution files:**

- `docs/AGENT_METRICS.md`: Iterations/task, test failure rate, rollback count, regressions, MTTR
- `docs/AGENT_PROFILE.md`: Tasks thường fail, weak languages/stacks, fragile modules, weaknesses
- `docs/EVOLUTION.md`: Trajectory changes, planned refactors, anticipated debt updates

**Meta-Goal:** System breaks less, fixes faster, plans further ahead, ít repeated mistakes.

---

## GIT COMMIT REQUIREMENT (BẮT BUỘC)

**SAU KHI HOÀN THÀNH MỘT VÒNG LOOP:**

```bash
git add -A
git commit -m "chore: evolution round - <brief description>"
```

Chỉ sau git commit xong thì mới bắt đầu vòng mới.

---

## PUSHGUIDE QUALITY GATES (REFERENCE)

Trước khi bất kỳ code nào được push production, phải pass **27 gates** từ `mate/PUSHGUIDE.md`:

**0-4. Source & Build:**
Source hygiene → Dependency freeze → Clean build → Artifact verification

**5-18. Code Quality:**
Static analysis → Type verification → Unit tests → Coverage gate → Integration → Contract → Data migration → Security scan → Compliance → Performance sanity → Stress/edge → Failure mode → Observability → Config validation

**19-26. Deployment:**
Packaging → Staging deploy → Smoke → Rollback test → Human review → Sign-off

**27. Git push allowed**

> **Note:** LLM chỉ làm được Bước 0. Tất cả gates 1-26 tồn tại vì "code luôn nói dối cho đến khi bị chứng minh là đúng."

---

## MENTAL TESTING MODE

**KHÔNG viết test code.** Thay vào đó, mental-test mọi scenarios:

- Tưởng tượng valid/invalid/null/edge cases
- Từng nhánh logic được cover?
- Error paths được handle?
- Data flow cả 2 chiều (UI→DB và DB→UI)
- Nếu thiếu → VIẾT THÊM code (không skip)

---

## CODE PRESERVATION RULE

**KHÔNG XÓA CODE** - giải pháp cuối cùng.

**Debug bắt buộc:**
1. Đọc toàn bộ file (không chỉ đoạn suspected)
2. Hiểu context: dependencies, structure, related logic
3. Tìm root cause: check braces, imports, async/sync, lifetimes
4. Incremental debugging: add debug prints, isolate sections, test hypotheses từng bước
5. Systematic: Read → Understand → Isolate → Test → Verify

**Nếu vẫn failed:** Consult team, review git history, pair programming, disable feature tạm thời thay vì xóa code, luôn có plan restore.

**Cấm tuyệt đối:** Xóa code để pass test, "vá áo" fix tạm thời, chấp nhận degradation.

---

## CHANGE COST & RISK ASSESSMENT

**Mỗi Feature/Refactor/Migration phải assess:**
- Engineering cost (hours/days)
- Risk level: **Low** / **Medium** / **High**
- Estimated rollback time

**Prefer:** Low-risk, high-impact changes over high-risk, aesthetic/speculative.

---

## MISSING CODE = WRITE MORE

**QUAN TRỌNG:**
- Nếu phát hiện thiếu feature, API, logic, edge case handling → **VIẾT THÊM**
- KHÔNG skip vì "không yêu cầu"
- KHÔNG remove code để simplify
- KHÔNG pass nhanh bằng cách giảm scope
- **App phải ngày càng hoàn thiện**, khôngLessComplete

---

## SKILL INTEGRATION

Khi review code, apply relevant skill từ `mate/skill/`:

| Skill | Use Case |
|-------|----------|
| `angular-modular-architect` | Angular feature-based SPA |
| `backend-db-pattern` | Database access (4 steps) |
| `code-review` | Vibe-cleaner cleanup |
| `dotnet-modular-architect` | .NET modular monolith |
| `erp-architect` | Fullstack ERP system |
| `iam-platform-layer` | Authentication/Authorization |

**Bắt buộc:** Đọc skill file tương ứng trước khi modify.

---

## PRINCIPLES (REMINDER)

- Simplicity-first (200→50 lines)
- No over-engineering
- Declarative > Imperative
- Readable > Clever

---

## SCOPE

**Out:** DevOps, Infra, CI/CD, Deployment, Cloud, Server, Ops, Meetings

**In:** Security, Testing, Bug Fix, Code Quality, Performance, Scalability

---

## TARGETS

- Coverage: ≥80%
- Functions: ≤20 lines
- Complexity: ≤10
- Security: 100%
- Self-Score: ≥90
- Evolution Metrics: improving trend

---

## DONE

- Requirements met
- Tests 100% pass
- Minimal & clear code
- No hidden assumptions
- No regression

---

## ANTI-SLOP (STRICT)

Bloat, abstraction, side effects, duplication, premature optimization = **FORBIDDEN**

---

*v2.0: ~120 lines target. Evolution-focused workflow.*
