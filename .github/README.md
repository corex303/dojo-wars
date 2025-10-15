# GitHub Actions CI/CD

This directory contains all GitHub Actions workflows and templates for Dojo Wars.

## 🔄 Workflows

### 1. Backend CI (`backend-ci.yml`)

**Triggers**: Push/PR to `main` or `develop` with backend changes

**Jobs**:
- **Lint**: Code formatting (rustfmt) and Clippy checks
- **Build**: Compile all BOLT programs
- **Test**: Run unit tests for components and systems
- **Security**: Cargo audit for vulnerabilities

**Artifacts**: Compiled `.so` files and IDL JSON files

### 2. Frontend CI (`frontend-ci.yml`)

**Triggers**: Push/PR to `main` or `develop` with frontend changes

**Jobs**:
- **Lint**: ESLint checks
- **Type Check**: TypeScript compilation without emit
- **Build**: Production build with Vite
- **Test**: Run test suite (when added)
- **Bundle Analysis**: Report on bundle size

**Artifacts**: Built `dist/` directory

### 3. PR Checks (`pr-checks.yml`)

**Triggers**: All pull requests

**Jobs**:
- **Change Detection**: Identify which parts of the codebase changed
- **Conditional Checks**: Only run relevant checks based on changes
- **Size Analysis**: Bundle size comparison
- **Markdown Links**: Validate documentation links

**Features**:
- Smart change detection (only test what changed)
- Summary reports in PR
- Fast feedback loop

### 4. Deploy to Devnet (`deploy-devnet.yml`)

**Triggers**: Manual workflow dispatch

**Inputs**:
- `deploy_backend`: Deploy BOLT programs (true/false)
- `deploy_frontend`: Deploy to Vercel (true/false)

**Jobs**:
- **Backend**: Build and deploy programs to Solana devnet
- **Frontend**: Build and deploy to Vercel

**Requirements** (set as secrets):
- `SOLANA_DEPLOYER_KEY`: Solana wallet private key
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `DOJO_WARS_PROGRAM_ID`: Deployed program ID

### 5. Release (`release.yml`)

**Triggers**: Push tags matching `v*.*.*` (e.g., `v0.1.0`)

**Jobs**:
- **Create Release**: Generate GitHub release
- **Build Backend**: Compile and package programs
- **Build Frontend**: Create production build
- **Upload Artifacts**: Attach builds to release

**To Create a Release**:
```bash
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

## 🤖 Dependabot

Automated dependency updates for:
- **Backend**: Cargo dependencies (weekly, Mondays)
- **Frontend**: npm dependencies (weekly, Mondays)
- **GitHub Actions**: Workflow dependencies (weekly, Mondays)

Updates are grouped intelligently:
- Solana packages together
- React packages together
- Dev dependencies together

## 📝 Issue Templates

### Bug Report (`bug_report.md`)
For reporting bugs with:
- Clear description
- Reproduction steps
- Environment details
- Screenshots/logs

### Feature Request (`feature_request.md`)
For suggesting features with:
- Motivation and use case
- Technical considerations
- User stories
- Acceptance criteria

## 📋 Pull Request Template

Standardized PR format including:
- Description and type of change
- Testing checklist
- Related issues
- Deployment notes

## 🔧 Configuration Files

### `markdown-link-check-config.json`
- Validates links in documentation
- Ignores localhost and placeholder URLs
- Configures retry logic for reliability

## 🚀 Usage Examples

### Running CI Locally

**Backend checks**:
```bash
cd backend
cargo fmt --check
cargo clippy -- -D warnings
cargo test
```

**Frontend checks**:
```bash
cd frontend
npm run lint
npx tsc --noEmit
npm run build
```

### Deploying to Devnet

1. Go to **Actions** tab on GitHub
2. Select **Deploy to Devnet** workflow
3. Click **Run workflow**
4. Choose what to deploy:
   - ✅ Backend (BOLT programs)
   - ✅ Frontend (Vercel)
5. Click **Run workflow**

### Creating a Release

```bash
# Create and push tag
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0

# GitHub Actions will automatically:
# 1. Create GitHub release
# 2. Build backend artifacts
# 3. Build frontend artifacts
# 4. Attach files to release
```

## 📊 Workflow Status Badges

Add to README.md:

```markdown
![Backend CI](https://github.com/corex303/dojo-wars/workflows/Backend%20CI/badge.svg)
![Frontend CI](https://github.com/corex303/dojo-wars/workflows/Frontend%20CI/badge.svg)
```

## 🔐 Required Secrets

Set these in **Settings → Secrets and variables → Actions**:

### For Deployment
- `SOLANA_DEPLOYER_KEY`: Base58 encoded Solana keypair
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Found in Vercel project settings
- `VERCEL_PROJECT_ID`: Found in Vercel project settings
- `DOJO_WARS_PROGRAM_ID`: Main program ID after first deployment

### Getting Solana Keypair
```bash
# Generate new keypair
solana-keygen new -o deployer.json

# Fund with devnet SOL
solana airdrop 2 $(solana address -k deployer.json) --url devnet

# Base58 encode for GitHub secret
cat deployer.json | jq -r '. | @base64'
```

## 🎯 Workflow Triggers Summary

| Workflow | Push to main | PR | Tag | Manual |
|----------|--------------|-----|-----|--------|
| Backend CI | ✅ | ✅ | ❌ | ❌ |
| Frontend CI | ✅ | ✅ | ❌ | ❌ |
| PR Checks | ❌ | ✅ | ❌ | ❌ |
| Deploy Devnet | ❌ | ❌ | ❌ | ✅ |
| Release | ❌ | ❌ | ✅ | ❌ |

## 📈 Performance Optimization

Workflows use caching for:
- ✅ Cargo dependencies and build artifacts
- ✅ Solana tools and validators
- ✅ npm packages
- ✅ TypeScript compilation

**Average build times**:
- Backend CI: ~5-10 minutes (first run)
- Backend CI: ~2-3 minutes (cached)
- Frontend CI: ~3-5 minutes (first run)
- Frontend CI: ~1-2 minutes (cached)

## 🐛 Troubleshooting

### "Program not found" in deployment
- Ensure `SOLANA_DEPLOYER_KEY` secret is set
- Verify deployer has sufficient SOL balance
- Check Anchor.toml program IDs match

### Workflow fails on cache
- Re-run workflow (cache may be corrupted)
- Clear GitHub Actions cache in repo settings

### Frontend build fails
- Check environment variables are set
- Verify all npm dependencies are in package.json
- Ensure TypeScript compiles locally

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Solana CI/CD Best Practices](https://docs.solana.com/developers)
- [BOLT Framework](https://github.com/magicblock-labs/bolt)
- [Vercel Deployment](https://vercel.com/docs)

---

**Questions?** Open an issue or check the [main documentation](../README.md).

