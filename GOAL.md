# GOAL.md — Production-Ready Autonomous Code Agent

**Version 1.0** | Single source of truth cho dự án **autoqcoder** (self-optimizing prompt engine).

---

## 1. Dự án này là gì?

`autoqcoder` không phải ứng dụng web/API thông thường. Đây là một kho **hướng dẫn (markdown)** dùng để điều khiển một agent AI (hoặc lập trình viên) viết ra code production-ready, tự cải thiện liên tục, và tự kiểm duyệt bảo mật/chất lượng trước khi đưa vào production.

Thành phẩm chính là các file `.md` tiêu chuẩn, không phải code chạy được.

---

## 2. Bản đồ đọc (Read-next map)

| Nếu bạn... | Hãy đọc file này trước |
|------------|------------------------|
| Muốn biết tổng quan, misión, tiêu chí chất lượng | **`GOAL.md`** (file này) |
| Muốn hiểu quy trình agent tự động chạy (Analyze → Plan → Test → Implement → Refactor → Optimize → Audit → Verify) | **`AUTO-CONTINUE.md`** |
| Muốn xem tiêu chuẩn chất lượng, production standards, anti-patterns, audit framework | **`AGENTS.md`** |
| Muốn theo dõi metrics, profile, roadmap của agent (tự cải thiện bản thân) | **`docs/AGENT_METRICS.md`**, **`docs/AGENT_PROFILE.md`**, **`docs/EVOLUTION.md`** |
| Cần kiến trúc chi tiết theo stack (Go, Python, React, Angular, .NET, Rust...) | **`skills/<tên-skill>/SKILL.md`** |
| Muốn chạy kiểm tra chất lượng toàn dự án | Chạy `make quality` (xem `Makefile`) |

---

## 3. Cấu trúc thư mục (`*.md` chính)

```
autoqcoder/
├── GOAL.md                 # Bản đồ này (bắt đầu đọc ở đây)
├── AGENTS.md               # Tiêu chuẩn chất lượng + production + audit (10 dimensions)
├── AUTO-CONTINUE.md        # Vòng lặp tự động của agent
├── README.md               # Cài đặt & giới thiệu
├── Makefile                # make quality (lint, type-check, test, coverage, security)
├── package.json            # Scripts npm (test, self-score, check:evolution, quality...)
├── docs/
│   ├── AGENT_METRICS.md    # Self-evolution: metrics từng cycle
│   ├── AGENT_PROFILE.md    # Self-evolution: điểm yếu, strengths
│   └── EVOLUTION.md        # Self-evolution: roadmap 3-6 tháng
├── docs/archive/           # File cũ đã archive (mate/*, PROJECT_STATE*)
└── skills/                 # 10 skill definitions (Go, Python, React, Angular, .NET, Rust...)
```

---

## 4. Nguyên tắc cốt lõi (bắt buộc tuân thủ)

1. **Không xóa code** để pass test — tìm root cause, fix logic, dùng feature flag nếu cần tắt tạm thời.
2. **Missing code = viết thêm** — không skip vì "not required", không giảm scope để pass nhanh.
3. **Test trước code (TDD)** — viết test fail đầu, sau đó implement, sau đó refactor.
4. **Audit trước Verify** — code phải pass System Audit (10 dimensions) trước khi considered done.
5. **Simplicity first** — tối thiểu code cần thiết, không over-engineer, không abstraction cho single-use.
6. **Mental testing tất cả** — valid, invalid, null, boundary, malformed, cả hai chiều UI→DB và DB→UI.

---

## 5. Lệnh chạy thường dùng

```bash
# Chạy tất cả kiểm tra chất lượng
make quality

# Hoặc từng bước
npm run test:prompts      # Kiểm tra prompt compliance (5 tests)
npm run self-score        # Tính self-score (target ≥90/100)
npm run check:evolution   # Kiểm tra docs/ đồng bộ với AGENTS.md/AUTO-CONTINUE.md
npm audit                 # Quét bảo mật (target: 0 vulnerabilities)

# Chạy agent tự động (khái niệm, entrypoint là AGENTS.md + AUTO-CONTINUE.md)
npm run agent:once
```

---

## 6. Quality Gate (self-score)

Mục tiêu: **≥90/100**.

- Functions size ≤20 lines: 10 pts
- Cyclomatic complexity ≤10: 10 pts
- Duplication <5 lines: 10 pts
- Error handling 100%: 20 pts
- Input validation 100%: 20 pts
- No hardcoded secrets: 10 pts
- Testable architecture: 10 pts
- Coverage ≥80%: 10 pts

Chạy `npm run self-score` để kiểm tra.

---

## 7. Tóm tắt vòng lặp tự động (Autonomous Loop)

```
Detect violations → Plan micro-steps → Test (fail first) → Implement → Refactor → Optimize
→ Audit (10 dimensions) → Verify → Commit (conventional commits) → Log metrics
→ Update AGENT_PROFILE.md & EVOLUTION.md
```

Agent scan codebase mỗi 2 giờ, ưu tiênCritical → High → Medium → Low. Dừng khi user yêu cầu stop, test/build fail cần clarification, audit fail critical, hoặc không còn actionable TODO.

---

## 8. Lịch sử thay đổi

- **v1.0 (2025-06-30):** Tổng hợp từ `AGENTS.md v2.1` + `AUTO-CONTINUE.md v2.2`, viết lại bản concise làm bản đồ đọc.

---

> **Bắt đầu:** Đọc `AGENTS.md` để nắm tiêu chuẩn, sau đó đọc `AUTO-CONTINUE.md` để hiểu quy trình chạy agent, cuối cùng tham khảo `skills/` khi cần kiến trúc stack cụ thể.
