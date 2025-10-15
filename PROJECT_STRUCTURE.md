# Dojo Wars - Project Structure

```
dojo-wars/
│
├── 📄 README.md                      # Project overview
├── 📄 LICENSE                        # MIT License
├── 📄 DEVELOPMENT.md                 # Development guide
├── 📄 NEXT_STEPS.md                  # Implementation roadmap
├── 📄 IMPLEMENTATION_SUMMARY.md      # What was built
├── 📄 PROJECT_STRUCTURE.md           # This file
├── 📄 package.json                   # Root workspace config
├── 📄 .gitignore                     # Git ignore rules
│
├── 📁 backend/                       # BOLT Programs (Solana)
│   ├── 📄 README.md                  # Backend documentation
│   ├── 📄 Cargo.toml                 # Rust workspace
│   ├── 📄 Anchor.toml                # Anchor configuration
│   │
│   └── 📁 programs-ecs/              # ECS Programs
│       │
│       ├── 📁 components/            # Data Structures
│       │   │
│       │   ├── 📁 ninja/             # ⚔️ Ninja Component
│       │   │   ├── Cargo.toml
│       │   │   └── src/
│       │   │       └── lib.rs        # Stats, element, level, weapons
│       │   │
│       │   ├── 📁 clan/              # 🏯 Clan Component
│       │   │   ├── Cargo.toml
│       │   │   └── src/
│       │   │       └── lib.rs        # Roster, gold, dojo level
│       │   │
│       │   ├── 📁 battle/            # ⚔️ Battle Component
│       │   │   ├── Cargo.toml
│       │   │   └── src/
│       │   │       └── lib.rs        # Battle state, turns, rewards
│       │   │
│       │   ├── 📁 weapon/            # 🗡️ Weapon Component
│       │   │   ├── Cargo.toml
│       │   │   └── src/
│       │   │       └── lib.rs        # Damage, speed, rarity
│       │   │
│       │   ├── 📁 relic/             # 💎 Relic Component
│       │   │   ├── Cargo.toml
│       │   │   └── src/
│       │   │       └── lib.rs        # Passive buffs
│       │   │
│       │   └── 📁 player_profile/    # 👤 Player Component
│       │       ├── Cargo.toml
│       │       └── src/
│       │           └── lib.rs        # KARMA, stats, clan link
│       │
│       └── 📁 systems/                # Game Logic
│           │
│           ├── 📁 init_clan/          # 🏗️ Initialize System
│           │   ├── Cargo.toml
│           │   └── src/
│           │       └── lib.rs         # Create clan & profile
│           │
│           ├── 📁 recruit/            # 🎭 Recruit System
│           │   ├── Cargo.toml
│           │   └── src/
│           │       └── lib.rs         # Mint ninja, add to clan
│           │
│           ├── 📁 train/              # 💪 Training System
│           │   ├── Cargo.toml
│           │   └── src/
│           │       └── lib.rs         # Improve stats, level up
│           │
│           └── 📁 battle/             # ⚔️ Battle Systems
│               ├── Cargo.toml
│               └── src/
│                   └── lib.rs         # Initiate, resolve, finalize
│
└── 📁 frontend/                       # React + Phaser Client
    ├── 📄 package.json                # Frontend dependencies
    ├── 📄 vite.config.ts              # Vite build config
    ├── 📄 tsconfig.json               # TypeScript config
    ├── 📄 index.html                  # HTML entry point
    │
    └── 📁 src/
        │
        ├── 📄 main.tsx                # React entry point
        ├── 📄 App.tsx                 # Wallet provider wrapper
        ├── 📄 App.css                 # App styles
        ├── 📄 index.css               # Global styles
        │
        ├── 📁 components/             # React UI Components
        │   ├── 📄 Game.tsx            # Main game wrapper
        │   ├── 📄 Game.css
        │   ├── 📄 DojoDashboard.tsx   # Resources & actions
        │   ├── 📄 DojoDashboard.css
        │   ├── 📄 NinjaCard.tsx       # Ninja display card
        │   ├── 📄 NinjaCard.css
        │   ├── 📄 BattleModal.tsx     # Battle opponent selection
        │   └── 📄 BattleModal.css
        │
        ├── 📁 game/                   # Phaser Game Engine
        │   │
        │   ├── 📄 PhaserGame.tsx      # React-Phaser bridge
        │   ├── 📄 config.ts           # Phaser configuration
        │   ├── 📄 EventBus.ts         # Game event system
        │   │
        │   ├── 📁 scenes/             # Phaser Scenes
        │   │   ├── 📄 MainMenuScene.ts   # Title screen
        │   │   ├── 📄 DojoScene.ts       # Clan management
        │   │   └── 📄 BattleScene.ts     # Battle animation
        │   │
        │   └── 📁 battle/             # Battle Engine
        │       ├── 📄 BattleEngine.ts    # Combat simulation
        │       └── 📄 DamageCalculator.ts # Damage formulas
        │
        ├── 📁 store/                  # State Management (Zustand)
        │   ├── 📄 gameStore.ts        # Global game state
        │   └── 📄 battleStore.ts      # Battle state & history
        │
        ├── 📁 hooks/                  # React Custom Hooks
        │   ├── 📄 useSessionKey.ts    # Session key lifecycle
        │   ├── 📄 useClan.ts          # Clan data management
        │   └── 📄 useNinjas.ts        # Ninja management
        │
        ├── 📁 types/                  # TypeScript Types
        │   ├── 📄 ninja.ts            # Ninja interface & helpers
        │   ├── 📄 clan.ts             # Clan interface
        │   ├── 📄 battle.ts           # Battle interfaces
        │   ├── 📄 items.ts            # Weapon & Relic types
        │   └── 📄 player.ts           # Player profile
        │
        ├── 📁 magicblock/             # MagicBlock Integration
        │   ├── 📄 delegation.ts       # ER delegation helpers
        │   └── 📄 vrfClient.ts        # VRF randomness
        │
        └── 📁 utils/                  # Utility Functions
            └── 📄 sessionKeyManager.ts # Session key storage

```

## 📊 Component Relationships

```
Player (Wallet)
    │
    ├─── PlayerProfile (KARMA, stats)
    │
    └─── Clan (gold, dojo)
            │
            ├─── Ninja 1 ──┬── Weapon 1
            ├─── Ninja 2 ──┼── Weapon 2
            ├─── Ninja 3 ──┴── Weapon 3
            ├─── ...
            └─── Ninja 25
            │
            └─── Relics (clan-wide buffs)

Battle
    ├─── Clan 1 (participants)
    └─── Clan 2 (participants)
```

## 🔄 Data Flow

```
┌─────────────────┐
│  Solana Chain   │
│  (BOLT Programs)│
└────────┬────────┘
         │
         │ Read/Write
         │
┌────────▼────────┐
│  Zustand Store  │
│  (Game State)   │
└────┬───────┬────┘
     │       │
     │       │ Subscribe
     │       │
     ▼       ▼
┌─────────┐ ┌─────────┐
│ React   │ │ Phaser  │
│ UI      │ │ Scenes  │
└─────────┘ └─────────┘
```

## 🎮 Game Loop Flow

```
1. Player connects wallet
   ↓
2. Check for existing clan
   ↓
3. If no clan → Initialize clan
   ↓
4. Load clan data & ninjas
   ↓
5. Display Dojo Scene
   ↓
┌─────────────────────────────┐
│                             │
│  Player Actions Loop:       │
│                             │
│  • Recruit Ninja            │
│    → Spend gold             │
│    → Add to clan            │
│                             │
│  • Train Ninja              │
│    → Spend gold             │
│    → Improve stats          │
│    → Wait for cooldown      │
│                             │
│  • Start Battle             │
│    → Delegate to ER         │
│    → Auto-resolve turns     │
│    → Commit results         │
│    → Earn rewards           │
│                             │
│  • Equip Weapons            │
│  • Use Relics               │
│                             │
└─────────────────────────────┘
```

## 🔧 Tech Stack

### Backend
- **Language**: Rust 1.70+
- **Framework**: BOLT (MagicBlock ECS)
- **Blockchain**: Solana
- **Programs**: Anchor-compatible

### Frontend
- **Framework**: React 18
- **Game Engine**: Phaser 3
- **Language**: TypeScript 5
- **Bundler**: Vite 5
- **State**: Zustand 4
- **Wallet**: @solana/wallet-adapter

### Infrastructure
- **Ephemeral Rollups**: MagicBlock
- **Randomness**: MagicBlock VRF
- **Network**: Solana Devnet

## 📝 File Naming Conventions

- **Components**: PascalCase (`NinjaCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useClan.ts`)
- **Types**: PascalCase (`Ninja`, `Clan`)
- **Utils**: camelCase (`sessionKeyManager.ts`)
- **Rust modules**: snake_case (`init_clan`, `recruit`)
- **Constants**: UPPER_SNAKE_CASE (`DELEGATION_PROGRAM_ID`)

## 🎨 Code Organization Principles

1. **Separation of Concerns**: UI, game logic, blockchain separate
2. **Type Safety**: TypeScript interfaces match Rust structs
3. **Reusability**: Components and hooks are composable
4. **Readability**: Clear naming, comments on complex logic
5. **Maintainability**: Small files, single responsibility

## 📦 Key Dependencies

### Backend
```toml
bolt-lang = "0.1.0"
solana-program = "~1.17"
anchor-lang = "~0.29"
```

### Frontend
```json
{
  "@solana/web3.js": "^1.87.6",
  "@solana/wallet-adapter-react": "^0.15.35",
  "@magicblock-labs/bolt-sdk": "^0.1.0",
  "phaser": "^3.70.0",
  "react": "^18.2.0",
  "zustand": "^4.4.7"
}
```

## 🚀 Build Artifacts

After building:
- `backend/target/deploy/*.so` - Compiled programs
- `frontend/dist/` - Production build
- `backend/target/idl/*.json` - Interface definitions

## 🔍 Key Entry Points

**Start here to understand the codebase**:

1. **Backend**: `backend/programs-ecs/systems/battle/src/lib.rs`
   - Shows BOLT system pattern
   - Complete battle logic

2. **Frontend**: `frontend/src/components/Game.tsx`
   - Main app component
   - Wallet integration
   - Scene management

3. **State**: `frontend/src/store/gameStore.ts`
   - Central state management
   - Data flow

4. **Types**: `frontend/src/types/ninja.ts`
   - Type definitions
   - Helper functions

## 📚 Documentation Hierarchy

1. `README.md` - Start here (overview)
2. `IMPLEMENTATION_SUMMARY.md` - What was built
3. `NEXT_STEPS.md` - What to do next
4. `DEVELOPMENT.md` - How to develop
5. `PROJECT_STRUCTURE.md` - This file (navigation)
6. `backend/README.md` - Backend specifics

---

**Total Files**: 54 source files  
**Total Lines**: ~6,000 lines of code  
**Languages**: Rust, TypeScript, CSS  
**Estimated Reading Time**: 2-3 hours for full codebase

---

*Use this as a map to navigate the codebase. Every file has a clear purpose and place in the architecture.*

