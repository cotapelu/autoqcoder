# GOAL.md - Mục tiêu Tự Tiến Hóa (v3.1)

## 1. MỤC TIÊU TỔ QUAN

**Mục tiêu chính**: Tự động tiến hóa toàn bộ hệ thống hướng dẫn (prompt engine) trong dự án `autoqcoder` để đạt chất lượng production-grade, tự cải thiện liên tục mà không cần can thiệp thủ công.

**Nguyên cốt**: Hệ thống tiến hóa chạy hoàn toàn trên các file `.md`. LLM đọc các file này làm nguồn sự thật duy nhất. **Không cần file test JS, không cần script kiểm tra bổ sung**.

**Phạm vi**:
- `AGENTS.md` - Self-Optimizing Prompt Engine (văn bản luật chính)
- `AUTO-CONTINUE.md` - Autonomous Continuous Improvement Workflow
- `GOAL.md` - File này (mục tiêu và kế hoạch tiến hóa)
- `skills/**/*.md` - Tất cả skill definitions
- `mate/**/*.md` - Reference files (chỉ đọc, dùng làm tham khảo)

**Không tiến hóa**: `docs/AGENT_METRICS.md`, `docs/AGENT_PROFILE.md`, `docs/EVOLUTION.md` (cập nhật sau mỗi vòng, không tiến hóa cấu trúc)

---

## 2. CHI TIẾU CỦA MỖI FILE

### 2.1 AGENTS.md (Prompt Engine - Văn bản luật chính)

**Mục tiêu phiên bản v3.0**:
- Tối đa 20 sections, ~600 lines (giảm cognitive load)
- Tất cả 16 core sections phải được bảo toàn
- Thêm integration với skills/ (mapping 1-1)
- Thêm concurrency analysis template chi tiết (Section 14)
- Thêm SYSTEM AUDIT FRAMEWORK (10 dimensions, đã có Section 8)
- Self-score ≥90/100 trên mọi quality gate
- Không có hardcoded secrets, không có assumptions

**Điểm cần cải tiến**:
- Đồng bộ terminology với skills/ files
- Thêm cross-references giữa AGENTS.md và skills/
- Thêm "API Compatibility" section chi tiết (Section 10.4)
- Thêm "Verification & Automation" steps chi tiết (Section 15)

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

### Mỗi vòng tiến hóa (Full Cycle)
Mỗi vòng phải **tiến hóa toàn bộ** các file sau, không chia tách theo vòng:

1. `GOAL.md` - Định nghĩa mục tiêu, success criteria, timeline
2. `AGENTS.md` - Prompt engine chính, skill integration, concurrency template, audit framework
3. `AUTO-CONTINUE.md` - Autonomous workflow, improvement catalog, emergency break, quality gate
4. `skills/**/*.md` - Tất cả SKILL.md: YAML frontmatter, Output Format, Khi nào dùng, cross-reference
5. `docs/AGENT_METRICS.md` - Cập nhật số liệu, health score, evolution rate
6. `docs/AGENT_PROFILE.md` - Cập nhật weaknesses, fragile modules, risk register
7. `docs/EVOLUTION.md` - Cập nhật roadmap, trajectory, phase status

**Checklist mỗi vòng (bắt buộc):**
- [ ] Đọc FULL tất cả file skill trong `skills/*/` trước khi bắt đầu
- [ ] Đồng sync terminology giữa AGENTS.md và skills/
- [ ] Cập nhật YAML metadata frontmatter cho mọi SKILL.md còn thiếu
- [ ] Đảm bảo mọi SKILL.md có section Output Format và Khi nào dùng
- [ ] Thêm cross-reference table AGENTS.md Section 13.1 → skills/
- [ ] Tiến hóa skill files cũ/thiếu/không khớp với AGENTS.md/AUTO-CONTINUE.md
- [ ] Cập nhật docs/AGENT_METRICS.md với số liệu thực sau vòng
- [ ] Cập nhật docs/AGENT_PROFILE.md với weaknesses mới (nếu có)
- [ ] Cập nhật docs/EVOLUTION.md với trajectory thay đổi (nếu có)
- [ ] Verify quality gate ≥90 cho AGENTS.md và AUTO-CONTINUE.md
- [ ] Verify skills metadata consistency 100%
- [ ] git add -A, git commit sau khi vòng hoàn thành
- [ ] Đưa ra báo cáo và khuyến nghị tiếp theo

### GIT COMMIT RULE (sau mỗi vòng full cycle)
Sau khi hoàn thành toàn bộ checklist trên:

```bash
git add -A
git commit -m "chore: evolution round N - <brief description>"
```

Chỉ sau commit xong thì mới bắt đầu vòng mới.

---

## 4. SUCCESS CRITERIA (Có thể đo lường)

| Tiêu chí | Ngưỡng | Cách đo |
|----------|--------|---------|
| AGENTS.md sections | ≤20 | Count sections |
| AGENTS.md lines | ≤700 | `wc -l AGENTS.md` |
| AUTO-CONTINUE.md lines | ≤400 | `wc -l AUTO-CONTINUE.md` |
| Self-score AGENTS.md | ≥90/100 | Internal checklist |
| Self-score AUTO-CONTINUE.md | ≥90/100 | Internal checklist |
| Skills metadata consistency | 100% | All SKILL.md have name, description, license, compatibility, metadata |
| No hardcoded secrets | 0 | `security.scan` |
| All tests pass | 100% | `npm test` (nếu có) |
| Audit dimensions covered | 10/10 | Section 8 of AGENTS.md |

---

## 5. QUALITY GATES (Non-negotiable)

Trước khi commit bất kỳ file nào, phải pass:

- [ ] Tất cả functions ≤20 lines (business logic)
- [ ] Cyclomatic complexity ≤10
- [ ] Không có 5+ duplicate lines
- [ ] 100% error handling (public API)
- [ ] 100% input validation (external)
- [ ] Không có hardcoded secrets
- [ ] Testable (không có direct DB/network trong business logic)
- [ ] Coverage ≥80% (nếu có tests)
- [ ] Tất cả tests pass
- [ ] Documentation updated

---

## 6. GIT COMMIT RULE

Sau mỗi vòng hoàn thành:

```bash
git add -A
git commit -m "chore: evolution round N - <brief description>"
```

Chỉ sau commit xong thì mới bắt đầu vòng mới.

---

## 7. KHUYẾN NGHỊ TIẾP THEO

Sau khi hoàn thành tất cả 6 vòng:

1. **Cập nhật full mọi file .md**: Đảm bảo mọi file markdown đều tự chứa đủ thông tin, LLM đọc xong tự chạy vòng tiến hóa mà không cần code JS kiểm tra bổ sung.
2. **Real deployment**: Áp dụng full evolution loop vào một project thực tế (khác todos-api)
3. **npm package**: Publish `autoqcoder@3.0.0`
4. **Metrics automation**: Cập nhật docs/AGENT_METRICS.md thủ công sau mỗi vòng (không cần script tự động)

**Lý do**: Hệ thống tiến hóa chạy hoàn toàn trên các file `.md`. LLM đọc các file này làm nguồn sự thật duy nhất. Không cần file test JS hay script kiểm tra bổ sung.

---

## 8. TỔNG KẾT

Mục tiêu của GOAL.md là định nghĩa bản thiết kế cho việc tự tiến hóa của hệ thống prompt engine. Mỗi vòng phải có kết quả cụ thể, có thể đo lường, và phải commit trước khi chuyển sang vòng tiếp theo.

**Trạng thái**: Đã hoàn thành Vòng 17 (Compression & Sync). Sẵn sàng cho Vòng 18.
