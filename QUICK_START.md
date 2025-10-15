# Dojo Wars - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Step 1: Install BOLT CLI
```bash
npm install -g @magicblock-labs/bolt-cli
```

### Step 2: Build Backend
```bash
cd backend
bolt build
```

### Step 3: Deploy to Devnet
```bash
bolt deploy --network devnet
# Copy the program IDs that are printed
```

### Step 4: Configure Frontend
```bash
cd ../frontend
cp .env.example .env
# Edit .env and paste your program IDs
```

### Step 5: Install & Run
```bash
npm install
npm run dev
```

### Step 6: Test
1. Open http://localhost:5173
2. Connect Phantom/Solflare wallet
3. Get devnet SOL from https://faucet.solana.com
4. Start playing!

---

## 📁 What's Included

### Backend (Solana/BOLT)
- ✅ 6 Components (Ninja, Clan, Battle, Weapon, Relic, PlayerProfile)
- ✅ 4 Systems (init_clan, recruit, train, battle)
- ✅ ~1,100 lines of Rust

### Frontend (React/Phaser)
- ✅ Wallet integration
- ✅ 3 Phaser scenes (MainMenu, Dojo, Battle)
- ✅ Battle engine with animations
- ✅ State management (Zustand)
- ✅ MagicBlock integration infrastructure
- ✅ ~2,500 lines of TypeScript

### Documentation
- ✅ 5 comprehensive guides
- ✅ ~1,500 lines of documentation

---

## 🎯 Next Actions

1. **Immediate** (1-2 hours):
   - Deploy backend to devnet
   - Connect frontend to deployed programs
   - Test wallet connection

2. **Integration** (1-2 days):
   - Implement BOLT SDK calls (marked with `// TODO:`)
   - Connect MagicBlock delegation
   - Test game loop

3. **Polish** (3-5 days):
   - Add game assets (sprites, icons, backgrounds)
   - Polish UI/UX
   - Mobile optimization

4. **Launch** (1-2 weeks):
   - Beta testing
   - Security audit
   - Solana Mobile dApp Store submission

---

## 📚 Documentation Map

- **README.md** - Project overview
- **IMPLEMENTATION_SUMMARY.md** - What was built (READ THIS FIRST)
- **NEXT_STEPS.md** - Detailed roadmap
- **DEVELOPMENT.md** - Development guide
- **PROJECT_STRUCTURE.md** - Code navigation
- **QUICK_START.md** - This file

---

## 🆘 Troubleshooting

**Error: "bolt: command not found"**
```bash
cargo install --git https://github.com/magicblock-labs/bolt bolt-cli
```

**Error: "Program not found"**
- Ensure backend is deployed
- Check program IDs in frontend/.env

**Wallet won't connect**
- Clear browser cache
- Check you're on devnet
- Ensure wallet has SOL

**Build errors**
```bash
cd backend && cargo clean && bolt build
cd frontend && rm -rf node_modules && npm install
```

---

## 🔗 Quick Links

- [MagicBlock Docs](https://docs.magicblock.gg/)
- [Solana Generals (Reference)](https://github.com/magicblock-labs/solana-generals)
- [Solana Devnet Faucet](https://faucet.solana.com/)
- [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)

---

## 💡 Pro Tips

1. Start with `IMPLEMENTATION_SUMMARY.md` to understand what's built
2. Search for `// TODO:` in code to find integration points
3. Reference `solana-generals` for MagicBlock patterns
4. Test on devnet extensively before mainnet
5. Join MagicBlock Discord for support

---

## 🎮 Test the Game Flow

Once deployed and running:

1. **Connect Wallet** → Should see main menu
2. **Initialize Clan** → Creates your clan with starting resources
3. **Recruit Ninja** → Spend gold, get random ninja
4. **Train Ninja** → Improve stats (60s cooldown)
5. **Start Battle** → Auto-battle simulation
6. **Win Rewards** → Earn gold and KARMA

---

## ✅ Success Checklist

- [ ] BOLT CLI installed
- [ ] Backend built successfully
- [ ] Backend deployed to devnet
- [ ] Frontend .env configured
- [ ] Frontend running on localhost
- [ ] Wallet connected
- [ ] Clan initialized
- [ ] Ninja recruited
- [ ] Battle tested

---

**Status**: 🟢 Ready to Build  
**Time to MVP**: ~40 hours remaining  
**Complexity**: Moderate

**You have a solid foundation. Now it's integration, assets, and polish!**

---

*For detailed information, see IMPLEMENTATION_SUMMARY.md*

