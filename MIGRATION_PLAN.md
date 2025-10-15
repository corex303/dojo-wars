# 🎮 Dojo Wars - Migration & Implementation Plan

**Version**: 1.0  
**Last Updated**: 2025-01-15  
**Status**: 🟡 Phase 0 Complete - Ready for Phase 1

---

## 📊 Overall Progress Tracker

| Phase | Status | Progress | Start Date | End Date |
|-------|--------|----------|------------|----------|
| **Phase 0: Foundation** | ✅ Complete | 100% | 2025-01-15 | 2025-01-15 |
| **Phase 1: Deployment & Integration** | 🔵 Ready | 0% | TBD | TBD |
| **Phase 2: SDK Integration** | ⚪ Pending | 0% | TBD | TBD |
| **Phase 3: Enhanced Features** | ⚪ Pending | 0% | TBD | TBD |
| **Phase 4: Social Systems** | ⚪ Pending | 0% | TBD | TBD |
| **Phase 5: Polish & Launch** | ⚪ Pending | 0% | TBD | TBD |

**Legend**: ✅ Complete | 🔵 In Progress | 🟡 Ready | ⚪ Pending

---

## 🎯 Quick Reference

### Current State
- **Total Files**: 82 files, ~7,227 lines of code
- **Backend Status**: ✅ Complete (BOLT programs ready)
- **Frontend Status**: ✅ Complete (React + Phaser ready)
- **CI/CD Status**: ✅ Complete (GitHub Actions ready)
- **Documentation**: ✅ Complete (6 guides)
- **Git Status**: ✅ 3 commits ready to push

### Next Immediate Action
1. Create GitHub repository at https://github.com/new
2. Push code: `git push -u origin main`
3. Install BOLT CLI: `npm install -g @magicblock-labs/bolt-cli`
4. Deploy to devnet (see Phase 1, Step 1)

---

## 📋 PHASE 0: FOUNDATION (✅ COMPLETE)

### Goals
Build complete game foundation with BOLT programs, React + Phaser frontend, and CI/CD infrastructure.

### Completed Tasks

#### Backend (✅ 100% Complete)
- [x] **Workspace Setup**
  - [x] Cargo workspace configuration
  - [x] Anchor.toml with devnet config
  - [x] All component/system directories

- [x] **BOLT Components** (6 total)
  - [x] Ninja - Stats, level, element, weapons, cooldowns
  - [x] Clan - 25 ninja roster, gold, battle stats
  - [x] Battle - Turn-based state machine
  - [x] Weapon - Damage/speed modifiers, rarity
  - [x] Relic - Passive clan buffs
  - [x] PlayerProfile - KARMA, stats, staking

- [x] **BOLT Systems** (4 total)
  - [x] init_clan - Create clan with starting resources
  - [x] recruit - Recruit ninjas with progressive cost
  - [x] train - Train stats with cooldowns
  - [x] battle - Full 3-phase system (initiate/resolve/finalize)

#### Frontend (✅ 100% Complete)
- [x] **React Setup**
  - [x] Vite configuration with path aliases
  - [x] TypeScript with strict mode
  - [x] Wallet adapter (Phantom/Solflare)

- [x] **Phaser Integration**
  - [x] Game configuration
  - [x] MainMenuScene
  - [x] DojoScene (clan management)
  - [x] BattleScene (animated combat)
  - [x] EventBus for React ↔ Phaser

- [x] **State Management**
  - [x] Zustand gameStore
  - [x] Zustand battleStore
  - [x] Type-safe interfaces

- [x] **UI Components**
  - [x] Game wrapper with wallet
  - [x] DojoDashboard
  - [x] NinjaCard
  - [x] BattleModal

- [x] **Game Systems**
  - [x] BattleEngine (TypeScript)
  - [x] DamageCalculator
  - [x] Elemental advantage system

- [x] **MagicBlock Infrastructure**
  - [x] Delegation helpers
  - [x] VRF client
  - [x] Session key management

- [x] **Custom Hooks**
  - [x] useSessionKey
  - [x] useClan
  - [x] useNinjas

#### CI/CD (✅ 100% Complete)
- [x] **GitHub Actions Workflows**
  - [x] backend-ci.yml (lint, build, test, security)
  - [x] frontend-ci.yml (lint, type check, build, bundle analysis)
  - [x] pr-checks.yml (smart change detection)
  - [x] deploy-devnet.yml (manual deployment) - **FIXED BOLT COMMAND**
  - [x] release.yml (automated releases)

- [x] **Automation**
  - [x] Dependabot configuration
  - [x] PR template
  - [x] Bug report template
  - [x] Feature request template

#### Documentation (✅ 100% Complete)
- [x] README.md - Project overview
- [x] QUICK_START.md - 5-minute setup
- [x] DEVELOPMENT.md - Full dev guide
- [x] IMPLEMENTATION_SUMMARY.md - What was built
- [x] NEXT_STEPS.md - Detailed roadmap
- [x] PROJECT_STRUCTURE.md - Code navigation
- [x] .github/README.md - CI/CD documentation

### Deliverables
- ✅ 82 files, ~7,227 lines of code
- ✅ 3 commits ready to push
- ✅ All TODOs marked with `// TODO:` for integration

### Blockers Resolved
- ✅ Fixed BOLT deploy command in GitHub Actions (removed `--network` flag)

---

## 🚀 PHASE 1: DEPLOYMENT & INTEGRATION (🟡 Ready to Start)

**Estimated Time**: 4-8 hours  
**Prerequisites**: BOLT CLI installed, GitHub repo created

### Step 1.1: GitHub Setup (⚪ Not Started)
**Estimated Time**: 5 minutes

- [ ] Create repository at https://github.com/new
  - Owner: `corex303`
  - Name: `dojo-wars`
  - Public visibility
  - No README/gitignore/license (we have them)
- [ ] Push code: `git push -u origin main`
- [ ] Verify 3 commits appear
- [ ] Verify GitHub Actions are active

**Verification**: Repository visible, workflows show in Actions tab

### Step 1.2: BOLT CLI Installation (⚪ Not Started)
**Estimated Time**: 10 minutes

```bash
# Option 1: npm (recommended)
npm install -g @magicblock-labs/bolt-cli

# Option 2: cargo
cargo install --git https://github.com/magicblock-labs/bolt bolt-cli

# Verify
bolt --version
```

**Verification**: `bolt --version` shows version number

### Step 1.3: Backend Deployment to Devnet (⚪ Not Started)
**Estimated Time**: 15-30 minutes

```bash
# Configure Solana for devnet
solana config set --url https://api.devnet.solana.com

# Check wallet
solana address
solana balance

# Airdrop if needed
solana airdrop 2

# Build programs
cd backend
bolt build

# Deploy
bolt deploy

# Save program IDs (they'll be printed)
```

**Program IDs to Save**:
- [ ] Ninja Component: `_______________`
- [ ] Clan Component: `_______________`
- [ ] Battle Component: `_______________`
- [ ] Weapon Component: `_______________`
- [ ] Relic Component: `_______________`
- [ ] Player Profile: `_______________`
- [ ] Init Clan System: `_______________`
- [ ] Recruit System: `_______________`
- [ ] Train System: `_______________`
- [ ] Battle System: `_______________`

**Verification**: Programs visible on Solana Explorer (devnet)

### Step 1.4: Update Frontend Configuration (⚪ Not Started)
**Estimated Time**: 5 minutes

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_MAGICBLOCK_ER_RPC=https://devnet.magicblock.app
VITE_MAGICBLOCK_ER_WS=wss://devnet.magicblock.app

# Add your deployed program IDs
VITE_DOJO_WARS_PROGRAM_ID=<your-main-program-id>
VITE_DELEGATION_PROGRAM_ID=DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh
VITE_VRF_PROGRAM_ID=Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwbRPBi
```

**Verification**: .env file exists with all program IDs

### Step 1.5: Frontend Setup & Test (⚪ Not Started)
**Estimated Time**: 10 minutes

```bash
cd frontend
npm install
npm run dev
```

- [ ] App opens at http://localhost:5173
- [ ] Connect wallet (Phantom/Solflare)
- [ ] Wallet balance shows
- [ ] No console errors

**Verification**: App loads, wallet connects successfully

### Step 1.6: GitHub Secrets Configuration (⚪ Not Started)
**Estimated Time**: 10 minutes

Go to: Settings → Secrets and variables → Actions

Add secrets:
- [ ] `SOLANA_DEPLOYER_KEY` - Your deployer keypair JSON
- [ ] `VERCEL_TOKEN` - Vercel API token (if deploying frontend)
- [ ] `VERCEL_ORG_ID` - Vercel org ID
- [ ] `VERCEL_PROJECT_ID` - Vercel project ID
- [ ] `DOJO_WARS_PROGRAM_ID` - Main program ID

**Verification**: Secrets saved, manual workflow runs successfully

### Phase 1 Success Criteria
- ✅ Repository live on GitHub
- ✅ All programs deployed to devnet
- ✅ Frontend running locally
- ✅ Wallet connection works
- ✅ CI/CD workflows passing

---

## 🔌 PHASE 2: SDK INTEGRATION (⚪ Pending)

**Estimated Time**: 1-2 days  
**Prerequisites**: Phase 1 complete

### Step 2.1: Create BOLT Client (⚪ Not Started)
**File**: `frontend/src/states/programClients.ts`

```typescript
import { Connection, PublicKey } from '@solana/web3.js'
import * as boltSdk from '@magicblock-labs/bolt-sdk'

export function initializeBoltClient(connection: Connection) {
  // Load IDL files
  // Create program clients for each component/system
  // Export instruction builders
}
```

**Tasks**:
- [ ] Load IDL files from deployed programs
- [ ] Create program clients for all components
- [ ] Create program clients for all systems
- [ ] Export instruction builders
- [ ] Add TypeScript types from IDL

**Verification**: Can import and use BOLT clients

### Step 2.2: Update useClan Hook (⚪ Not Started)
**File**: `frontend/src/hooks/useClan.ts`

**Tasks**:
- [ ] Replace `// TODO` with actual BOLT SDK calls
- [ ] Implement `fetchClan()` to read Clan component
- [ ] Implement `initializeClan()` to call init_clan system
- [ ] Implement `upgradeDojo()` to upgrade clan
- [ ] Add error handling
- [ ] Add transaction signing

**Verification**: Can initialize clan and see data update

### Step 2.3: Update useNinjas Hook (⚪ Not Started)
**File**: `frontend/src/hooks/useNinjas.ts`

**Tasks**:
- [ ] Implement `fetchNinjas()` to read Ninja components
- [ ] Implement `recruitNinja()` to call recruit system
- [ ] Implement `trainNinja()` to call train system
- [ ] Add transaction signing
- [ ] Add optimistic updates

**Verification**: Can recruit and train ninjas

### Step 2.4: Implement Battle Flow (⚪ Not Started)
**Files**:
- `frontend/src/states/battleFlow.ts`
- `frontend/src/hooks/useBattle.ts`

**Tasks**:
- [ ] Create battle flow orchestration
- [ ] Implement battle initiation
- [ ] Connect to BattleScene for visualization
- [ ] Implement finalization
- [ ] Add reward claiming

**Verification**: Can start battle and see results

### Step 2.5: MagicBlock Delegation (⚪ Not Started)
**File**: `frontend/src/magicblock/delegation.ts`

**Tasks**:
- [ ] Replace placeholder `delegateAccount()`
- [ ] Implement `undelegateAccount()`
- [ ] Implement `commitState()`
- [ ] Test delegation flow with battle

**Verification**: Battle runs in ER without gas per turn

### Step 2.6: VRF Integration (⚪ Not Started)
**File**: `frontend/src/magicblock/vrfClient.ts`

**Tasks**:
- [ ] Implement `requestVRF()`
- [ ] Implement `getVRFResult()`
- [ ] Use VRF in recruitment for rarity
- [ ] Use VRF in battle for crits

**Verification**: Ninjas have varied rarities, crits occur randomly

### Phase 2 Success Criteria
- ✅ Can initialize clan on-chain
- ✅ Can recruit ninjas on-chain
- ✅ Can train ninjas on-chain
- ✅ Can battle and see results
- ✅ Battles run in ER (gasless turns)
- ✅ VRF provides randomness

---

## 🎨 PHASE 3: ENHANCED FEATURES (⚪ Pending)

**Estimated Time**: 3-5 days  
**Prerequisites**: Phase 2 complete

### Step 3.1: Asset Creation (⚪ Not Started)
**Estimated Time**: 1-2 days (or commission)

**Assets Needed**:
- [ ] Ninja sprites (6 elements × 3 poses = 18 sprites)
- [ ] Weapon icons (20+ items)
- [ ] Relic icons (10+ items)
- [ ] Dojo background
- [ ] Battle arena background
- [ ] UI elements (buttons, frames)
- [ ] Sound effects (attack, victory, defeat)
- [ ] Background music

**Tools**:
- Midjourney/DALL-E for AI generation
- Aseprite for pixel art editing
- Audacity for sound editing

**Verification**: All placeholders replaced with real assets

### Step 3.2: Additional UI Components (⚪ Not Started)

**TrainingPanel** (`frontend/src/components/TrainingPanel.tsx`):
- [ ] Select ninja from roster
- [ ] Choose stat to train (health/power/speed)
- [ ] Show cost and cooldown timer
- [ ] Execute training transaction

**RecruitmentPanel** (`frontend/src/components/RecruitmentPanel.tsx`):
- [ ] Element selection UI
- [ ] Show recruitment cost
- [ ] Display recruited ninja stats
- [ ] Animation on successful recruit

**InventoryPanel** (`frontend/src/components/InventoryPanel.tsx`):
- [ ] List all weapons and relics
- [ ] Equip/unequip functionality
- [ ] Show stat bonuses
- [ ] Filtering and sorting

**SessionKeyStatus** (`frontend/src/components/SessionKeyStatus.tsx`):
- [ ] Display session key status
- [ ] Show time remaining
- [ ] Create/revoke buttons
- [ ] Visual indicator

**Verification**: All UI components functional and beautiful

### Step 3.3: Battle Enhancements (⚪ Not Started)

**Phaser Improvements**:
- [ ] Ninja sprite animations (idle, attack, hit, defeat)
- [ ] Particle effects for attacks
- [ ] Camera shake on hits
- [ ] Health bar animations
- [ ] Victory/defeat screen improvements
- [ ] Turn indicator
- [ ] Combo multiplier display

**Sound Integration**:
- [ ] Attack sound effects
- [ ] Hit impact sounds
- [ ] Victory fanfare
- [ ] Defeat music
- [ ] Background music toggle

**Verification**: Battles feel polished and satisfying

### Step 3.4: Weapon & Relic Systems (⚪ Not Started)

**Backend**:
- [ ] Create weapon crafting system
- [ ] Create relic acquisition system
- [ ] Implement equip/unequip logic

**Frontend**:
- [ ] Weapon equipping UI
- [ ] Relic management
- [ ] Stat preview on hover
- [ ] Visual indicators on ninjas

**Verification**: Can equip items and see stat changes

### Phase 3 Success Criteria
- ✅ Game has professional visuals
- ✅ All UI components implemented
- ✅ Battles have animations and sound
- ✅ Weapon/relic system functional

---

## 👥 PHASE 4: SOCIAL SYSTEMS (⚪ Pending)

**Estimated Time**: 1-2 weeks  
**Prerequisites**: Phase 3 complete

### Step 4.1: Clan System (⚪ Not Started)

**Backend Components**:
- [ ] ClanMembership component
- [ ] Clan treasury
- [ ] Clan alliances

**Backend Systems**:
- [ ] join_clan
- [ ] leave_clan
- [ ] donate_to_treasury
- [ ] form_alliance

**Frontend**:
- [ ] Clan browser/search
- [ ] Join/leave clan UI
- [ ] Clan roster display
- [ ] Treasury management

**Verification**: Can join/create clans, see members

### Step 4.2: Clan Ninja Slot (⚪ Not Started)

**Implementation**:
- [ ] Update Battle component with reinforcement slots
- [ ] Logic: attacker gets reinforcement if not civil war
- [ ] Logic: defender always gets reinforcement
- [ ] Weighted selection (reputation, online status)
- [ ] Display reinforcement ninja in battle

**Verification**: Battles show reinforcement ninjas correctly

### Step 4.3: Reputation System (⚪ Not Started)

**Backend**:
- [ ] Add reputation field to PlayerProfile
- [ ] Add honor_rank enum
- [ ] Reputation gain/loss logic
- [ ] Honor rank progression

**Frontend**:
- [ ] Display reputation score
- [ ] Show honor rank badge
- [ ] Reputation history log
- [ ] Benefits/penalties UI

**Verification**: Reputation changes based on actions

### Step 4.4: Mentor/Apprentice (⚪ Not Started)

**Backend**:
- [ ] MentorBond component
- [ ] create_mentor_bond system
- [ ] reward_mentor system
- [ ] break_bond system

**Frontend**:
- [ ] Find mentor UI
- [ ] Accept apprentice UI
- [ ] Bond strength display
- [ ] Shared benefits view

**Verification**: Can create bonds and get benefits

### Step 4.5: Territory System (⚪ Not Started)

**Backend**:
- [ ] Territory component
- [ ] Clan wars declaration
- [ ] Territory capture logic
- [ ] Passive resource generation

**Frontend**:
- [ ] Territory map view
- [ ] Clan war UI
- [ ] Attack/defend territory
- [ ] War leaderboard

**Verification**: Can declare war and capture territories

### Phase 4 Success Criteria
- ✅ Clan system fully functional
- ✅ Clan ninja slot working
- ✅ Reputation affects gameplay
- ✅ Mentor system operational
- ✅ Territory wars active

---

## 🚢 PHASE 5: POLISH & LAUNCH (⚪ Pending)

**Estimated Time**: 1-2 weeks  
**Prerequisites**: Phase 4 complete

### Step 5.1: Testing (⚪ Not Started)

**Backend Tests**:
- [ ] Unit tests for all systems
- [ ] Integration tests
- [ ] Edge case testing
- [ ] Load testing

**Frontend Tests**:
- [ ] Component tests
- [ ] Hook tests
- [ ] E2E tests with Playwright
- [ ] Mobile testing

**Game Balance**:
- [ ] Battle balance testing
- [ ] Economy balance testing
- [ ] Progression curve testing

**Verification**: All tests passing, balance feels good

### Step 5.2: Mobile Optimization (⚪ Not Started)

**Tasks**:
- [ ] Touch controls for Phaser
- [ ] Responsive layouts
- [ ] Mobile wallet adapter
- [ ] Performance optimization
- [ ] PWA manifest
- [ ] App icons

**Verification**: Works smoothly on mobile devices

### Step 5.3: Security Audit (⚪ Not Started)

**Tasks**:
- [ ] Smart contract audit (professional or community)
- [ ] Frontend security review
- [ ] Transaction simulation testing
- [ ] Session key security review
- [ ] Rate limiting implementation

**Verification**: No critical vulnerabilities found

### Step 5.4: Mainnet Preparation (⚪ Not Started)

**Tasks**:
- [ ] Deploy to mainnet-beta
- [ ] Update frontend env to mainnet
- [ ] Initialize KARMA token on mainnet
- [ ] Setup monitoring/alerts
- [ ] Create emergency procedures

**Verification**: Mainnet deployment successful

### Step 5.5: Launch Materials (⚪ Not Started)

**Marketing**:
- [ ] Trailer video
- [ ] Gameplay screenshots
- [ ] Social media graphics
- [ ] Press kit
- [ ] Website/landing page

**Documentation**:
- [ ] Player guide
- [ ] FAQ
- [ ] Tokenomics whitepaper
- [ ] API documentation

**Verification**: All materials ready

### Step 5.6: Solana Mobile dApp Store (⚪ Not Started)

**Tasks**:
- [ ] Submit to Solana Mobile dApp Store
- [ ] Fill out store listing
- [ ] Upload screenshots/assets
- [ ] Pass store review
- [ ] Official launch

**Verification**: Live on dApp Store

### Phase 5 Success Criteria
- ✅ All tests passing
- ✅ Mobile optimized
- ✅ Security audited
- ✅ Live on mainnet
- ✅ Marketing materials ready
- ✅ Published on Solana Mobile dApp Store

---

## 📈 METRICS & SUCCESS TRACKING

### Technical Metrics
- [ ] Backend test coverage > 80%
- [ ] Frontend test coverage > 70%
- [ ] Page load time < 3 seconds
- [ ] Battle resolution < 200ms
- [ ] Mobile performance score > 85

### User Metrics
- [ ] 100+ wallets connected (week 1)
- [ ] 50+ active clans (week 2)
- [ ] 1000+ battles completed (week 2)
- [ ] 10+ daily active users (week 4)

### Business Metrics
- [ ] KARMA token launched
- [ ] NFT marketplace integration
- [ ] 100+ NFTs minted
- [ ] Sustainable tokenomics

---

## 🔄 UPDATE LOG

### 2025-01-15 (Session 1)
- ✅ Created complete foundation (Phase 0)
- ✅ Fixed BOLT deploy command in GitHub Actions
- ✅ Created this migration plan
- 🎯 Next: Create GitHub repo and start Phase 1

---

## 🆘 TROUBLESHOOTING REFERENCE

### Common Issues

**"BOLT CLI not found"**
```bash
npm install -g @magicblock-labs/bolt-cli
# or
cargo install --git https://github.com/magicblock-labs/bolt bolt-cli
```

**"Program deployment failed"**
- Check SOL balance: `solana balance`
- Airdrop more: `solana airdrop 2`
- Verify network: `solana config get`

**"Transaction simulation failed"**
- Check program IDs in Anchor.toml match deployed
- Verify account sizes are correct
- Review transaction logs

**"Frontend won't connect"**
- Check .env has correct program IDs
- Verify RPC endpoint is correct
- Clear browser cache
- Try different wallet

---

## 📞 RESOURCES & LINKS

### Documentation
- [QUICK_START.md](./QUICK_START.md) - Get started in 5 minutes
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Full development guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What was built

### External
- [MagicBlock Docs](https://docs.magicblock.gg/)
- [BOLT Framework](https://github.com/magicblock-labs/bolt)
- [Solana Generals](https://github.com/magicblock-labs/solana-generals) - Reference
- [Solana Docs](https://docs.solana.com/)

### Community
- MagicBlock Discord
- Solana Discord
- Project Repository Issues

---

## 💡 NOTES FOR FUTURE SESSIONS

### Context Preservation
This file serves as the single source of truth for:
- ✅ What's been completed
- 🔵 What's in progress
- 🎯 What's next
- 📝 Important decisions made
- 🔗 Key references

### How to Use This File
1. **Start of session**: Read this file to understand current state
2. **During work**: Update checkboxes as tasks complete
3. **End of session**: Add entry to UPDATE LOG with date and progress
4. **Next session**: Reference previous updates to continue seamlessly

### Key Decisions Log
- BOLT CLI deployment uses Solana config, not `--network` flag
- GitHub Actions uses separate steps for Solana config
- All TODOs marked in code for easy searching
- Phase-by-phase approach prevents overwhelming complexity

---

**🎯 CURRENT PRIORITY**: Complete Phase 1 - Get code on GitHub and deploy to devnet

**⏭️ NEXT SESSION START HERE**: 
1. Read UPDATE LOG (latest entry)
2. Check Phase 1 status
3. Continue from first unchecked [ ] task

---

*This is a living document. Update it every session to maintain context across multiple conversations.*

