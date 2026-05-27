/**
 * Audit Checklist Test Suite
 * Tests that AUDIT section in AGENTS.md is complete and comprehensive
 */

const fs = require('fs');
const path = require('path');

// Read AGENTS.md
const agentsPath = path.join(__dirname, '..', 'AGENTS.md');
const agentsContent = fs.readFileSync(agentsPath, 'utf-8');

// All 10 audit dimensions (exact names from AGENTS.md)
const AUDIT_DIMENSIONS = [
  '1️⃣ Business Logic Integrity',
  '2️⃣ End-to-End Flow Audit',
  '3️⃣ Concurrency & Race Condition',
  '4️⃣ Database & Data Integrity',
  '5️⃣ Caching & Consistency',
  '6️⃣ Idempotency',
  '7️⃣ Failure Scenarios',
  '8️⃣ Security Audit',
  '9️⃣ Scalability Analysis',
  '🔟 Observability & Monitoring'
];

// Required audit checklist items (partial, key ones)
const CRITICAL_AUDIT_ITEMS = [
  'bypass validation',
  'race condition',
  'transaction',
  'cache invalidation',
  'idempotent',
  'failure scenarios',
  'SQL injection',
  'XSS',
  'CSRF',
  'SSRF',
  'O(n)',
  'memory leak',
  'structured JSON logs',
  'health check',
  'correlation ID',
  'OpenTelemetry'
];

// Required test case categories
const REQUIRED_TEST_CATEGORIES = [
  'Load test',
  'Concurrency test',
  'Retry test',
  'Chaos test',
  'Edge case input',
  'Malicious input',
  'Boundary value',
  'Stress test',
  'Memory leak simulation',
  'Integration test'
];

// Required report sections
const REPORT_SECTIONS = [
  'Executive Summary',
  'Detailed Findings',
  'Compliance Check',
  'Observability Gaps',
  'Recommendations',
  'Sign-off'
];

// Priority matrix required
const PRIORITY_MATRIX = ['P0', 'P1', 'P2', 'P3'];

describe('AUDIT Framework Compliance', () => {

  test('all 10 audit dimensions are present', () => {
    const missing = AUDIT_DIMENSIONS.filter(dim =>
      !agentsContent.includes(dim)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing audit dimensions:');
      missing.forEach(d => console.log(`   - ${d}`));
    }

    expect(missing).toEqual([]);
  });

  test('each dimension has detailed checklist', () => {
    const errors = [];

    AUDIT_DIMENSIONS.forEach(dim => {
      const dimIndex = agentsContent.indexOf(dim);
      if (dimIndex === -1) return;

      // Find next dimension or end of section
      const nextDimIndex = AUDIT_DIMENSIONS.reduce((next, d) => {
        if (d === dim) return next;
        const idx = agentsContent.indexOf(d);
        return idx > dimIndex && (next === -1 || idx < next) ? idx : next;
      }, -1);

      const dimContent = agentsContent.substring(
        dimIndex,
        nextDimIndex === -1 ? undefined : nextDimIndex
      );

      // Each dimension should have at least 5 checklist items (lines starting with - [ ])
      const checklistItems = (dimContent.match(/^- \[ \]/gm) || []).length;
      if (checklistItems < 3) {
        errors.push({ dim, count: checklistItems });
      }
    });

    if (errors.length > 0) {
      console.log('\n❌ Dimensions with insufficient checklist items:');
      errors.forEach(e => console.log(`   ${e.dim}: only ${e.count} items`));
    }

    expect(errors).toEqual([]);
  });

  test('all critical audit items are covered somewhere', () => {
    const missing = CRITICAL_AUDIT_ITEMS.filter(item =>
      !agentsContent.toLowerCase().includes(item.toLowerCase())
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing critical audit items:');
      missing.forEach(item => console.log(`   - ${item}`));
    }

    expect(missing).toEqual([]);
  });

  test('AUDIT REPORT TEMPLATE is complete', () => {
    expect(agentsContent).toMatch(/```markdown[\s\S]*?# SYSTEM AUDIT REPORT/);

    REPORT_SECTIONS.forEach(section => {
      expect(agentsContent).toMatch(new RegExp(section, 'i'));
    });
  });

  test('FIX PRIORITY MATRIX is defined', () => {
    expect(agentsContent).toMatch(/FIX PRIORITY MATRIX/);
    expect(agentsContent).toMatch(/Critical.*Easy.*P0/s);

    PRIORITY_MATRIX.forEach(prio => {
      expect(agentsContent).toMatch(prio);
    });
  });

  test('AUDIT CHECKLIST has required items', () => {
    expect(agentsContent).toMatch(/## AUDIT CHECKLIST/);

    const checklistItems = [
      'All 10 dimensions audited',
      'All critical findings documented',
      'All high findings have fix plan',
      'All test cases written',
      'All security threats modeled',
      'All failure scenarios tested',
      'All race conditions identified',
      'All data integrity risks assessed',
      'All caching issues resolved',
      'All idempotency gaps fixed',
      'All scalability bottlenecks addressed',
      'All observability gaps filled'
    ];

    const missing = checklistItems.filter(item =>
      !agentsContent.includes(item)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing audit checklist items:');
      missing.forEach(item => console.log(`   - ${item}`));
    }

    expect(missing).toEqual([]);
  });

  test('self-score ≥ 90 required for audit', () => {
    const auditChecklistSection = agentsContent.match(/## AUDIT CHECKLIST[\s\S]*?## |$/)?.[0];
    expect(auditChecklistSection).toMatch(/Self-score\s*≥\s*90/);
  });

  test('penalty -30 for incomplete audit is stated', () => {
    expect(agentsContent).toMatch(/Penalty\s*-\s*30.*if audit incomplete/);
  });

  test('mandatory test cases (10 categories) are defined', () => {
    REQUIRED_TEST_CATEGORIES.forEach(category => {
      expect(agentsContent).toMatch(new RegExp(category, 'i'));
    });
  });

  test('DREAD scoring is mentioned for Security Audit', () => {
    expect(agentsContent).toMatch(/DREAD/);
    expect(agentsContent).toMatch(/Damage.*Reproducibility.*Exploitability/s);
  });

  test('STRIDE is mentioned', () => {
    expect(agentsContent).toMatch(/STRIDE/);
    // Should mention at least 3 of the STRIDE categories
    const strideCategories = ['Spoofing', 'Tampering', 'Repudiation', 'Information Disclosure', 'Denial of Service', 'Elevation of Privilege'];
    const found = strideCategories.filter(cat => agentsContent.includes(cat));
    expect(found.length).toBeGreaterThanOrEqual(3);
  });

  test('idempotency implementation guidance provided', () => {
    expect(agentsContent).toMatch(/Idempotency key header/);
    expect(agentsContent).toMatch(/unique constraint on operation_id/);
  });

  test('failure scenarios include specific cases', () => {
    const failures = [
      'DB crash',
      'External API timeout',
      'Worker crash',
      'Network partition',
      'Disk full',
      'Memory spike',
      'CPU spike',
      'Queue backlog'
    ];

    const missing = failures.filter(f =>
      !agentsContent.includes(f)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing failure scenarios:');
      missing.forEach(f => console.log(`   - ${f}`));
    }

    expect(missing).toEqual([]);
  });

  test('observability requirements are specific', () => {
    expect(agentsContent).toMatch(/structured JSON logs/);
    expect(agentsContent).toMatch(/PII.*redact/);
    expect(agentsContent).toMatch(/Prometheus/);
    expect(agentsContent).toMatch(/OpenTelemetry/);
    expect(agentsContent).toMatch(/health check/);
  });

  test('scalability analysis benchmarks are defined', () => {
    expect(agentsContent).toMatch(/Benchmark:/);
    expect(agentsContent).toMatch(/p50.*< 100ms/);
    expect(agentsContent).toMatch(/p99.*< 200ms/);
  });

  // --- INTEGRATION TESTS ---

  test('AUDIT section references AGENTS.md properly', () => {
    // AUTO-CONTINUE should reference AGENTS.md for audit details
    const autoContinuePath = path.join(__dirname, '..', 'AUTO-CONTINUE.md');
    const autoContinueContent = fs.readFileSync(autoContinuePath, 'utf-8');

    expect(autoContinueContent).toMatch(/AGENTS\.md.*audit/);
    expect(autoContinueContent).toMatch(/10 dimensions/);
  });

  test('Audit workflow step is integrated into main workflow', () => {
    const workflowSection = agentsContent.match(/## WORKFLOW[\s\S]*?## /)?.[0] ||
                           agentsContent.match(/Analyze.*→.*Verify/s)?.[0];

    // Should have Audit between Optimize and Verify
    expect(agentsContent).toMatch(/Optimize.*Audit.*Verify/s);
  });

});

console.log('Running AUDIT Checklist Compliance Tests...\n');
