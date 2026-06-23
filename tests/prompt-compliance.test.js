const { execSync } = require('child_process');
const path = require('path');
const { test } = require('node:test');

test('self-score passes (exit code 0, score ≥ 90)', () => {
  const scriptPath = path.join(__dirname, '..', 'scripts', 'calculate-self-score.js');
  // Run the self-score script; it should exit with code 0 if score ≥ 90
  try {
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });
  } catch (err) {
    throw new Error(`Self-score failed: ${err.message}`);
  }
});
