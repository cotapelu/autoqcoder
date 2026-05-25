# AutoQCoder VS Code Extension

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/autoqcoder.autoqcoder.svg)](https://marketplace.visualstudio.com/items?itemName=autoqcoder.autoqcoder)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/v2.0.0-production--ready-brightgreen.svg)](https://github.com/autoqcoder/autoqcoder/releases)

**Integrate AutoQCoder v2.0 into your VS Code workflow - production-ready code generation with mental testing and self-evolution.**

---

## ✨ Features

### 🎯 Core Validation
- **On-demand validation** of AGENTS.md and AUTO-CONTINUE.md
- **Self-score calculation** with detailed breakdown
- **Issue detection** with error/warning/info levels
- **Quick fixes** suggestions (auto-fix coming in v2.1)

### 🧠 Mental Testing Assistant
- **Interactive mental test prompts** for different languages
- **Scenario coverage** checklist
- **Flow coverage** validation (UI↔DB)
- **Edge case** reminders

### 📊 Metrics Dashboard
- **Real-time metrics** display in status bar
- **Self-score** monitoring
- **Compliance tracking** (functions ≤20, complexity ≤10, etc.)
- **Evolution progress** (rounds completed)

### 🔄 Evolution Management
- **Quick command** to update evolution files
- **Reminder notifications** when evolution files outdated
- **Git commit** helper for evolution rounds

---

## 🚀 Installation

### From VS Code Marketplace (Recommended)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "AutoQCoder"
4. Click Install

### From Source (Development)
```bash
cd extensions/vscode
npm install
npm run compile
# Then package and install from .vsix file
```

---

## 📖 Usage

### Validate a File

1. Open `AGENTS.md` or `AUTO-CONTINUE.md` in editor
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
3. Type "AutoQCoder: Validate Current File"
4. See results in notification and output channel

**Keyboard Shortcut** (optional, configure in keybindings):
```json
{
  "key": "ctrl+shift+v",
  "command": "autoqcoder.validate"
}
```

### Run Mental Tests

1. Open any code file (JS/TS/Python/Go/Rust)
2. `Ctrl+Shift+P` → "AutoQCoder: Run Mental Test"
3. Select a mental test prompt from list
4. Answer mentally based on your code
5. Mark as complete or fix issues

### Show Metrics

1. `Ctrl+Shift+P` → "AutoQCoder: Show Project Metrics"
2. View current self-score and compliance in popup

**Status Bar Integration:**
- Shows current self-score in status bar (right side)
- Click to open metrics details

### Update Evolution Files

1. Complete a vòng loop (implementation + mental test)
2. `Ctrl+Shift+P` → "AutoQCoder: Update Evolution Files"
3. Extension will update:
   - `docs/AGENT_METRICS.md` (with actual numbers)
   - `docs/AGENT_PROFILE.md` (new weaknesses?)
   - `docs/EVOLUTION.md` (trajectory changes)

**Auto-commit helper** (coming in v2.1):
```bash
git add -A
git commit -m "chore: evolution round - <description>"
```

---

## ⚙️ Configuration

Add to your workspace `settings.json`:

```json
{
  "autoqcoder.selfScoreTarget": 90,
  "autoqcoder.autoFix": true,
  "autoqcoder.showNotifications": true,
  "autoqcoder.validateOnSave": false,
  "autoqcoder.pathToAGENTS": "${workspaceRoot}/AGENTS.md",
  "autoqcoder.pathToAUTO_CONTINUE": "${workspaceRoot}/AUTO-CONTINUE.md"
}
```

### Settings Explained

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `autoqcoder.selfScoreTarget` | number | 90 | Minimum acceptable self-score (0-100) |
| `autoqcoder.autoFix` | boolean | true | Enable automatic fix suggestions |
| `autoqcoder.showNotifications` | boolean | true | Show desktop notifications |
| `autoqcoder.validateOnSave` | boolean | false | Auto-validate AGENTS.md/AUTO-CONTINUE.md on save |
| `autoqcoder.pathToAGENTS` | string | `${workspaceRoot}/AGENTS.md` | Custom path to AGENTS.md |
| `autoqcoder.pathToAUTO_CONTINUE` | string | `${workspaceRoot}/AUTO-CONTINUE.md` | Custom path to AUTO-CONTINUE.md |

---

## 🎯 Validation Rules

The extension validates against autoqcoder v2.0 standards:

### AGENTS.md Requirements
- ✅ Core Quality Gate section present
- ✅ Production Standards (8 categories)
- ✅ Self-Evolution & Production Readiness
- ✅ Mandatory Principles (code preservation, mental testing, etc.)
- ✅ Concurrency analysis template
- ✅ Debugging & Issue Resolution checklist
- ✅ Frontend Architecture (Atomic Design)
- ✅ Mental Testing Mode described
- ✅ File size <250 lines (warning if >250)

### AUTO-CONTINUE.md Requirements
- ✅ Workflow (Analyze → Plan → Implement → Verify)
- ✅ Evolution & Self-Improvement section
- ✅ Git Commit Requirement
- ✅ Mental Testing Mode
- ✅ Code Preservation Rule
- ✅ Change Cost & Risk Assessment
- ✅ Missing Code = Write More
- ✅ Skill Integration (6+ skills referenced)
- ✅ Debugging Checklist
- ✅ Quick Reference
- ✅ File size <250 lines

---

## 📊 Metrics Tracked

| Metric | Description | Target |
|--------|-------------|--------|
| **Self-Score** | Overall quality score (0-100) | ≥90 |
| **Functions ≤20** | % functions meeting size requirement | 100% |
| **Complexity ≤10** | % functions meeting complexity requirement | 100% |
| **Error Handling** | % code with proper error handling | 100% |
| **Mental Coverage** | % scenarios covered by mental tests | ≥100% |
| **Code Deletions** | Count of code deletions (violations) | 0 |
| **Evolution Rounds** | Number of vòng loops completed | Ongoing |

---

## 🐛 Debugging & Troubleshooting

### Extension not activating?
1. Check that AGENTS.md or AUTO-CONTINUE.md exists in workspace root
2. Open Command Palette → "Developer: Reload Window"
3. Check Output panel → "AutoQCoder" channel for logs

### Validation not working?
1. Ensure file is markdown (.md)
2. Check that file path matches configured paths in settings
3. Verify file encoding is UTF-8

### Metrics not showing?
1. Ensure `docs/AGENT_METRICS.md` exists
2. Check file format is correct (YAML frontmatter or markdown table)
3. Reload VS Code window

### Performance issues?
Disable `autoqcoder.validateOnSave` if you have large files.

---

## 🛠️ Development

### Build from Source

```bash
cd extensions/vscode
npm install
npm run compile
```

### Run Tests

```bash
npm test
```

### Package for Distribution

```bash
npm install -g vsce
vsce package
# Generates autoqcoder-2.0.0.vsix
```

Then install in VS Code:
1. Extensions view → ... → Install from VSIX
2. Select the generated .vsix file

---

## 📚 Roadmap (v2.1+)

- [ ] **Auto-fix** - Automatic issue correction
- [ ] **AI-powered suggestions** - Context-aware improvements
- [ ] **PR integration** - Auto-review GitHub PRs
- [ ] **Team dashboard** - Collaboration metrics
- [ ] **Custom rules** - Project-specific quality gates
- [ ] **Performance profiling** - Integrated benchmarks
- [ ] **Language servers** - LSP for real-time feedback
- [ ] **Mobile skills** - Swift, Kotlin, Flutter definitions
- [ ] **More integrations** - JetBrains IDEs, Neovim, Emacs

See [EVOLUTION.md](../docs/EVOLUTION.md) for full roadmap.

---

## 🔗 Resources

- **Documentation:** [README.md](../README.md)
- **Migration Guide:** [MIGRATION_GUIDE.md](../MIGRATION_GUIDE.md)
- **Quick Reference:** [QUICK_REFERENCE_CARD.md](../QUICK_REFERENCE_CARD.md)
- **FAQ:** [FAQ.md](../FAQ.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)
- **Security:** [SECURITY.md](../SECURITY.md)
- **Contributing:** [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 📄 License

MIT - same as autoqcoder core. See [LICENSE](../LICENSE).

---

## 🙏 Acknowledgments

- VS Code team for excellent extension API
- AutoQCoder core team
- All contributors

---

**Ready to ship production-ready code from within VS Code?** 🚀

**Version:** 2.0.0  
**Updated:** 2025-05-25  
**Publisher:** autoqcoder
