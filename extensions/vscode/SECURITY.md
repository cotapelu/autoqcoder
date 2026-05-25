# Security Policy - AutoQCoder VS Code Extension

**Supported Versions:** 2.0.x (current)

## Reporting a Vulnerability

**DO NOT** open public GitHub issues for security vulnerabilities in the extension.

**Email:** security@autoqcoder.dev (PGP encrypted: [key](https://autoqcoder.dev/pgp-key.asc))

**Response Time:**
- Critical (RCE, data exfiltration): < 4 hours
- High (privilege escalation, DoS): < 24 hours
- Medium (XSS, CSRF, info disclosure): < 48 hours
- Low (documentation, best practices): < 7 days

---

## Security Considerations

### Data Collection

The AutoQCoder VS Code extension collects **minimal data**:

**Collected:**
- File paths (for validation)
- Settings (user preferences)
- Metrics (self-score, validation results)

**NOT Collected:**
- No code content (only file paths and validation results)
- No user identifiers
- No telemetry to external servers (all processing local)

### Local-Only Processing

All validation and mental testing happens **locally** in your VS Code instance. No network calls are made by the extension.

### Permissions Required

The extension requests these VS Code permissions:
- `workspace` - To read AGENTS.md and AUTO-CONTINUE.md from project
- `configuration` - To read/write user settings
- `statusBar` - To show metrics in status bar
- `notifications` - To show validation results
- `commands` - To register commands

**No** file system write access beyond user configuration.

---

## Best Practices for Users

1. **Review permissions** before installing any VS Code extension
2. **Keep VS Code updated** (security patches)
3. **Use from trusted source** - only install from official marketplace
4. **Review source code** - open source under MIT license
5. **Report suspicious behavior** to security@autoqcoder.dev

---

## Known Issues

### None at release

No security issues known at time of v2.0.0 release.

---

## Updates & Patches

- Critical security updates will be published within 48 hours of vulnerability discovery
- Users are encouraged to update to latest version via VS Code marketplace
- npm package (`autoqcoder`) includes same security fixes

---

## Related Security Policies

- **Core Engine:** See [../SECURITY.md](../SECURITY.md)
- **npm Package:** See [npm advisory](https://www.npmjs.com/advisories?bull=autoqcoder)

---

**Last Updated:** 2025-05-25  
**Version:** 2.0.0
