# Fit-Flex CI/CD Quick Start

## 🚀 One-Minute Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Verify Everything Works
```bash
pnpm lint      # ✅ Linting
pnpm build     # ✅ Build
```

That's it! You're ready to develop.

## 📋 Development Workflow

### Create a feature branch
```bash
git checkout -b feat/your-feature
```

### Make your changes
```bash
pnpm dev      # Start development server
```

### Before committing, run checks locally
```bash
pnpm lint               # Check code style
pnpm lint -- --fix      # Auto-fix issues
pnpm build              # Verify build works
```

### Commit and push
```bash
git add .
git commit -m "feat: add new component"
git push origin feat/your-feature
```

### Create a Pull Request
- Go to GitHub
- You'll see a "Compare & pull request" button
- Fill in PR details
- CI will automatically run

## 🔄 CI Pipeline Status

After pushing, check your PR:
- You'll see 4 parallel jobs running
- Each takes 30 seconds to 2 minutes
- All must pass (except warnings) before merge

### Expected timeline:
- Lint: ~30-40 seconds
- Build (2x Node versions): ~1-2 minutes
- Security: ~30-40 seconds
- Status check: ~10 seconds
- **Total: 2-3 minutes**

## ✅ Passing CI Checklist

Before your PR is approved, ensure:
- [ ] ESLint passes (no red X on "Lint & Code Quality")
- [ ] Build succeeds on both Node 18 and 20 (green X on "Build & Test")
- [ ] Security check passes (no critical vulnerabilities)
- [ ] No merge conflicts
- [ ] PR has descriptive title and description

## ❌ CI Failed? Quick Fixes

### ESLint failed?
```bash
pnpm lint -- --fix
git add .
git commit -m "fix: lint errors"
git push
```

### Build failed?
```bash
# Clear and rebuild
rm -r dist
pnpm install --frozen-lockfile
pnpm build
```

### Security warning?
```bash
# Check vulnerable packages
pnpm audit
# Update packages
pnpm update
```

## 🛠️ Available Commands

```bash
# Development
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Build for production
pnpm preview      # Preview production build locally

# Quality
pnpm lint         # Check code style
pnpm lint --fix   # Auto-fix code style issues

# CI-related
pnpm install                     # Install exact dependencies
pnpm install --frozen-lockfile   # Install with lock file (CI uses this)
pnpm audit                       # Check security vulnerabilities
```

## 📚 Files to Know

| File | Purpose |
|------|---------|
| `.github/workflows/node.js.yml` | CI pipeline configuration |
| `package.json` | Dependencies & scripts |
| `eslint.config.js` | Code style rules |
| `vite.config.js` | Build configuration |
| `CI-CD-GUIDE.md` | Full CI documentation |

## 🆘 Need Help?

1. **CI docs:** Read [CI-CD-GUIDE.md](../CI-CD-GUIDE.md)
2. **Branch protection:** Check [.github/BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md)
3. **GitHub Actions logs:** Go to repo → Actions tab → Click failing workflow
4. **Common issues:** [CI-CD-GUIDE.md#common-ci-failures--solutions](../CI-CD-GUIDE.md#common-ci-failures--solutions)

## 🎯 Best Practices

✅ **DO:**
- Run `pnpm lint -- --fix` before pushing
- Push frequently (small commits)
- Use descriptive branch names
- Keep PRs focused and reviewable

❌ **DON'T:**
- Use `npm install` (use `pnpm install`)
- Force push to main or develop
- Ignore CI failures
- Commit node_modules

## 🚨 Protected Branches

| Branch | Protection Level | Merge Requirements |
|--------|------------------|-------------------|
| `main` | **Strict** | ✅ CI passes, ✅ Review approved, ✅ Up to date |
| `develop` | **Standard** | ✅ CI passes, ✅ Up to date |

Always create PRs instead of direct pushes to these branches.

---

**Questions?** Check the full [CI-CD-GUIDE.md](../CI-CD-GUIDE.md) or GitHub Actions logs.
