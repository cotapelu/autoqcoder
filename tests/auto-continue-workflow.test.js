const fs = require('fs');
const path = require('path');
const { test } = require('node:test');

test('AUTO-CONTINUE workflow contains all mandatory steps', () => {
  const filePath = path.join(__dirname, '..', 'AUTO-CONTINUE.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Required workflow steps from AUTO-CONTINUE.md
  const requiredSteps = [
    'Analyze',
    'Clarify',
    'Plan',
    'Test', // covers "Test(fail)"
    'Implement',
    'Refactor',
    'Optimize',
    'Audit',
    'Verify'
  ];

  for (const step of requiredSteps) {
    if (!content.includes(step)) {
      throw new Error(`Workflow missing required step: ${step}`);
    }
  }
});
