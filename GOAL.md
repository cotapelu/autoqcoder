# GOAL.md - Mục tiêu Tự Tiến Hóa (v3.2)

## 1. MỤC TIÊU TỔ QUAN

**Mục tiêu chính**: Tự động tiến hóa toàn bộ hệ thống hướng dẫn (prompt engine) trong dự án `autoqcoder` để đạt chất lượng production-grade, tự cải thiện liên tục mà không cần can thiệp thủ công.

**Nguyên cốt**: Hệ thống tiến hóa chạy hoàn toàn trên các file `.md`. LLM đọc các file này làm nguồn sự thật duy nhất. **Không cần file test JS, không cần script kiểm tra bổ sung**. Mọi vòng tiến hóa phải ghi chép đủ thông tin vào chính các file `.md` này.

**Phạm vi bắt buộc tiến hóa mỗi vòng (Full Cycle)**:
- `AGENTS.md` - Self-Optimizing Prompt Engine (văn bản luật chính)
- `AUTO-CONTINUE.md` - Autonomous Continuous Improvement Workflow
- `GOAL.md` - File này (mục tiêu và kế hoạch tiến hóa)
- `skills/**/*.md` - Tất cả skill definitions
- `docs/AGENT_METRICS.md` - Cập nhật số liệu, health score, evolution rate
- `docs/AGENT_PROFILE.md` - Cập nhật weaknesses, fragile modules, risk register
- `docs/EVOLUTION.md` - Cập nhật roadmap, trajectory, phase status

**Không tiến hóa cấu trúc**: `docs/AGENT_METRICS.md`, `docs/AGENT_PROFILE.md`, `docs/EVOLUTION.md` (chỉ cập nhật số liệu sau mỗi vòng, không đổi cấu trúc file)

**Tất cả 7 file trên phải được xử lý trong mỗi vòng. Không được skip bất kỳ file nào trừ khi đã đạt ceiling (xem Section 3.4).**

---

## 2. CHI TIẾU CỦA MỖI FILE

### 2.1 AGENTS.md (Prompt Engine - Văn bản luật chính)

**Mục tiêu phiên bản v3.0**:
- Tối đa 20 sections, ~600 lines (giảm cognitive load)
- Tất cả 16 core sections phải được bảo toàn
- Thêm integration với skills/ (mapping 1-1)
- Thêm concurrency analysis template chi tiết (Section 14)
- Thêm SYSTEM AUDIT FRAMEWORK (10 dimensions, Section 8)
- Thêm API Compatibility section (Section 10.4)
- Thêm Verification & Automation steps (Section 15)
- Self-score ≥90/100 trên mọi quality gate
- Không có hardcoded secrets, không có assumptions

**Điểm cần cải tiến**:
- Đồng bộ terminology với skills/ files
- Thêm cross-references giữa AGENTS.md và skills/
- Cập nhật version tham chiếu (hiện tại: v3.0.0)

### 2.2 AUTO-CONTINUE.md (Autonomous Workflow)

**Mục tiêu phiên bản v3.0**:
- Tự động chạy liên tục (continuous loop)
- Emergency break conditions rõ ràng
- Task delegation với team_run cho task phức tạp (>8h)
- Quality gate embedded (non-negotiable)
- Git commit mandatory sau mỗi vòng

**Điểm cần cải tiến**:
- Thêm cycle timing chi tiết (2h discovery, 5 phút sleep)
- Thêm improvement catalog (R→P→S→T→D→O→C→U→M)
- Thêm metrics log format
- Thêm auto-update docs sau mỗi task

### 2.3 GOAL.md (File này)

**Mục tiêu**:
- Định nghĩa rõ ràng mục tiêu của từng vòng tiến hóa
- Success criteria có thể đo lường được
- Timeline và milestone
- Quality gates cho mỗi file

**Quy tắc bắt buộc**: Mọi LLM đọc file này phải hiểu đủ quy trình để tự chạy vòng tiến hóa mà không cần clarification thêm.

### 2.4 SKILLS/ REQUIREMENT (Bắt buộc đọc và tiến hóa)

**Mọi vòng tiến hóa phải:**
1. Đọc FULL tất cả file skill trong thư mục con `skills/*/` trước khi bắt đầu bất kỳ vòng nào.
2. Mỗi skill SKILL.md phải có đầy đủ YAML frontmatter: name, description, license, compatibility, metadata (audience, scope).
3. Mỗi skill phải có section Output Format và Khi nào dùng.
4. Nếu skill thiếu bất kỳ section bắt buộc nào → VIẾT THÊM (không skip).
5. Đồng sync terminology giữa AGENTS.md và skills/ files.
6. Thêm cross-reference table từ AGENTS.md Section 13.1 → skills/.
7. Tiến hóa bản thân skill files: Nếu phát hiện skill cũ, thiếu thông tin, hoặc không khớp với AGENTS.md/AUTO-CONTINUE.md → cập nhật skill đó trong cùng vòng.

**Skill Integration Rule**: Khi modify code trong domain nào, phải đọc skill file tương ứng trước.
- Backend Go → đọc skills/go-architect/SKILL.md
- Backend Python → đọc skills/python-architect/SKILL.md
- Backend Rust → đọc skills/rust-architect/SKILL.md
- Backend .NET → đọc skills/dotnet-modular-architect/SKILL.md
- Frontend Angular → đọc skills/angular-modular-architect/SKILL.md
- Frontend React → đọc skills/react-architect/SKILL.md
- Fullstack ERP → đọc skills/erp-architect/SKILL.md
- Database pattern → đọc skills/backend-db-pattern/SKILL.md
- IAM Platform → đọc skills/iam-platform-layer/SKILL.md
- Code Review → đọc skills/code-review/SKILL.md

**Missing Code = Write More**: Nếu skill thiếu section bắt buộc → VIẾT THÊM, không skip.

---

## 3. VÒNG TIẾN HÓA (EVOLUTION ROUNDS)

### 3.1 Mỗi vòng tiến hóa (Full Cycle)

Mỗi vòng phải **tiến hóa toàn bộ** 7 file sau, không chia tách theo vòng:

| STT | File | Mục tiêu trong vòng |
|-----|------|---------------------|
| 1 | `GOAL.md` | Định nghĩa mục tiêu, success criteria, timeline |
| 2 | `AGENTS.md` | Prompt engine chính, skill integration, concurrency template, audit framework |
| 3 | `AUTO-CONTINUE.md` | Autonomous workflow, improvement catalog, emergency break, quality gate |
| 4 | `skills/**/*.md` | Tất cả SKILL.md: YAML frontmatter, Output Format, Khi nào dùng, cross-reference |
| 5 | `docs/AGENT_METRICS.md` | Cập nhật số liệu, health score, evolution rate |
| 6 | `docs/AGENT_PROFILE.md` | Cập nhật weaknesses, fragile modules, risk register |
| 7 | `docs/EVOLUTION.md` | Cập nhật roadmap, trajectory, phase status |

### 3.2 Checklist mỗi vòng (BẮT BUỘC, không được bỏ nào)

Trước khi commit, LLM phải check toàn bộ:

- [ ] Đã đọc FULL tất cả file skill trong `skills/*/`
- [ ] Đã đồng sync terminology giữa AGENTS.md và skills/
- [ ] Đã cập nhật nội dung `AGENTS.md` (refine terminology, sync skills, version, cross-reference)
- [ ] Đã cập nhật nội dung `AUTO-CONTINUE.md` (refine, sync với AGENTS.md, cycle timing, improvement catalog)
- [ ] Đã cập nhật YAML metadata frontmatter cho mọi SKILL.md còn thiếu
- [ ] Đã đảm bảo mọi SKILL.md có section Output Format và Khi nào dùng
- [ ] Đã thêm cross-reference table AGENTS.md Section 13.1 → skills/
- [ ] Đã tiến hóa skill files cũ/thiếu/không khớp với AGENTS.md/AUTO-CONTINUE.md
- [ ] Đã cập nhật docs/AGENT_METRICS.md với số liệu thực sau vòng
- [ ] Đã cập nhật docs/AGENT_PROFILE.md với weaknesses mới (nếu có)
- [ ] Đã cập nhật docs/EVOLUTION.md với trajectory thay đổi (nếu có)
- [ ] Đã verify quality gate ≥90/100 cho AGENTS.md và AUTO-CONTINUE.md
- [ ] Đã verify skills metadata consistency 100%
- [ ] Đã check không có hardcoded secrets trong bất kỳ file .md nào

### 3.3 Quy tắc ceiling (khi nào được skip cập nhật nội dung file)

Nếu file đã đạt giới hạn tối đa sau vòng này, LLM được phép **không thêm nội dung mới** vào file đó, nhưng **phải ghi chú lý do skip** vào báo cáo vòng:

- `AGENTS.md`: ≥700 lines HOẶC ≥20 sections → skip thêm nội dung, ghi lý do
- `AUTO-CONTINUE.md`: ≥400 lines → skip thêm nội dung, ghi lý do
- Mọi file skill: đã đầy đủ YAML frontmatter + Output Format + Khi nào dùng → skip, ghi lý do

**Quy tắc quan trọng**: Không được skip mà không ghi lý do. Mọi skip không ghi lý do là vi phạm quy tắc, phải revert và làm lại.

### 3.4 Pre-commit self-check (BẮT BUỘC trước mỗi commit)

Trước khi chạy `git add -A && git commit`, LLM phải tự verify:

1. Đã xử lý đủ tất cả 7 file trong Section 3.1 (hoặc ghi lý do skip cho file đạt ceiling theo Section 3.3)
2. `AGENTS.md` ≤700 lines, ≤20 sections
3. `AUTO-CONTINUE.md` ≤400 lines
4. Không có hardcoded secrets trong bất kỳ file `.md` nào (password, secret, api_key, token, private_key)
5. Terminology đồng bộ giữa `AGENTS.md` và `skills/` files
6. Mọi `SKILL.md` có đầy đủ YAML frontmatter (name, description, license, compatibility, metadata)
7. Mọi `SKILL.md` có section Output Format và Khi nào dùng
8. Đã chạy deep content validation theo file `/SELF-AUDIT.md` (Section 4 deep content check)

Nếu bất kỳ mục nào fail → KHÔNG được commit, phải sửa trước.

### 3.5 GIT COMMIT RULE (sau mỗi vòng full cycle)

Sau khi verify đầy đủ pre-commit self-check Section 3.4:

```bash
git add -A
git commit -m "chore: evolution round N - <brief description>"
```

Chỉ sau commit xong thì mới bắt đầu vòng mới.

Nếu commit thiếu file bắt buộc mà không ghi lý do skip → vi phạm quy tắc, phải revert và làm lại.

---

## 4. SUCCESS CRITERIA (Có thể đo lường)

| Tiêu chí | Ngưỡng | Cách đo |
|----------|--------|---------|
| AGENTS.md sections | ≤20 | Count `^## ` lines |
| AGENTS.md lines | ≤700 | `wc -l AGENTS.md` |
| AUTO-CONTINUE.md lines | ≤400 | `wc -l AUTO-CONTINUE.md` |
| Self-score AGENTS.md | ≥90/100 | Internal checklist (Section 3.4) |
| Self-score AUTO-CONTINUE.md | ≥90/100 | Internal checklist (Section 3.4) |
| Skills metadata consistency | 100% | All SKILL.md have name, description, license, compatibility, metadata |
| Skills Output Format | 100% | All SKILL.md have Output Format section |
| Skills Khi nào dùng | 100% | All SKILL.md have Khi nào dùng section |
| No hardcoded secrets | 0 | `security.scan` hoặc grep manual |
| All tests pass | 100% | `npm test` (nếu có) |
| Audit dimensions covered | 10/10 | Section 8 of AGENTS.md |

---

## 5. QUALITY GATES (Non-negotiable)

### 5.1 Quality Gate cho code (.js, .ts, .go, .py, .rs, .cs, v.v.)

Trước khi commit bất kỳ code file nào, phải pass:

- [ ] Tất cả functions ≤20 lines (business logic), ≤50 lines (UI)
- [ ] Cyclomatic complexity ≤10
- [ ] Không có 5+ duplicate lines
- [ ] 100% error handling (public API)
- [ ] 100% input validation (external)
- [ ] Không có hardcoded secrets
- [ ] Testable (không có direct DB/network trong business logic)
- [ ] Coverage ≥80% (nếu có tests)
- [ ] Tất cả tests pass

### 5.2 Quality Gate cho file .md (AGENTS.md, AUTO-CONTINUE.md, GOAL.md, skills/*.md)

Trước khi commit bất kỳ file .md nào, phải pass:

- [ ] AGENTS.md ≤700 lines, ≤20 sections
- [ ] AUTO-CONTINUE.md ≤400 lines
- [ ] Không có hardcoded secrets trong bất kỳ file .md nào
- [ ] Terminology đồng bộ giữa AGENTS.md và skills/ files
- [ ] Mọi SKILL.md phải có đầy đủ YAML frontmatter (name, description, license, compatibility, metadata)
- [ ] Mọi SKILL.md phải có section Output Format và Khi nào dùng
- [ ] Đã chạy deep content validation theo `/SELF-AUDIT.md` (Section 4 deep content check)

---

## 6. GIT COMMIT RULE

Tham khảo Section 3.2 (Checklist mỗi vòng) và Section 3.4 (Pre-commit self-check).

Sau khi verify đầy đủ:

```bash
git add -A
git commit -m "chore: evolution round N - <brief description>"
```

Chỉ sau commit xong thì mới bắt đầu vòng mới. Nếu commit thiếu file bắt buộc mà không ghi lý do skip → vi phạm quy tắc, phải revert và làm lại.

---

## 7. KHUYẾN NGHỊ TIẾP THEO

Sau khi hoàn thành các vòng tiến hóa:

1. **Cập nhật full mọi file .md**: Đảm bảo mọi file markdown đều tự chứa đủ thông tin, LLM đọc xong tự chạy vòng tiến hóa mà không cần code JS kiểm tra bổ sung.
2. **Real deployment**: Áp dụng full evolution loop vào một project thực tế (khác todos-api)
3. **npm package**: Publish `autoqcoder@3.0.0`
4. **Metrics automation**: Cập nhật docs/AGENT_METRICS.md thủ công sau mỗi vòng (không cần script tự động)

**Lý do**: Hệ thống tiến hóa chạy hoàn toàn trên các file `.md`. LLM đọc các file này làm nguồn sự thật duy nhất. Không cần file test JS hay script kiểm tra bổ sung.

---

## 8. TỔNG KẾT

Mục tiêu của GOAL.md là định nghĩa bản thiết kế cho việc tự tiến hóa của hệ thống prompt engine. Mỗi vòng phải có kết quả cụ thể, có thể đo lường, và phải commit trước khi chuyển sang vòng tiếp theo.

**Lịch sử sửa đổi**:
- v3.1: Round 19 đã commit nhưng KHÔNG cập nhật nội dung `AGENTS.md` và `AUTO-CONTINUE.md` — vi phạm Section 3 quy tắc "tiến hóa toàn bộ các file".
- v3.2: Viết lại toàn bộ GOAL.md để ràng buộc chặt chẽ hơn: bắt buộc cập nhật AGENTS.md và AUTO-CONTINUE.md mỗi vòng, thêm pre-commit self-check, thêm quy tắc ceiling, tách Quality Gate theo loại file.

**Trạng thái**: Vòng 21 đã hoàn thành (2026-06-23). Tất cả 7 file đã được xử lý: AGENTS.md (569 lines, 19 sections), AUTO-CONTINUE.md (308 lines), GOAL.md (v3.2), skills/ (13 files, 100% metadata consistency), docs/AGENT_METRICS.md, docs/AGENT_PROFILE.md, docs/EVOLUTION.md. Sẵn sàng cho Vòng 22.

**Vòng 22 (Đang thực hiện)**: Hoàn thành full cycle kiểm tra tất cả 7 file, xác thực metadata consistency của skills/, chuẩn bị Round 23: real deployment test with audit, cập nhật metrics sau mỗi vòng.
