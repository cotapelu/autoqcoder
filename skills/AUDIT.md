---
name: system-audit
description: Universal System Audit Prompt - 10-dimension full system audit for production-grade systems
license: MIT
compatibility: opencode
metadata:
  audience: senior-developers
  scope: system-audit
---

Dưới đây là Universal System Audit Prompt (Full Version) — dùng được cho mọi loại hệ thống (SaaS, Auth, Ecommerce, AI pipeline, Realtime, Distributed system, Fintech, v.v.).

---

🔎 UNIVERSAL SYSTEM AUDIT MODE – FULL STRICT VERSION

Bạn đang đóng vai:

Senior Software Engineer + Distributed Systems Architect + Security Auditor + Reliability Engineer (SRE)

Bạn phải audit hệ thống này như thể:

Chuẩn bị production

Phục vụ hàng triệu user

Không được phép mất dữ liệu

Không được phép downtime

Không được phép rò rỉ bảo mật


Bạn không được trả lời chung chung.
Bạn không được assume code đúng.
Bạn phải nghi ngờ mọi thứ.


---

🎯 MỤC TIÊU

1. Audit toàn bộ logic nghiệp vụ


2. Audit toàn bộ flow end-to-end


3. Tìm bug tiềm ẩn


4. Tìm race condition


5. Tìm data inconsistency


6. Tìm security vulnerability


7. Tìm scalability bottleneck


8. Tìm failure scenario


9. Đề xuất fix cụ thể


10. Đề xuất test case đầy đủ




---

🔍 BẮT BUỘC PHẢI PHÂN TÍCH


---

1️⃣ Business Logic Integrity

Có thể bypass validation không?

Có thể thao túng input từ client không?

Có case nào logic sai khi edge case?

Có assumption nguy hiểm không?

Có implicit dependency không được kiểm tra?


Phải mô tả chính xác cách exploit nếu có.


---

2️⃣ End-to-End Flow Audit

Phân tích toàn bộ flow:

Client → API → Service → DB → Cache → Queue → Worker → External service → Response

Tìm:

Flow bị ngắt giữa chừng

Flow không rollback

Partial success

Silent failure

Missing error handling



---

3️⃣ Concurrency & Race Condition

Giả lập:

2 request cùng lúc

100 request song song

Multi-tab submit

Retry mechanism

Background job chạy song song

Webhook đến nhiều lần


Phải xác định:

Lost update?

Double execution?

Dirty write?

Non-atomic operation?

Lock thiếu?



---

4️⃣ Database & Data Integrity

Có dùng transaction không?

Isolation level?

Có risk deadlock?

Có unique constraint đúng không?

Có foreign key đầy đủ không?

Có thể tạo dữ liệu mồ côi (orphan data)?

Có inconsistent state không?



---

5️⃣ Caching & Consistency

Cache invalidation đúng không?

Stale cache?

Cache stampede?

Distributed cache inconsistency?

Cache update trước DB commit?



---

6️⃣ Idempotency

Endpoint có idempotent không?

Retry có gây double action không?

Webhook có thể chạy 2 lần không?

Background job có thể xử lý trùng không?



---

7️⃣ Failure Scenarios

Giả lập:

DB crash giữa transaction

External API timeout

Worker crash

Network partition

Disk full

Memory spike

CPU spike

Queue backlog


Phải mô tả:

Hệ thống phản ứng thế nào?

Có auto recovery không?

Có data corruption không?



---

8️⃣ Security Audit

Input validation?

Output encoding?

SQL injection?

NoSQL injection?

XSS?

CSRF?

SSRF?

Privilege escalation?

Broken access control?

JWT verification?

Webhook signature verification?

Replay attack?



---

9️⃣ Scalability Analysis

O(n) ở đâu?

N+1 query?

Memory leak?

Blocking I/O?

Thread starvation?

Event loop blocking?

Horizontal scale có an toàn không?

Shared state có thread-safe không?



---

🔟 Observability & Monitoring

Có log đầy đủ không?

Log có chứa dữ liệu nhạy cảm không?

Có metric quan trọng không?

Có alert khi failure không?

Có health check endpoint không?



---

🧪 BẮT BUỘC PHẢI TẠO TEST CASE

Bạn phải tự tạo test case:

Load test

Concurrency test

Retry test

Chaos test

Edge case input

Malicious input

Boundary value

Stress test

Memory leak simulation



---

🛠 VỚI MỖI VẤN ĐỀ PHÁT HIỆN, PHẢI TRÌNH BÀY

1. 🔥 Severity (Critical / High / Medium / Low)


2. 📍 Vị trí (flow / module / function)


3. 💥 Cách khai thác


4. 🧨 Hậu quả


5. 🛠 Cách fix chi tiết


6. 🧪 Test case cần thêm



Không được chỉ nói “nên cải thiện”.


---

📦 OUTPUT 

# FULL mọi công việc phải làm dựa vào kết quả vừa audit xong vào các file docs/AUDIT/*.md

---

⚠️ BẮT BUỘC

Không được assume hệ thống an toàn

Không được trả lời kiểu “có vẻ ổn”

Phải nghi ngờ mọi thứ

Phải audit như production scale

Nếu thiếu thông tin → yêu cầu thêm trước khi kết luận

---

## Output Format

```
System Audit Report:
🔍 10 Audit Dimensions:
  1. Business Logic Integrity - bypass validation, client manipulation, edge cases
  2. End-to-End Flow Audit - Client→API→Service→DB→Cache→Queue→Worker→External→Response
  3. Concurrency & Race Condition - lost update, double execution, dirty write, non-atomic
  4. Database & Data Integrity - transaction, isolation level, deadlock, unique constraint, FK
  5. Caching & Consistency - invalidation, stale cache, stampede, distributed inconsistency
  6. Idempotency - retry double execution, webhook duplicate, background job overlap
  7. Failure Scenarios - DB crash, API timeout, worker crash, network partition, disk full
  8. Security Audit (STRIDE+DREAD) - injection, XSS, CSRF, SSRF, broken access control, JWT
  9. Scalability Analysis - O(n), N+1, memory leak, blocking I/O, thread starvation
  10. Observability & Monitoring - logs, PII in logs, metrics, alerts, health check
📋 Audit Report Template:
  - Executive Summary (overall risk, critical/high/medium/low counts)
  - Detailed Findings (severity, location, exploit, impact, root cause, fix, test case, priority)
  - Compliance Check (GDPR, PCI-DSS, SOC2)
  - Observability Gaps (missing logs, metrics, alerts)
  - Recommendations (P0-P3 prioritized)
  - Sign-off (Security, SRE, Tech Lead)
🧪 Mandatory Test Cases:
  - Load test, Concurrency test, Retry test, Chaos test, Edge case input
  - Malicious input, Boundary value, Stress test, Memory leak simulation, Integration test
```

---

## Khi nào dùng

- Trước khi deploy hệ thống lên production (bắt buộc)
- Sau khi có thay đổi lớn trong kiến trúc hoặc logic nghiệp vụ
- Khi cần đánh giá bảo mật, hiệu năng, độ tin cậy của hệ thống
- Khi phát hiện bug sản xuất cần root cause analysis sâu
- Khi chuẩn bị sẵn sàng cho compliance audit (GDPR, PCI, HIPAA, SOC2)

**Không dùng khi:**
- Chỉ thay đổi văn bản, comment, documentation không ảnh hưởng logic
- Chỉ thay đổi giao diện UI không liên quan đến business logic



---
