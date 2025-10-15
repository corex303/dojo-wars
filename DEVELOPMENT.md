# Dojo Wars - Development Guide

## Prerequisites

### Required Tools
- **Node.js 18+** - JavaScript runtime
- **Rust 1.70+** - For Solana programs
- **Solana CLI 1.17+** - Solana development tools
- **BOLT CLI** - MagicBlock's ECS framework

### Installation

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install BOLT CLI
npm install -g @magicblock-labs/bolt-cli

# Verify installations
solana --version
cargo --version
bolt --version
```

## Project Structure

```
dojo-wars/
├── backend/                    # BOLT programs (Solana smart contracts)
│   ├── programs-ecs/
│   │   ├── components/        # ECS components (data structures)
│   │   │   ├── ninja/
│   │   │   ├── clan/
│   │   │   ├── battle/
│   │   │   ├── weapon/
│   │   │   └── relic/
│   │   └── systems/           # ECS systems (game logic)
│   │       ├── recruit/
│   │       ├── train/
│   │       ├── battle/
│   │       └── init_clan/
│   ├── Cargo.toml
│   └── Anchor.toml
├── frontend/                   # React + Phaser client
│   ├── src/
│   │   ├── components/        # React UI components
│   │   ├── game/              # Phaser game code
│   │   │   ├── scenes/        # Phaser scenes
│   │   │   └── battle/        # Battle engine
│   │   ├── hooks/             # React hooks
│   │   ├── store/             # Zustand state management
│   │   ├── types/             # TypeScript types
│   │   ├── magicblock/        # MagicBlock integration
│   │   └── utils/             # Utility functions
│   ├── package.json
│   └── vite.config.ts
└── package.json                # Root workspace config
```

## Development Workflow

### Backend Development

```bash
cd backend

# Build BOLT programs
bolt build

# Run tests
bolt test

# Deploy to devnet
bolt deploy --network devnet

# Generate TypeScript types from IDL
bolt generate-client
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Full Stack Development

```bash
# From project root

# Run frontend (opens on http://localhost:5173)
npm run frontend

# In another terminal, rebuild backend when changed
npm run backend
```

## Key Concepts

### BOLT ECS Architecture

**Components** are pure data structures:
```rust
#[component]
pub struct Ninja {
    pub owner: Pubkey,
    pub health: u16,
    pub power: u16,
    // ...
}
```

**Systems** contain game logic:
```rust
#[system]
pub mod recruit {
    pub fn execute(ctx: Context<Components>, element: u8) -> Result<Components> {
        // Game logic here
    }
}
```

### MagicBlock Ephemeral Rollups

1. **Delegate** accounts to ER for gasless transactions
2. **Execute** game logic in sub-10ms
3. **Commit** state back to Solana mainnet
4. **Undelegate** to finalize

### State Management Flow

```
Solana Chain → BOLT Components → Zustand Store → React Components
                                     ↓
                                Phaser Scenes
```

## Testing

### Backend Tests

```bash
cd backend
bolt test

# Test specific system
bolt test --filter recruit
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### Integration Testing

1. Start local validator: `solana-test-validator`
2. Deploy programs: `bolt deploy --network localnet`
3. Run frontend: `npm run dev`
4. Test full user flows

## Common Tasks

### Add a New Component

```bash
cd backend/programs-ecs/components
mkdir my_component
cd my_component

# Create Cargo.toml and src/lib.rs
# Add to workspace in backend/Cargo.toml
```

### Add a New System

```bash
cd backend/programs-ecs/systems
mkdir my_system
cd my_system

# Create Cargo.toml and src/lib.rs
# Add component dependencies
```

### Add a New Phaser Scene

```typescript
// frontend/src/game/scenes/MyScene.ts
import Phaser from 'phaser'

export class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MyScene' })
  }
  
  create() {
    // Scene logic
  }
}

// Add to GAME_CONFIG in config.ts
```

## Debugging

### Backend Debugging

```bash
# Enable Anchor logs
export ANCHOR_LOG=true

# View program logs
solana logs
```

### Frontend Debugging

- Open browser DevTools (F12)
- Check Console for logs
- Use React DevTools extension
- Enable debug mode in `.env`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SOLANA_NETWORK` - Network to use (devnet/mainnet)
- `VITE_SOLANA_RPC_URL` - RPC endpoint
- `VITE_MAGICBLOCK_ER_RPC` - MagicBlock ER endpoint

## Deployment

### Deploy to Devnet

```bash
# Backend
cd backend
bolt deploy --network devnet

# Frontend (to Vercel/Netlify)
cd frontend
npm run build
# Deploy dist/ folder
```

### Deploy to Mainnet

```bash
# Update Anchor.toml to mainnet
# Update program IDs
bolt deploy --network mainnet
```

## Resources

- [MagicBlock Docs](https://docs.magicblock.gg/)
- [BOLT Framework](https://github.com/magicblock-labs/bolt)
- [Solana Docs](https://docs.solana.com/)
- [Phaser 3 Docs](https://photonstorm.github.io/phaser3-docs/)
- [Anchor Book](https://book.anchor-lang.com/)

## Troubleshooting

### "Program not found" error
- Ensure program is deployed: `bolt deploy`
- Check program ID in Anchor.toml matches frontend config

### Wallet connection issues
- Clear browser cache
- Check network matches (devnet vs mainnet)
- Ensure wallet has SOL for fees

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Rust cache: `cargo clean`
- Update dependencies: `npm update`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

