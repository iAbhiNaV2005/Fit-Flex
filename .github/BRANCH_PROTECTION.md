# GitHub Branch Protection & CI Configuration

## Recommended GitHub Settings

This guide helps you configure GitHub to enforce the CI/CD pipeline requirements.

### 1. Enable Branch Protection for `main`

Go to **Settings → Branches → Add rule**

```
Branch name pattern: main
```

**Enable these protections:**

✅ **Require a pull request before merging**
- Dismiss stale pull request approvals when new commits are pushed
- Require code reviews before merging (Recommended: 1 review)
- Require review from Code Owners (if using CODEOWNERS file)

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Required status checks:
  - `CI/CD Pipeline / Lint & Code Quality`
  - `CI/CD Pipeline / Build & Test`
  - `CI/CD Pipeline / Security Checks`
  - `CI/CD Pipeline / Status Check`

✅ **Require conversation resolution before merging**

✅ **Require signed commits**
- Recommended for security

✅ **Require branches to be up to date before merging**

### 2. Enable Branch Protection for `develop`

Go to **Settings → Branches → Add rule**

```
Branch name pattern: develop
```

**Enable these protections:**

✅ **Require a pull request before merging**
- Dismiss stale pull request approvals when new commits are pushed
- Require code reviews before merging (Recommended: 1 review)

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Required status checks (same as main)

### 3. Create CODEOWNERS File (Optional)

Create `.github/CODEOWNERS`:

```bash
# Default owners for the entire repository
* @your-username

# Frontend components
/src/ @your-username
/components/ @your-username

# Build configuration
/vite.config.js @your-username
/package.json @your-username
```

### 4. Configure GitHub Actions Permissions

Go to **Settings → Actions → General**

```
Workflow permissions:
- Read and write permissions
- Allow GitHub Actions to create and approve pull requests: YES
```

### 5. Enable Required Status Checks

Verify these checks appear in:

**Settings → Branches → [Branch] → Require status checks to pass before merging**

Required checks should match your workflow jobs:
- `CI/CD Pipeline / Lint & Code Quality`
- `CI/CD Pipeline / Build & Test`
- `CI/CD Pipeline / Security Checks`
- `CI/CD Pipeline / Status Check`

## Expected Workflow Behavior

### ✅ On Successful CI
- Green checkmark appears on PR
- "All checks have passed" message
- Merge button becomes enabled (if protected)

### ❌ On Failed CI
- Red X appears on PR
- "Some checks were not successful" message
- Merge button remains disabled
- Details button shows which job failed

### ⚠️ On Running CI
- Yellow indicator on PR
- "Some checks are still in progress"
- Merge button is disabled until complete

## Workflow Status Badges

Add this to your README.md to show CI status:

```markdown
![CI/CD Pipeline](https://github.com/YOUR-USERNAME/Fit-Flex/actions/workflows/node.js.yml/badge.svg?branch=main)
```

## Troubleshooting Branch Protection

### Issue: Status checks not appearing
**Solution:** 
1. Commit and push to trigger workflow
2. Wait for workflow to complete
3. Refresh GitHub page
4. Status should appear in branch protection settings

### Issue: Can't merge despite passing checks
**Solution:**
1. Verify you have merge permissions
2. Check if branch is up to date with main
3. Verify required reviewers have approved
4. Check for conflicts in code

### Issue: "Waiting for required checks"
**Solution:**
1. Workflow may still be running
2. Check Actions tab for status
3. If stuck, restart workflow from Actions tab

## Recommended Merge Strategy

```
# For main branch: Squash and Merge
- Keeps history clean
- All changes in single commit

# For develop branch: Create a Merge Commit
- Preserves feature branch history
- Clear commit trail
```

## Auto-merge Configuration (Optional)

Enable auto-merge for PRs that pass all checks:

1. Go to **Settings → General**
2. Enable "Allow auto-merge"
3. Choose preferred merge strategy

Then use:
```bash
gh pr merge --auto --squash <PR-NUMBER>
```

## Scheduled Workflow Optimization (Optional)

Add periodic security audits by modifying `.github/workflows/node.js.yml`:

```yaml
on:
  # ... existing triggers ...
  schedule:
    - cron: '0 0 * * MON'  # Run every Monday at midnight UTC
```

---

**Configuration Status:** Ready to implement  
**Maintenance:** Review monthly for updates
