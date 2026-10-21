# GOAL.md - Mục tiêu Tự Tiến Hóa (v3.0)

## 1. MỤC TIÊU TỔ QUAN

**Mục tiêu chính**: Tự động tiến hóa toàn bộ hệ thống hướng dẫn (prompt engine) trong dự án `autoqcoder` để đạt chất lượng production-grade, tự cải thiện liên tục mà không cần can thiệp thủ công.

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

---

## 3. VÒNG TIẾN HÓA (EVOLUTION ROUNDS)

### Vòng 1: GOAL.md (Hiện tại)
- [ ] Viết lại GOAL.md với cấu trúc rõ ràng
- [ ] Định nghĩa success criteria cho từng file
- [ ] Thiết lập timeline và quality gates

### Vòng 2: AGENTS.md
- [ ] Tích hợp improvements từ skills/AUDIT.md, skills/PUSHGUIDE.md, skills/TESTRULE.md
- [ ] Cập nhật skill integration table
- [ ] Thêm concurrency analysis template chi tiết
- [ ] Verify quality gate ≥90

### Vòng 3: AUTO-CONTINUE.md
- [ ] Nâng cấp task delegation, cycle timing, emergency break
- [ ] Thêm improvement catalog
- [ ] Verify consistency với AGENTS.md

### Vòng 4: skills/ files
- [ ] Đồng bộ skills/AUDIT.md, skills/PUSHGUIDE.md, skills/TESTRULE.md
- [ ] Cập nhật metadata consistency across all skill SKILL.md files
- [ ] Verify all skills files quality

### Vòng 5: docs/ evolution files
- [ ] Cập nhật docs/AGENT_METRICS.md
- [ ] Cập nhật docs/AGENT_PROFILE.md
- [ ] Cập nhật docs/EVOLUTION.md

### Vòng 6: Commit & Báo cáo
- [ ] git add -A, git commit sau mỗi vòng
- [ ] Đưa ra báo cáo và khuyến nghị tiếp theo

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

1. **Validation suite**: Tạo `tests/prompt-compliance.test.js` để tự động verify AGENTS.md có tất cả sections bắt buộc
2. **Real deployment**: Áp dụng full evolution loop vào một project thực tế (khác todos-api)
3. **npm package**: Publish `autoqcoder@3.0.0`
4. **Metrics automation**: Tạo script tự động cập nhật docs/AGENT_METRICS.md từ git history

---

## 8. TỔNG KẾT

Mục tiêu củaGOAL.md là định nghĩa bản thiết kế cho việc tự tiến hóa của hệ thống prompt engine. Mỗi vòng phải có kết quả cụ thể, có thể đo lường, và phải commit trước khi chuyển sang vòng tiếp theo.

**Trạng thái**: Bắt đầu Vòng 1 (GOAL.md)
