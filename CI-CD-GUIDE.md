# CI/CD Pipeline Guide for Fit-Flex

## Overview

The Fit-Flex project implements an **industry-standard CI/CD pipeline** that automatically validates code quality, security, and build integrity on every push and pull request. This ensures consistent code standards and catches issues early in the development cycle.

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────┐
│         Code Push / Pull Request                     │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
    ┌────────┐  ┌────────┐  ┌────────────┐
    │  Lint  │  │ Build  │  │  Security  │
    │ Tests  │  │ Tests  │  │   Checks   │
    └───┬────┘  └───┬────┘  └─────┬──────┘
        │           │             │
        └───────────┼─────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  Status Check (All)  │
         └──────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
     ✅ Success           ❌ Failure
   (Can Merge)       (Block Merge)
```

## Jobs Overview

### 1. **Lint & Code Quality** 🔍
- **Runs on:** Ubuntu latest, Node 20.x
- **Purpose:** Enforces code style and best practices
- **Commands:**
  - `pnpm install --frozen-lockfile` - Install exact dependencies
  - `pnpm lint` - Run ESLint
- **Output:** Code quality findings, potential issues
- **Continues on error:** Yes (warnings don't block)

### 2. **Build & Test** 🏗️
- **Runs on:** Ubuntu latest, Node 18.x and 20.x (multi-version)
- **Purpose:** Verify the application builds successfully
- **Commands:**
  - `pnpm install --frozen-lockfile` - Install dependencies
  - `pnpm build` - Build with Vite
  - Verify dist folder exists
- **Output:** Production-ready build artifacts
- **Artifacts:** Uploaded for Node 20.x (retained for 5 days)

### 3. **Security Checks** 🔐
- **Runs on:** Ubuntu latest, Node 20.x
- **Purpose:** Detect vulnerable dependencies
- **Commands:**
  - `pnpm audit` - Check for known vulnerabilities
  - `pnpm list` - Display dependency tree
- **Threshold:** Moderate and above issues reported
- **Continues on error:** Yes (non-blocking warnings)

### 4. **Bundle Size Analysis** 📦
- **Runs on:** Ubuntu latest, Node 20.x
- **Purpose:** Monitor build output and dependencies
- **Commands:**
  - Full build process with analysis
- **Useful for:** Tracking performance over time

### 5. **Status Check** ✅
- **Runs on:** Ubuntu latest
- **Depends on:** All other jobs
- **Purpose:** Final approval gate
- **Behavior:**
  - Lint failures: ❌ Blocks merge
  - Build failures: ❌ Blocks merge
  - Security warnings: ⚠️ Displays warning only

## Triggers

The pipeline automatically runs on:

```yaml
- Push to main or develop branches
- Pull requests targeting main or develop
- Manual workflow dispatch (Actions tab)
```

## Concurrency Control

Only one workflow runs per branch/PR at a time. Previous runs are cancelled when new commits are pushed, saving CI resources.

## Package Manager: pnpm

This project uses **pnpm** for optimal dependency management:

```bash
# Install dependencies
pnpm install

# Install and freeze exact versions
pnpm install --frozen-lockfile

# Add a dependency
pnpm add <package>

# Add a dev dependency
pnpm add -D <package>

# Remove a dependency
pnpm remove <package>

# Update dependencies
pnpm update
```

**Benefits:**
- Faster installations (content-addressable storage)
- Lower disk usage
- Protection against phantom dependencies
- Stricter dependency resolution

## Local Development & Pre-CI Checks

Before pushing code, run these locally:

```bash
# Install dependencies
pnpm install

# Check linting
pnpm lint

# Fix linting issues
pnpm lint -- --fix

# Build locally
pnpm build

# Preview production build
pnpm preview

# Run in development mode
pnpm dev
```

## Common CI Failures & Solutions

### ❌ ESLint Failures
**Problem:** Code style violations detected
```bash
# Solution: Auto-fix linting issues
pnpm lint -- --fix
```

### ❌ Build Failures
**Problem:** Application won't compile
```bash
# Solution: Verify locally
pnpm clean  # If available
pnpm install --frozen-lockfile
pnpm build
```

### ❌ Dependency Vulnerabilities
**Problem:** pnpm audit detects security issues
```bash
# Solution: Update dependencies
pnpm update
# Or upgrade specific package
pnpm add package@latest
```

### ❌ Build Artifact Not Found
**Problem:** dist folder missing after build
```bash
# Solution: Ensure build completed
pnpm build
test -d dist && echo "Build OK" || echo "Build failed"
```

## Workflow Rules & Best Practices

| Rule | Requirement |
|------|-------------|
| **Npm vs pnpm** | Use `pnpm` exclusively |
| **Node Versions** | Test on 18.x and 20.x |
| **Branch Protection** | CI must pass before merge |
| **Commit Messages** | Clear, descriptive messages |
| **Code Style** | ESLint compliant |
| **Dependencies** | No critical vulnerabilities |

## GitHub Actions Configuration Details

### Node.js Setup
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'pnpm'
```

### Dependency Caching
Uses pnpm cache to speed up builds:
- First run: ~2-3 minutes (downloads dependencies)
- Cached runs: ~30-45 seconds (uses cache)

### Artifact Upload
Build artifacts (dist/) uploaded for 5 days:
- Useful for deployment
- Reduces rebuild time in release jobs
- Automatically cleaned after 5 days

## Future Enhancements

Recommended additions for production:

```yaml
# 1. Unit Tests
- name: Run Tests
  run: pnpm test

# 2. E2E Tests
- name: Run E2E Tests
  run: pnpm e2e

# 3. Code Coverage
- name: Coverage Report
  run: pnpm test:coverage

# 4. Performance Budgets
- name: Check Bundle Size
  run: pnpm build && bundlesize

# 5. Deployment
- name: Deploy to Staging
  if: success()
  run: ./deploy.sh staging

# 6. Lighthouse Performance Audit
- Measure web vitals
- Track performance regressions
```

## Monitoring & Debugging

### View Workflow Runs
1. Navigate to **GitHub** → **Actions tab**
2. Select the workflow from the list
3. Click on any run to see details

### Debug Failed Jobs
1. Click on the failed job
2. Expand the step that failed
3. Review error logs
4. See which command failed

### Local Reproduction
```bash
# Reproduce the exact CI environment locally
docker run -it node:20
cd /workspace
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Lint Duration | < 1 min | ✅ |
| Build Duration | < 2 min | ✅ |
| Security Scan | < 1 min | ✅ |
| Total Pipeline | < 5 min | ✅ |
| Cache Hit Rate | > 80% | ✅ |

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)
- [ESLint Configuration](https://eslint.org/docs/rules/)
- [pnpm Documentation](https://pnpm.io/motivation)
- [Node.js LTS Schedule](https://nodejs.org/en/about/releases/)

---

**Last Updated:** March 2026  
**Maintainer:** Development Team  
**Status:** ✅ Active and Monitored
