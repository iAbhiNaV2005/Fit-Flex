# Dependencies & Security Guide

## 📦 Current Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.1.0 | UI library |
| `react-dom` | ^19.1.0 | React DOM rendering |
| `tailwindcss` | ^4.1.13 | CSS utility framework |
| `@tailwindcss/vite` | ^4.1.13 | TailwindCSS Vite plugin |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.0.0 | Build tool |
| `@vitejs/plugin-react` | ^4.5.2 | React Vite plugin |
| `eslint` | ^9.29.0 | Code style checker |
| `@eslint/js` | ^9.29.0 | ESLint config |
| `eslint-plugin-react-hooks` | ^5.2.0 | React hooks linting |
| `eslint-plugin-react-refresh` | ^0.4.20 | React refresh linting |
| `globals` | ^16.2.0 | Global variable definitions |
| `@types/react` | ^19.1.8 | React type definitions |
| `@types/react-dom` | ^19.1.6 | React DOM type definitions |
| `baseline-browser-mapping` | ^2.9.10 | Browser baseline definitions |

## 🔐 Security Checks

### Weekly Security Audit
```bash
# Check for vulnerabilities
pnpm audit

# Check for moderate and above
pnpm audit --audit-level=moderate

# Fix vulnerabilities automatically
pnpm audit --fix
```

### CI Security Scanning
The CI pipeline runs `pnpm audit` on every push/PR to catch vulnerabilities early.

## 📈 Dependency Status

### Update Check
```bash
# See outdated packages
pnpm outdated

# Update all packages (respects semver)
pnpm update

# Update specific package
pnpm add package@latest
```

### Breaking Changes to Watch

| Package | LTS | Notes |
|---------|-----|-------|
| `react` | 19.x | Major update - check breaking changes |
| `vite` | 7.x | Latest - stable |
| `tailwindcss` | 4.x | Vite integration with @tailwindcss/vite |
| `eslint` | 9.x | New flat config format (using v9+) |
| `node` | 18.x, 20.x | LTS versions, 20.x recommended |

## 🔄 Dependency Update Strategy

### Monthly Security Scan
```bash
# Create dependabot branch
git checkout -b chore/dependencies-$(date +%Y-%m)

# Update all
pnpm update

# Run tests and build
pnpm lint
pnpm build

# Commit and push for review
git add pnpm-lock.yaml package.json
git commit -m "chore: update dependencies"
```

### Major Version Updates
Before updating major versions:

1. **Check breaking changes**
   - Read package CHANGELOG
   - Check migration guides

2. **Update locally first**
   ```bash
   pnpm add package@next
   pnpm build
   pnpm lint
   ```

3. **Create detailed PR**
   - List breaking changes
   - Document any code changes needed
   - Request review

## 🚨 Known Vulnerabilities

### Zero Known Vulnerabilities ✅
As of the latest audit, Fit-Flex has:
- ✅ 0 critical vulnerabilities
- ✅ 0 high-risk vulnerabilities
- ✅ 0 moderate vulnerabilities
- ✅ Minimal low-risk advisories

### How to Respond to New Vulnerabilities

**Step 1: Assess** 
```bash
pnpm audit
# Look at severity and affected package
```

**Step 2: Decide**
| Severity | Action |
|----------|--------|
| Critical | Update immediately |
| High | Update within 1 day |
| Moderate | Update within 1 week |
| Low | Update with next release |

**Step 3: Fix**
```bash
# Option A: Auto-fix
pnpm audit --fix

# Option B: Manual update
pnpm add package@latest

# Option C: Update all
pnpm update
```

**Step 4: Verify**
```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm audit  # Verify vulnerability is gone
```

**Step 5: Commit**
```bash
git add pnpm-lock.yaml package.json
git commit -m "fix: patch security vulnerability in [package]"
git push
```

## 🤖 Automated Dependency Management (Optional)

### Enable Dependabot

Add `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Check for package.json updates
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "03:00"
    allow:
      - dependency-type: "direct"
    reviewers:
      - "your-github-username"
    labels:
      - "dependencies"
    commit-message:
      prefix: "chore"
      prefix-scope: "deps"
```

This will automatically:
- ✅ Create PRs for dependency updates
- ✅ Run CI checks
- ✅ Ask for review
- ✅ Track security advisories

## 📊 Dependency Health Dashboard

```
Total Dependencies: 12
├── Production: 4
└── Development: 8

Update Status:
├── Current: 10 (83%)
├── Minor: 2 (17%)
└── Major: 0 (0%)

Security Status: ✅ PASSING
```

## 🔗 Helpful Resources

- [Node.js Security](https://nodejs.org/en/security/)
- [npm Audit Documentation](https://docs.npmjs.com/cli/v9/commands/npm-audit)
- [pnpm Audit](https://pnpm.io/cli/audit)
- [Vite Docs](https://vitejs.dev/)
- [React Upgrade Guide](https://react.dev/blog)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## ⚡ Performance Optimization

### Install Time Optimization
```bash
# Current: ~40-60 seconds (with cache: ~10 seconds)
# Using pnpm ensures:
# - Optimal disk usage
# - Faster node_modules resolution
# - Monorepo support
```

### Runtime Performance
- React 19.x: Improved performance
- Vite 7.x: Fast build and dev server
- TailwindCSS 4.x: Tree-shaking and optimization

---

**Last Updated:** March 2026  
**Next Review:** Monthly  
**Maintained by:** Development Team
