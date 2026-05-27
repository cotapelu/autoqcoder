#!/usr/bin/env node

/**
 * autoqcoder CLI
 * Usage: npx autoqcoder [command]
 */

const fs = require('fs');
const path = require('path');

const commands = {
  copy: () => {
    console.log('\n📦 Copying AGENTS.md and AUTO-CONTINUE.md to current directory...\n');

    // Find package root (look for AGENTS.md in node_modules/autoqcoder)
    const packagePath = require.resolve('autoqcoder/package.json');
    const packageRoot = path.dirname(packagePath);

    const srcAgents = path.join(packageRoot, 'AGENTS.md');
    const srcAuto = path.join(packageRoot, 'AUTO-CONTINUE.md');
    const destDir = process.cwd();

    let ok = true;

    // Copy AGENTS.md
    if (fs.existsSync(srcAgents)) {
      const dest = path.join(destDir, 'AGENTS.md');
      if (fs.existsSync(dest)) {
        console.log('⏭️  AGENTS.md already exists. Skipping.');
      } else {
        fs.copyFileSync(srcAgents, dest);
        console.log('✅ AGENTS.md copied to project root');
      }
    } else {
      console.error('❌ Could not find AGENTS.md in autoqcoder package');
      ok = false;
    }

    // Copy AUTO-CONTINUE.md
    if (fs.existsSync(srcAuto)) {
      const dest = path.join(destDir, 'AUTO-CONTINUE.md');
      if (fs.existsSync(dest)) {
        console.log('⏭️  AUTO-CONTINUE.md already exists. Skipping.');
      } else {
        fs.copyFileSync(srcAuto, dest);
        console.log('✅ AUTO-CONTINUE.md copied to project root');
      }
    } else {
      console.error('❌ Could not find AUTO-CONTINUE.md in autoqcoder package');
      ok = false;
    }

    if (ok) {
      console.log('\n✅ Done! Start coding with AGENTS.md\n');
    } else {
      console.log('\n⚠️  Some files missing. You can manually copy from node_modules/autoqcoder/\n');
      process.exit(1);
    }
  },

  version: () => {
    const pkg = require('./package.json');
    console.log(`autoqcoder v${pkg.version}`);
  },

  help: () => {
    console.log(`
autoqcoder CLI - AI coding agent prompt engine

Commands:
  copy          Copy AGENTS.md and AUTO-CONTINUE.md to current directory
  version       Show version
  help          Show this help

Examples:
  npx autoqcoder copy    # Copy agent files after install
  npx autoqcoder version # Check version

Note: After copying, read AGENTS.md to start coding.
`);
  }
};

// Parse command
const [,, cmd] = process.argv;

if (cmd && commands[cmd]) {
  commands[cmd]();
} else {
  commands.help();
}
