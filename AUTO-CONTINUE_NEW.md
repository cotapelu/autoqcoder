# AUTO-CONTINUE.md - v2.1 Compressed

**Workflow cho autonomous agent - phosphate với AGENTS.md v2.1.**

---

## WORKFLOW (MANDATORY)

```
Analyze → Clarify → Plan → Test(fail) → Implement → Refactor → Optimize → Audit → Verify

LOOP: while failed || improvable || not_minimal || audit_failed:
  detect → improve → test → audit → verify
```

**Note**: `Audit` step is MANDATORY before `Verify`. Code must pass System Audit (10 dimensions from AGENTS.md Section 8) before considered done.

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

## GIT COMMIT (MANDATORY)

**SAU KHI HOÀN THÀNH MỘT VÒNG LOOP:**

```bash
git add -A
git commit -m "chore: evolution round - <brief description>"
```

Chỉ sau git commit xong thì mới bắt đầu vòng mới.

---

## MENTAL TESTING MODE (Brief)

Xem chi tiết trong **AGENTS.md Section 6**.

- KHÔNG viết test code (sẽ verify trong đầu)
- KHÔNG check bằng tool (tưởng tượng scenarios)
- Tưởng tượng ALL inputs: valid, invalid, null, empty, boundary
- Từng nhánh logic phải cover
- Tất cả error paths phải handle
- Data flow cả 2 chiều (UI→DB, DB→UI)

---

## CODE PRESERVATION (Brief)

Xem chi tiết trong **AGENTS.md Section 4**.

- KHÔNG XÓA CODE (last resort)
- Debug: Read → Understand → Isolate → Test → Verify (systematic)
- Nếu lỗi: preserve, tìm root cause, fix logic
- Luôn có plan restore từ git
- Disable feature tạm thời thay vì xóa

---

## CHANGE COST & RISK (Brief)

Xem chi tiết trong **AGENTS.md Section 4**.

- Estimate engineering cost (hours/days)
- Risk level: Low / Medium / High
- Estimated rollback time
- Prefer Low-risk, high-impact over High-risk, aesthetic

---

## MISSING CODE = WRITE MORE (Brief)

Xem chi tiết trong **AGENTS.md Section 4**.

- Nếu phát hiện thiếu → VIẾT THÊM
- KHÔNG skip "không yêu cầu"
- KHÔNG remove code để simplify
- KHÔNG giảm scope để pass nhanh
- App ngày càng hoàn thiện

---

## SKILL INTEGRATION (Brief)

Xem chi tiết trong **AGENTS.md Section 13**.

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
| `react-architect` | React apps |
| `rust-architect` | Rust systems |
| `python-architect` | Python apps |

---

## SEARCH & ANALYSIS MODE (Brief)

Xem chi tiết trong **AGENTS.md Section 6**.

**[search-mode]**: MAXIMIZE SEARCH EFFORT. Launch multiple background agents IN PARALLEL: explore agents, librarian agents, plus Grep/rg/ast-grep. NEVER stop at first result.

**[analyze-mode]**: ANALYSIS MODE. Gather context in parallel. IF COMPLEX → consult Oracle/Artistry. SYNTHESIZE findings.

---

## STRICT MODE - NO HALLUCINATION (Brief)

Xem chi tiết trong **AGENTS.md Section 6**.

**MUST NOT**: guess, infer missing behavior, invent APIs, assume inputs, assume error handling. If missing → STOP and output: "Cannot generate tests because: <exact missing information>".

---

## MENTAL TESTING PROMPT (Brief)

Xem chi tiết trong **AGENTS.md Section 6**.

**Core Principle**: Code must be safe for production after mental verification. NO actual test code written, but verify EVERY scenario in head.

Test ALL dimensions: Inputs, Outputs, Branches, Errors, DataFlow (both directions), Security, Performance, Concurrency, State, Observability.

---

## PRODUCTION TESTING PIPELINE (Brief)

Xem chi tiết trong **AGENTS.md Section 7**.

27 gates from untrusted code artifact → production release. LLM only does Step 0. All other steps exist because code lies until proven correct.

---

## SYSTEM AUDIT WORKFLOW (Brief)

Xem chi tiết trong **AGENTS.md Section 8**.

**Trigger**: Before any production deploy OR after major changes.

Audit all 10 dimensions. For each issue found, must produce: Severity, Location, Exploit, Impact, Fix, Test Case, Priority.

**Audit Pass Criteria**: Self-score ≥90 on audit checklist + zero critical issues.

If audit fails → return to `Optimize` step, do NOT proceed to `Verify`.

---

## QUICK REFERENCE (Optional)

TBD: One-page summary of most-used checks and commands.

---

## LINK TO FULL AGENTS.md

Tất cả chi tiết đầy đủ xem trong **AGENTS.md** (16 sections, production-ready framework).

Nội dung AUTO-CONTINUE này là **condensed workflow** cho agent autonomy. Các checklist, templates, standards đều được define trong AGENTS.md.

---

**v2.1 Compressed**: ~150 lines (vs original 369). Maintains all mandatory workflow steps, references full AGENTS.md for details.
