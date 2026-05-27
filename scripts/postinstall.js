#!/usr/bin/env node

/**
 * Postinstall script for autoqcoder
 * Copies AGENTS.md and AUTO-CONTINUE.md to project root after npm install
 */

const fs = require('fs');
const path = require('path');

// Source files (from package)
const packageRoot = path.join(__dirname, '..');
const agentsSrc = path.join(packageRoot, 'AGENTS.md');
const autoContinueSrc = path.join(packageRoot, 'AUTO-CONTINUE.md');

// Destination (project root - THREE levels up from scripts/)
// __dirname = node_modules/autoqcoder/scripts
// .. = node_modules/autoqcoder
// .. = node_modules
// .. = project root
const projectRoot = path.join(__dirname, '..', '..', '..');

function copyFile(src, dest, filename) {
  try {
    if (!fs.existsSync(src)) {
      console.error(`❌ Source file not found: ${src}`);
      return false;
    }

    const destPath = path.join(dest, filename);

    // Check if destination already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  ${filename} already exists in project root. Skipping.`);
      return true;
    }

    fs.copyFileSync(src, destPath);
    console.log(`✅ Copied ${filename} to project root`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to copy ${filename}:`, err.message);
    return false;
  }
}

console.log('\n📦 autoqcoder postinstall: Copying agent files to project root...\n');

const ok1 = copyFile(agentsSrc, projectRoot, 'AGENTS.md');
const ok2 = copyFile(autoContinueSrc, projectRoot, 'AUTO-CONTINUE.md');

if (ok1 && ok2) {
  console.log('\n✅ autoqcoder installed successfully!');
  console.log('   AGENTS.md and AUTO-CONTINUE.md are now in your project root.');
  console.log('   Start coding with: code AGENTS.md\n');
} else {
  console.log('\n⚠️  Some files could not be copied. See errors above.');
  console.log('   You can manually copy AGENTS.md and AUTO-CONTINUE.md from node_modules/autoqcoder/\n');
  process.exit(1);
}
