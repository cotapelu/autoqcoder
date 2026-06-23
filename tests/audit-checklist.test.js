const fs = require('fs');
const path = require('path');
const { test } = require('node:test');

test('SYSTEM AUDIT FRAMEWORK contains all 10 dimensions', () => {
  const filePath = path.join(__dirname, '..', 'AGENTS.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const sectionStart = content.indexOf('## 8. SYSTEM AUDIT FRAMEWORK');
  if (sectionStart === -1) {
    throw new Error('SYSTEM AUDIT FRAMEWORK section not found');
  }
  // Find the next top-level heading ("## ") that appears after the section start
  const nextSection = content.indexOf('\n## ', sectionStart + 1);
  const section = content.slice(sectionStart, nextSection === -1 ? undefined : nextSection);

  // Count lines that start with digit followed by period and space (numbered list items)
  const lines = section.split('\n');
  const numberedCount = lines.filter(line => /^[0-9]+\. /.test(line)).length;
  if (numberedCount < 10) {
    throw new Error(`Expected at least 10 audit dimensions, found ${numberedCount}`);
  }
});

test('Audit report template is present', () => {
  const filePath = path.join(__dirname, '..', 'AGENTS.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  const required = [
    'Executive Summary',
    'Detailed Findings',
    'Severity',
    'Exploit',
    'Impact',
    'Fix',
    'Test Case',
    'Priority',
    'Compliance Check',
    'Observability Gaps',
    'Recommendations',
    'Sign-off'
  ];
  for (const item of required) {
    if (!content.includes(item)) {
      throw new Error(`Missing audit template element: ${item}`);
    }
  }
});

test('Fix priority matrix (P0-P3) is documented', () => {
  const filePath = path.join(__dirname, '..', 'AGENTS.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  // Check for P0, P1, P2, P3 mentions in priority context
  if (!/P0.*P1.*P2.*P3/s.test(content)) {
    // Maybe separate lines; check each exists
    ['P0', 'P1', 'P2', 'P3'].forEach(p => {
      if (!content.includes(p)) {
        throw new Error(`Missing priority level: ${p}`);
      }
    });
  }
});
