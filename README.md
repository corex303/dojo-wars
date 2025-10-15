# Dojo Wars

A ninja-themed idle clan battler built on Solana with MagicBlock Ephemeral Rollups. Inspired by the classic Facebook game Ninja Warz, reimagined for Web3.

## 🎮 Game Features

- **Clan Management**: Recruit and train up to 25 ninjas
- **Auto-Battle System**: Automated PvP combat with elemental affinities
- **Equipment System**: Hundreds of weapons and relics with unique stats
- **Dual Economy**: KARMA tokens for advanced features, GOLD for daily operations
- **Ephemeral Rollups**: Gasless, sub-10ms battle resolution via MagicBlock
- **True Ownership**: All ninjas, weapons, and relics as Solana NFTs

## 🏗️ Architecture

### Backend (BOLT Framework)
- **Components**: ECS data structures (Ninja, Clan, Battle, Weapon, Relic)
- **Systems**: Game logic executed on-chain (recruit, train, battle, craft)
- **MagicBlock Integration**: Delegation for gasless gameplay, VRF for randomness

### Frontend (React + Phaser.js)
- **React**: UI layer with Solana wallet integration
- **Phaser**: 2D game engine for battle visualization and dojo view
- **State Management**: Zustand stores synced with on-chain state

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Solana CLI 1.17+
- BOLT CLI (MagicBlock)

### Installation

```bash
# Install dependencies
npm install

# Build backend (BOLT programs)
cd backend
bolt build

# Run frontend
cd ../frontend
npm install
npm run dev
```

### Development

```bash
# Run backend tests
npm run test

# Start frontend dev server
npm run frontend

# Build all
npm run build
```

## 🎯 Roadmap

- [x] Project initialization
- [ ] BOLT components and systems
- [ ] Wallet and session key management
- [ ] Battle engine with ER integration
- [ ] Phaser game scenes
- [ ] UI components
- [ ] VRF integration for randomness
- [ ] NFT marketplace compatibility
- [ ] Solana Mobile dApp Store deployment

## 📚 Resources

- [MagicBlock Documentation](https://docs.magicblock.gg/)
- [BOLT Framework](https://github.com/magicblock-labs/bolt)
- [Solana Documentation](https://docs.solana.com/)
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)

## 📄 License

MIT License - see LICENSE file for details

