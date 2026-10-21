---
name: push-guide
description: 27-Gate Production Release Pipeline - Industrial-grade code verification cycle from untrusted artifact to production release
license: MIT
compatibility: opencode
metadata:
  audience: senior-developers
  scope: ci-cd-pipeline
---

DANH SÁCH ĐẦY ĐỦ – CHU TRÌNH CÔNG NGHIỆP
áp dụng cho mọi app, mọi ngôn ngữ, mọi kiến trúc,
khi LLM hoặc dev vừa tạo xong một vòng code → đến khi được phép push & release production.
Theo chuỗi kiểm soát chuẩn ISO/enterprise.

0. TRẠNG THÁI KHỞI ĐẦU
“Code vừa được tạo ra”
Artifact lúc này:
Chưa được kiểm chứng
Chưa được build
Chưa được chạy
Chưa được test
Chưa được bảo mật
Chưa được review
Trong công nghiệp gọi là:
Untrusted Code Artifact

1. SOURCE HYGIENE
Mục tiêu: làm sạch đầu vào
Remove:
Placeholder
TODO
Mock hardcode
Comment do LLM suy đoán
Normalize:
Encoding
Line endings
File structure
Validate:
Repo structure đúng chuẩn
Không có file thừa

2. DEPENDENCY FREEZE
Mục tiêu: đảm bảo build tái lập được
Resolve tất cả thư viện
Lock version
Snapshot toàn bộ dependency tree
Tạo checksum
Không cho phép version trôi
Nếu không freeze → không cho tiếp.

3. CLEAN BUILD
Mục tiêu: chứng minh code có thể tạo artifact
Xoá cache
Build từ zero
Compile
Link
Bundle
Package
Không có build = không có sản phẩm.

4. ARTIFACT VERIFICATION
Mục tiêu: xác nhận build output hợp lệ
Binary / bundle tồn tại
Hash ổn định
Kích thước hợp lý
Không thiếu file

5. STATIC CODE ANALYSIS
Mục tiêu: phát hiện lỗi logic & kỹ thuật
Undefined behavior
Race condition
Null access
Injection
Memory misuse
Dead code
API misuse

6. TYPE / SCHEMA VERIFICATION
Mục tiêu: đảm bảo dữ liệu không phá hệ thống
Type compatibility
Interface match
API contract
DB schema match
Event schema match

7. UNIT TEST EXECUTION
Mục tiêu: xác minh từng đơn vị logic
Business rule
Validation
Calculation
State transitions

8. TEST COVERAGE GATE
Mục tiêu: đảm bảo vùng nguy hiểm được test
Core logic
Auth
Payment
Data mutation
Permission

9. INTEGRATION TEST
Mục tiêu: các module nói chuyện đúng
API ↔ DB
Service ↔ Service
Frontend ↔ Backend
Worker ↔ Queue

10. CONTRACT TEST
Mục tiêu: không phá hệ thống khác
API backward compatible
Event schema compatible
Message format stable

11. DATA MIGRATION VALIDATION
Nếu có DB:
Migrate
Rollback
No data loss
No corruption

12. SECURITY SCAN
Mục tiêu: không để bị hack
Vulnerable dependency
Secret leak
Hardcoded credential
Open ports
Dangerous permissions

13. COMPLIANCE CHECK
Nếu app doanh nghiệp:
Logging
Audit trail
Data retention
PII handling
GDPR / HIPAA / SOC2 rules

14. PERFORMANCE SANITY
Mục tiêu: không tự sát hệ thống
CPU
RAM
IO
Thread
Connection pool

15. STRESS / EDGE CASE
Mục tiêu: không chết khi bị abuse
Empty input
Max size
Burst traffic
Timeout
Retry storm

16. FAILURE MODE TEST
Mục tiêu: khi lỗi thì có kiểm soát
DB down
API down
Disk full
Memory full
Network loss

17. OBSERVABILITY VALIDATION
Mục tiêu: có thể debug production
Log
Metrics
Trace
Error report

18. CONFIGURATION VALIDATION
Mục tiêu: chạy đúng môi trường
Env var
Secret store
Feature flag
Region
Scale

19. PACKAGING
Mục tiêu: sẵn sàng deploy
Docker image
Binary
Bundle
Helm
Artifact versioned

20. STAGING DEPLOY
Mục tiêu: test như production
Real infra
Real network
Real scale
Fake data

21. SMOKE TEST
Mục tiêu: có sống không?
App start
API respond
Job run
UI load

22. ROLLBACK TEST
Mục tiêu: có thể cứu hệ thống không
Deploy version mới
Roll back version cũ
Không mất data

23. HUMAN REVIEW GATE
Mục tiêu: chống LLM sai logic
Kiến trúc
Business rule
Security
Failure scenario

24. SIGN-OFF
Mục tiêu: ai chịu trách nhiệm
Tech lead
Security
Product

25. GIT PUSH ALLOWED
Chỉ bây giờ mới được:
git push


26. CI RE-RUN ALL GATES
Không có bypass.

27. PRODUCTION RELEASE

KẾT LUẬN CHUẨN CÔNG NGHIỆP
LLM chỉ làm được:
Bước 0
Tất cả các bước còn lại tồn tại vì:
Code luôn nói dối cho đến khi bị chứng minh là đúng.
Nếu bạn đang “vibe code rồi push thẳng”
→ đó là prototype, không phải kỹ nghệ phần mềm.

---

## Output Format

```
27-Gate Pipeline Status:
✅ Gate 0: Untrusted Code Artifact (code vừa tạo, chưa kiểm chứng)
✅ Gate 1: Source Hygiene (làm sạch placeholder, TODO, mock hardcode)
✅ Gate 2: Dependency Freeze (lock version, snapshot dependency tree)
✅ Gate 3: Clean Build (build từ zero, compile, link, bundle)
✅ Gate 4: Artifact Verification (binary tồn tại, hash ổn định)
✅ Gate 5: Static Code Analysis (undefined behavior, race condition, injection)
✅ Gate 6: Type/Schema Verification (type compatibility, API contract)
✅ Gate 7: Unit Test Execution (business rule, validation, calculation)
✅ Gate 8: Test Coverage Gate (core logic, auth, payment, data mutation)
✅ Gate 9: Integration Test (API↔DB, Service↔Service, Frontend↔Backend)
✅ Gate 10: Contract Test (API backward compatible, event schema)
✅ Gate 11: Data Migration Validation (migrate, rollback, no data loss)
✅ Gate 12: Security Scan (vulnerable dependency, secret leak, hardcoded credential)
✅ Gate 13: Compliance Check (logging, audit trail, data retention, PII)
✅ Gate 14: Performance Sanity (CPU, RAM, IO, thread, connection pool)
✅ Gate 15: Stress/Edge Case (empty input, max size, burst traffic)
✅ Gate 16: Failure Mode Test (DB down, API down, disk full, network loss)
✅ Gate 17: Observability Validation (log, metrics, trace, error report)
✅ Gate 18: Configuration Validation (env var, secret store, feature flag)
✅ Gate 19: Packaging (Docker image, binary, bundle, Helm)
✅ Gate 20: Staging Deploy (real infra, real network, real scale)
✅ Gate 21: Smoke Test (app start, API respond, job run)
✅ Gate 22: Rollback Test (deploy mới, rollback cũ, không mất data)
✅ Gate 23: Human Review Gate (kiến trúc, business rule, security)
✅ Gate 24: Sign-off (tech lead, security, product)
✅ Gate 25: GIT PUSH ALLOWED (chỉ sau khi tất cả gate pass)
✅ Gate 26: CI Re-Run All Gates (không có bypass)
✅ Gate 27: Production Release

🔑 Key Principle: "LLM chỉ làm được Bước 0. Tất cả các bước còn lại tồn tại vì code luôn nói dối cho đến khi bị chứng minh là đúng."
```

---

## Khi nào dùng

- Sau khi LLM hoặc dev tạo xong một vòng code, trước khi push & release production
- Khi cần đảm bảo code artifact đã được kiểm chứng đầy đủ trước production
- Khi muốn áp dụng chu kỳ kiểm soát chuẩn ISO/enterprise cho phát triển phần mềm
- Khi cần pipeline bảo mật, kiểm thử, và đánh giá chất lượng code theo quy trình công nghiệp

**Không dùng khi:**
- Chỉ thay đổi văn bản, comment, documentation không ảnh hưởng code chạy
- Chỉ thay đổi cấu hình không liên quan đến logic nghiệp vụ
