# AUTO-CONTINUE.md - Optimized Agent Workflow
*Version: v3 (AGENTS.md compliant)*

## WORKFLOW (MANDATORY)
Analyze → Clarify → Plan → Test(fail) → Implement → Refactor → Optimize → Verify

## LOOP
while failed || improvable || not_minimal: detect → improve → test → verify

## SESSION START MANDATORY
**Mỗi session mới (hoặc sau khi đọc codebase mới):**
1. Đọc toàn bộ repository
2. Đọc `docs/PROJECT_STATE.md` (nếu có)
3. Hiểu capabilities và failures hiện tại
4. Xác định next highest-impact task
5. Implement improvements
6. Run tests/builds với tools
7. Update `PROJECT_STATE.md`
8. Update `TODO.md` với completed và follow-ups

## CONTINUOUS LOOP MODE
The default là continuous evolution loop: sau khi complete một iteration, phải identify next highest-impact TODO và tiếp tục work, ngay cả khi không có user prompt mới, UNLESS:
- User explicitly tells you to stop or pause
- Tests/builds fail và cần clarification
- Không còn actionable TODO items

## EVOLUTION LOOP (SELF-IMPROVEMENT)
**Mỗi vòng loop phải cập nhật evolution files:**
- Update `docs/AGENT_METRICS.md` với:
  * Avg iterations/task
  * Test failure rate
  * Rollback count
  * Regressions introduced
  * Mean time to fix critical bugs
- Update `docs/AGENT_PROFILE.md` với:
  * Tasks thường fail
  * Languages/stacks có error rate cao
  * Fragile modules
  * Known weaknesses mới
- Update `docs/EVOLUTION.md` với:
  * Trajectory changes
  * New planned refactors
  * Anticipated debt updates
  * Infrastructure evolution (tests, CI, build, tooling)

**Meta-Goal:** System ngày càng break less, fix faster, plan further ahead, ít repeated mistakes hơn.

## GIT COMMIT REQUIREMENT (BẮT BUỘC)
**SAU KHI HOÀN THÀNH MỌI THỨ TRONG MỘT VÒNG LOOP:**
```bash
git add -A
git commit -m "chore: evolution round - <brief description>"
```

Chỉ sau git commit xong thì mới bắt đầu vòng mới.

## PUSHGUIDE QUALITY GATES (REFERENCE)
Trước khi bất kỳ code nào được push production, phải pass 27 quality gates từ PUSHGUIDE.md:
0-4: Source hygiene, dependency freeze, clean build, artifact verification
5-18: Static analysis, type verification, unit tests, coverage gate, integration, contract, data migration, security scan, compliance, performance sanity, stress/edge, failure mode, observability, config validation
19-26: Packaging, staging deploy, smoke, rollback test, human review, sign-off
27: Git push allowed

**Note:** LLM chỉ làm được Bước 0. Tất cả gates 1-26 tồn tại vì "code luôn nói dối cho đến khi bị chứng minh là đúng". Vibe-code rồi push straight = prototype, không phải kỹ nghệ phần mềm.

## MENTAL TESTING MODE
**KHÔNG viết test code.** Thay vào đó, mental-test mọi scenarios:
- Tưởng tượng valid/invalid/null/edge cases
- Từng nhánh logic được cover?
- Error paths được handle?
- Data flow cả 2 chiều (UI→DB và DB→UI)
- Nếu thiếu → VIẾT THÊM code (không skip)

## CODE PRESERVATION RULE
**KHÔNG XÓA CODE** - nó là giải pháp cuối cùng.
- Debug: Read → Understand → Isolate → Test → Verify (systematic)
- Nếu code lỗi: preserve it, tìm root cause, fix logic
- Luôn có plan restore từ git
- Disable feature tạm thời thay vì xóa

## CHANGE COST & RISK ASSESSMENT
**Mỗi Feature/Refactor/Migration phải assess:**
- Engineering cost (hours/days)
- Risk level: Low / Medium / High
- Estimated rollback time

**Prefer:** Low-risk, high-impact changes over high-risk, aesthetic/speculative.

## MISSING CODE = WRITE MORE
**QUAN TRỌNG:**
- Nếu phát hiện thiếu feature, API, logic, edge case handling → VIẾT THÊM
- KHÔNG skip vì "không yêu cầu"
- KHÔNG remove code để simplify
- KHÔNG pass nhanh bằng cách giảm scope
- App phải ngày càng hoàn thiện, khôngLessComplete

## FRONTEND & BACKEND SKILL INTEGRATION
Khi review code, apply relevant skill từ `mate/skill/`:
- `angular-modular-architect`: Angular feature-based SPA rules
- `backend-db-pattern`: 4 steps to database (Service→Repo Interface→Repo Impl→Entity)
- `code-review`: Vibe-cleaner với 14 principles
- `dotnet-modular-architect`: Modular monolith với platform layer
- `erp-architect`: Fullstack ERP patterns (1-1 FE/BE mapping)
- `iam-platform-layer`: IAM services và patterns

**Bắt buộc:** Đọc skill file tương ứng trước khi modify codebase.

## PHASES HIỂN THỊ (PRODUCTION DEPLOYMENT)
**Out:** DevOps, Infra, CI/CD, Deployment, Cloud, Server, Ops, Meetings
**In:** Security, Testing, Bug Fix, Code Quality, Performance, Scalability

## TARGETS
- Coverage: ≥80%
- Functions: ≤20 lines
- Complexity: ≤10
- Security: 100%
- Self-Score: ≥90
- Evolution Metrics: improving trend

## PRINCIPLES (REMINDER)
- Simplicity-first (200→50 lines)
- No over-engineering
- Declarative > Imperative
- Readable > Clever

## DONE
- Requirements met
- Tests 100% pass
- Minimal & clear code
- No hidden assumptions
- No regression

## ANTI-SLOP (STRICT)
Bloat, abstraction, side effects, duplication, premature optimization = FORBIDDEN