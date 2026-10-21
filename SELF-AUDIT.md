# SELF-AUDIT - Deep Content Validation Template (v1.0)

**Nguyên cốt:** File này là template auto-audit nội dung deep cho mọi vòng tiến hóa. LLM đọc file này để tự đánh giá chất lượng toàn bộ các file `.md` trước khi commit. **Không cần script JS kiểm tra bổ sung.**

---

## 1. MỤC ĐÍCH

Trước mỗi `git commit`, LLM phải chạy qua toàn bộ checklist dưới đây để verify:
- Nội dung từng file `.md` đầy đủ, không thiếu section bắt buộc
- Terminology đồng bộ giữa `AGENTS.md` và `skills/`
- Không có hardcoded secrets
- Không có assumption, placeholder, gap thông tin
- Mọi file đạt quality gate theo `GOAL.md` Section 5.2

---

## 2. SCOPE - 7 FILE BẮT BUỘC KIỂM TRA

| STT | File | Đường dẫn |
|-----|------|-----------|
| 1 | `GOAL.md` | `/GOAL.md` |
| 2 | `AGENTS.md` | `/AGENTS.md` |
| 3 | `AUTO-CONTINUE.md` | `/AUTO-CONTINUE.md` |
| 4 | Tất cả skill files | `/skills/*/SKILL.md`, `/skills/*.md` |
| 5 | `docs/AGENT_METRICS.md` | `/docs/AGENT_METRICS.md` |
| 6 | `docs/AGENT_PROFILE.md` | `/docs/AGENT_PROFILE.md` |
| 7 | `docs/EVOLUTION.md` | `/docs/EVOLUTION.md` |

---

## 3. SURFACE-LEVEL CHECK (Chạy bằng bash)

Trước khi deep content check, chạy các lệnh sau:

```bash
# 1. AGENTS.md ≤700 lines, ≤20 sections
wc -l AGENTS.md
grep -c '^## ' AGENTS.md

# 2. AUTO-CONTINUE.md ≤400 lines
wc -l AUTO-CONTINUE.md

# 3. Không có hardcoded secrets trong bất kỳ file .md nào
grep -riE '(password|secret|api_key|token|private_key)\s*[:=]\s*["'\'']?[a-zA-Z0-9+/=]{20,}["'\'']?' *.md skills/*/*.md docs/*.md 2>/dev/null || echo "No secrets found"

# 4. Count skill files
ls skills/*/SKILL.md skills/*.md 2>/dev/null | wc -l
```

Nếu bất kỳ bước nào fail → **KHÔNG được commit**, phải sửa trước.

---

## 4. DEEP CONTENT CHECK (LLM đọc toàn bộ file)

LLM phải đọc **FULL từng file** và đánh giá theo các tiêu chí sau:

### 4.1 AGENTS.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| Tất cả 16 core sections tồn tại | Đọc từ `## 1.` đến `## 17.` (tối đa 20) | □ |
| Không có assumption | Tìm từ "assume", "giả định", "tưởng rằng", "có lẽ" | □ |
| Không có hardcoded secrets | Tìm `password=`, `secret=`, `api_key=`, `token=` có giá trị thực | □ |
| Error handling 100% (public API) | Mỗi function/mô tả xử lý lỗi phải có ví dụ cụ thể | □ |
| Input validation 100% (external) | Mỗi input từ bên ngoài phải có quy tắc validate | □ |
| No 5+ duplicate lines | Quét toàn bộ file, không có 5 dòng giống hệt nhau liên tiếp | □ |
| Terminology đồng bộ skills/ | So sánh thuật ngữ (Modular Monolith, Clean Architecture, Platform Layer...) giữa AGENTS.md và skills/ | □ |
| Self-score ≥90/100 | Đánh giá nội dung theo Section 1.1-1.3 AGENTS.md | □ |

### 4.2 Mỗi SKILL.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| YAML frontmatter đầy đủ | `name`, `description`, `license`, `compatibility`, `metadata` (audience, scope) | □ |
| Output Format section | Có section "Output Format" rõ ràng, không bỏ trống | □ |
| Khi nào dùng section | Có section "Khi nào dùng" hướng dẫn áp dụng | □ |
| Không có placeholder | Không có "TODO", "FIXME", "Chưa hoàn thành", "Cần bổ sung" | □ |
| Terminology khớp AGENTS.md | Các thuật ngữ kiến trúc phải đồng nhất với AGENTS.md | □ |
| Content không mâu thuẫn | Không nói điều trái ngược với AGENTS.md | □ |

### 4.3 AUTO-CONTINUE.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| Emergency break conditions | Có điều kiện dừng rõ ràng (error rate >5%, memory >90%, disk <10%) | □ |
| Cycle timing | 2h discovery, 5 phút sleep, max 3 tasks/cycle | □ |
| Improvement catalog | R→P→S→T→D→O→C→U→M đầy đủ | □ |
| Metrics log format | Có mẫu format ghi metrics sau mỗi task | □ |
| Auto-update docs | Có quy tắc cập nhật docs sau mỗi task | □ |

### 4.4 GOAL.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| Mục tiêu từng vòng rõ ràng | Định nghĩa mục tiêu, success criteria, timeline | □ |
| Success criteria có thể đo lường | Có ngưỡng và cách đo cụ thể | □ |
| Quality gates cho mỗi file | Có gate rõ ràng cho AGENTS.md, AUTO-CONTINUE.md, skills/, docs/ | □ |
| Pre-commit self-check | Có quy tắc kiểm tra trước khi commit | □ |
| Tham chiếu SELF-AUDIT.md | Có mention đến file này | □ |

### 4.5 docs/AGENT_METRICS.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| Số liệu thực sau mỗi vòng | Có entry mới với timestamp, task, status | □ |
| Health score | Có tính toán health score | □ |
| Evolution rate | Có improvement/tuần | □ |

### 4.6 docs/AGENT_PROFILE.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| Weaknesses mới | Có cập nhật weaknesses nếu có | □ |
| Fragile modules | Có liệt kê module dễ bị lỗi | □ |
| Risk register | Có bảng rủi ro với probability, impact, mitigation | □ |

### 4.7 docs/EVOLUTION.md — Deep Content Validation

| Tiêu chí | Cách kiểm tra | Pass/Fail |
|----------|--------------|-----------|
| Roadmap cập nhật | Có timeline, phase status | □ |
| Trajectory thay đổi | Có ghi nhận trajectory đã thay đổi | □ |
| Round status | Mỗi round đã hoàn thành được đánh dấu | □ |

---

## 5. SELF-AUDIT PROMPT (LLM dùng để đánh giá)

LLM copy prompt dưới đây, điền nội dung từng file, rồi đánh giá:

```
Bạn là auditor tự đánh giá chất lượng các file .md trong dự án autoqcoder.

Hãy đọc FULL toàn bộ nội dung các file sau:
- AGENTS.md
- AUTO-CONTINUE.md
- GOAL.md
- skills/*/SKILL.md (tất cả skill files)
- docs/AGENT_METRICS.md
- docs/AGENT_PROFILE.md
- docs/EVOLUTION.md

Đánh giá theo SELF-AUDIT.md (tiêu chí deep content check):

1. AGENTS.md: 16 core sections đầy đủ? ≤700 lines? ≤20 sections? Không assumption? Không hardcoded secrets?
2. Mọi SKILL.md: YAML frontmatter đầy đủ? Output Format? Khi nào dùng? Terminology đồng bộ AGENTS.md?
3. Nội dung có mâu thuẫn với nhau không?
4. Có gap nào thiếu thông tin không?
5. Self-score: 0-100 điểm cho mỗi file

Output: Báo cáo chi tiết, ghi rõ gap, và liệt kê những gì cần viết thêm (Missing Code = Write More).
```

---

## 6. GAP & MISSING CODE HANDLING

Nếu LLM phát hiện gap trong bất kỳ file nào:

| Loại gap | Hành động |
|----------|-----------|
| Thiếu section bắt buộc trong AGENTS.md | VIẾT THÊM section đó (không skip) |
| Thiếu YAML frontmatter trong SKILL.md | VIẾT THÊM frontmatter đầy đủ |
| Thiếu Output Format trong SKILL.md | VIẾT THÊM section Output Format |
| Thiếu Khi nào dùng trong SKILL.md | VIẾT THÊM section Khi nào dùng |
| Terminology không đồng bộ | SỬA để đồng bộ giữa AGENTS.md và skills/ |
| Có hardcoded secrets | LOẠI BỎ hoặc thay bằng placeholder |
| Có assumption | VIẾT THÊM xử lý cho trường hợp đó hoặc ghi rõ gap |

**Nguyên tắc:** Missing Code = Write More. KHÔNG skip, KHÔNG remove code, KHÔNG reduce scope.

---

## 7. PRE-COMMIT SELF-CHECK (Trước khi `git add -A && git commit`)

LLM phải verify tất cả:

- [ ] Đã đọc FULL tất cả 7 file trong Section 2
- [ ] Đã chạy surface-level check (bash commands Section 3)
- [ ] Đã chạy deep content check (Section 4)
- [ ] AGENTS.md ≤700 lines, ≤20 sections
- [ ] AUTO-CONTINUE.md ≤400 lines
- [ ] Không có hardcoded secrets trong bất kỳ file .md nào
- [ ] Terminology đồng bộ giữa AGENTS.md và skills/
- [ ] Mọi SKILL.md có đầy đủ YAML frontmatter (name, description, license, compatibility, metadata)
- [ ] Mọi SKILL.md có section Output Format và Khi nào dùng
- [ ] Đã cập nhật docs/AGENT_METRICS.md với số liệu thực
- [ ] Đã cập nhật docs/AGENT_PROFILE.md với weaknesses mới (nếu có)
- [ ] Đã cập nhật docs/EVOLUTION.md với trajectory thay đổi (nếu có)
- [ ] Self-score AGENTS.md ≥90/100
- [ ] Self-score AUTO-CONTINUE.md ≥90/100

Nếu bất kỳ mục nào fail → **KHÔNG được commit**, phải sửa trước.

---

## 8. VỊ TRÍ FILE

- File này nằm tại: `/SELF-AUDIT.md` (thư mục gốc)
- `GOAL.md` đề cập đến file này tại Section 3.4 (Pre-commit self-check) và Section 5.2 (Quality Gate cho file .md)

---

## 9. LỊCH SỬ SỬA ĐỔI

| Version | Ngày | Mô tả |
|---------|------|-------|
| v1.0 | 2026-06-23 | Tạo file template deep content self-audit choRound 20 |
