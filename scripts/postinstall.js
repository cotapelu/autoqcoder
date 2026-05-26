const fs = require('fs');
const path = require('path');

const pkgRoot = path.resolve(__dirname, '..');
const targetDir = process.cwd();

const files = ['AGENTS.md', 'AUTO-CONTINUE.md'];

files.forEach(file => {
  const src = path.join(pkgRoot, file);
  const dest = path.join(targetDir, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file} to ${targetDir}`);
  } else {
    console.warn(`⚠️  Source file not found: ${src}`);
  }
});
