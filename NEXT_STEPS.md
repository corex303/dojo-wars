# Dojo Wars - Next Steps

## ✅ What's Been Implemented

### Backend (BOLT Programs)
- ✅ **Components**: Ninja, Clan, Battle, Weapon, Relic, PlayerProfile
- ✅ **Systems**: 
  - `init_clan` - Initialize player's clan
  - `recruit` - Recruit new ninjas with element selection
  - `train` - Train ninja stats (health, power, speed)
  - `battle` - Full battle system (initiate, resolve turns, finalize)
- ✅ Program structure following BOLT ECS pattern
- ✅ Workspace configured with Cargo.toml and Anchor.toml

### Frontend (React + Phaser)
- ✅ **Wallet Integration**: Solana wallet adapter with Phantom/Solflare
- ✅ **Game Scenes**: MainMenu, Dojo, Battle
- ✅ **State Management**: Zustand stores for game state and battles
- ✅ **UI Components**: 
  - Game wrapper with wallet connection
  - DojoDashboard with resources and stats
  - NinjaCard for displaying ninja details
  - BattleModal for opponent selection
- ✅ **Battle Engine**: Full TypeScript battle simulation
- ✅ **Type System**: Complete TypeScript interfaces matching BOLT components
- ✅ **Hooks**: useSessionKey, useClan, useNinjas
- ✅ **MagicBlock Integration**: Delegation, VRF, session key infrastructure

### Documentation
- ✅ README.md with project overview
- ✅ DEVELOPMENT.md with full development guide
- ✅ LICENSE (MIT)

## 🚧 What Needs to Be Done

### 1. Install BOLT CLI and Dependencies

```bash
# Install BOLT CLI
npm install -g @magicblock-labs/bolt-cli

# Or via cargo
cargo install --git https://github.com/magicblock-labs/bolt bolt-cli

# Verify installation
bolt --version
```

### 2. Build and Deploy Backend

```bash
cd backend

# Build BOLT programs
bolt build

# Deploy to devnet
bolt deploy --network devnet

# Copy program IDs to frontend config
```

### 3. Update Frontend Configuration

1. Create `frontend/.env` from `.env.example`
2. Update program IDs from deployment
3. Configure RPC endpoints

```env
VITE_DOJO_WARS_PROGRAM_ID=<your-program-id>
VITE_DELEGATION_PROGRAM_ID=DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh
VITE_VRF_PROGRAM_ID=Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwbRPBi
```

### 4. Connect BOLT SDK to Frontend

The current frontend has placeholder functions marked with `// TODO`. You need to:

**In `frontend/src/states/programClients.ts`** (create this file):
```typescript
import { Connection, PublicKey } from '@solana/web3.js'
import * as boltSdk from '@magicblock-labs/bolt-sdk'

export function initializeBoltClient(connection: Connection) {
  // Initialize BOLT client with your program IDs
  // Parse IDL and create program clients
}
```

**Update hooks to use BOLT SDK**:
- `hooks/useClan.ts` - Fetch clan component data
- `hooks/useNinjas.ts` - Fetch ninja component data
- Add transaction building and signing

### 5. Implement MagicBlock Delegation

**In `magicblock/delegation.ts`**:
- Replace placeholder functions with actual MagicBlock SDK calls
- Implement `delegateAccount()` using delegation program
- Implement `commitState()` for ER → Solana sync

**Reference**: [MagicBlock Documentation](https://docs.magicblock.gg/)

### 6. Implement VRF Integration

**In `magicblock/vrfClient.ts`**:
- Implement `requestVRF()` using MagicBlock VRF program
- Use for:
  - Ninja recruitment rarity
  - Battle critical hits
  - Loot drops

### 7. Add Game Assets

Create or source:
- Ninja sprites (different elements/poses)
- Weapon icons
- Dojo background
- Battle arena background
- UI elements and icons

**Recommended tools**:
- Midjourney/DALL-E for AI generation
- Aseprite for pixel art
- Figma for UI design

### 8. Implement Additional UI Components

**Create these missing components**:

```typescript
// frontend/src/components/TrainingPanel.tsx
// - Select ninja
// - Choose stat to train (health/power/speed)
// - Show cost and cooldown

// frontend/src/components/RecruitmentPanel.tsx
// - Element selection
// - Show recruitment cost
// - Display recruited ninja stats

// frontend/src/components/InventoryPanel.tsx
// - List all weapons and relics
// - Equip/unequip items
// - Show item stats

// frontend/src/components/SessionKeyStatus.tsx
// - Display session key status
// - Time remaining
// - Create/revoke session key buttons
```

### 9. Enhanced Battle System

**Add to BattleScene**:
- Sound effects
- Particle effects for attacks
- Camera shake on hit
- Victory/defeat animations
- Real-time health bars

**Integrate with ER**:
- Delegate battle account to ER
- Execute turns gaslessly
- Commit results to Solana

### 10. Testing

```bash
# Backend tests
cd backend
bolt test

# Frontend tests (add these)
cd frontend
npm install --save-dev vitest @testing-library/react
# Write tests for:
# - Battle engine logic
# - Damage calculations
# - State management
```

### 11. Add Token Management

**Implement KARMA token**:
- Create SPL token (or use existing)
- Token transfer functions
- Staking mechanism
- Display balance in UI

**Implement crafting system**:
- Fragment management
- Weapon/relic crafting with VRF
- Burn fragments for upgrades

### 12. Social Features

**Add these systems**:
- Tournament system
- Leaderboards (stored on-chain)
- Friend system
- Gifting mechanism
- Clan alliances

### 13. Mobile Optimization

For Solana Mobile dApp Store:
- Responsive design (already partially implemented)
- Touch controls for Phaser
- Mobile Wallet Adapter integration
- Performance optimization
- PWA manifest

### 14. Security & Production Readiness

**Before mainnet**:
- Security audit of BOLT programs
- Rate limiting for actions
- Anti-cheat measures
- Encrypted session key storage
- Transaction simulation before signing
- Error handling and user feedback

## 📋 Priority Order

### Phase 1: MVP (Week 1-2)
1. ✅ Project setup (DONE)
2. Install BOLT and deploy to devnet
3. Connect frontend to deployed programs
4. Implement clan initialization
5. Implement ninja recruitment
6. Basic battle system (no ER yet)

### Phase 2: Core Features (Week 3-4)
1. Training system
2. MagicBlock ER integration for battles
3. Session key management
4. VRF for randomness
5. Basic UI polish

### Phase 3: Enhanced Features (Week 5-6)
1. Weapon and relic system
2. Equipment management
3. Battle animations and effects
4. Sound and music
5. Mobile optimization

### Phase 4: Web3 Features (Week 7-8)
1. KARMA token integration
2. NFT marketplace compatibility
3. Staking system
4. Tournament and leaderboards
5. Social features

### Phase 5: Launch Prep (Week 9-10)
1. Security audit
2. Performance optimization
3. Beta testing
4. Marketing materials
5. Solana Mobile dApp Store submission

## 🔗 Resources

### Essential Links
- [MagicBlock Docs](https://docs.magicblock.gg/)
- [BOLT GitHub](https://github.com/magicblock-labs/bolt)
- [Solana Generals Reference](https://github.com/magicblock-labs/solana-generals)
- [Solana Docs](https://docs.solana.com/)
- [Phaser 3 Examples](https://phaser.io/examples)

### Community
- MagicBlock Discord
- Solana Discord
- Game Dev forums

## 🐛 Known Issues / TODOs

1. **Session Key Authorization**: Need to implement actual authorization transaction
2. **Component Fetching**: BOLT SDK integration for fetching component data
3. **Battle Delegation**: Connect battle system to ER
4. **VRF Requests**: Implement actual VRF program calls
5. **Assets**: All visual assets are placeholders (colored circles)
6. **Error Handling**: Add comprehensive error handling and user feedback
7. **Testing**: No automated tests yet

## 💡 Tips

1. **Start Small**: Get one feature working end-to-end before moving to next
2. **Use solana-generals**: Reference their implementation for MagicBlock patterns
3. **Test on Devnet**: Don't rush to mainnet
4. **Community Help**: MagicBlock team is responsive on Discord
5. **Iterate**: Game balance can be tuned after core mechanics work

## 🎯 Quick Start Commands

```bash
# Terminal 1: Backend
cd backend
bolt build
bolt deploy --network devnet

# Terminal 2: Frontend
cd frontend
npm install
npm run dev

# Terminal 3: Local validator (optional)
solana-test-validator
```

## 📞 Need Help?

- Check DEVELOPMENT.md for detailed guides
- Review code comments for implementation notes
- All TODOs marked with `// TODO:` in code
- Join MagicBlock Discord for support

---

**Ready to build!** Start with Phase 1, and feel free to adapt this plan based on your priorities and timeline. Good luck! 🚀

