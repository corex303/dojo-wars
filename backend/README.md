# Dojo Wars Backend

BOLT ECS programs for Dojo Wars game logic.

## Structure

```
programs-ecs/
├── components/          # Data structures (ECS components)
│   ├── ninja/          # Ninja stats and attributes
│   ├── clan/           # Clan data and roster
│   ├── battle/         # Battle state
│   ├── weapon/         # Weapon items
│   ├── relic/          # Relic items
│   └── player_profile/ # Player account data
└── systems/            # Game logic (ECS systems)
    ├── init_clan/      # Initialize new clan
    ├── recruit/        # Recruit ninjas
    ├── train/          # Train ninja stats
    └── battle/         # Battle systems
```

## Build

```bash
# Build all programs
bolt build

# Build specific component
cd programs-ecs/components/ninja
cargo build-bpf
```

## Test

```bash
# Run all tests
bolt test

# Test specific system
bolt test --filter recruit
```

## Deploy

```bash
# Deploy to devnet
bolt deploy --network devnet

# Deploy to mainnet (when ready)
bolt deploy --network mainnet
```

## Program IDs

After deployment, update these in `Anchor.toml` and frontend config:

- Ninja Component: `NinjaCoMPonEnT1111111111111111111111111111111`
- Clan Component: `ClanCoMPonEnT11111111111111111111111111111111`
- Battle Component: `BattLeCoMPonEnT1111111111111111111111111111111`
- Weapon Component: `WeaponCoMPonEnT111111111111111111111111111111`
- Relic Component: `ReLicCoMPonEnT1111111111111111111111111111111`
- Player Profile: `PLaYErCoMPonEnT111111111111111111111111111111`

## Components

### Ninja
```rust
pub struct Ninja {
    pub owner: Pubkey,
    pub clan_id: Pubkey,
    pub level: u16,
    pub experience: u32,
    pub health: u16,
    pub power: u16,
    pub speed: u16,
    pub element: Element, // Fire, Water, Wind, Earth, Lightning, Shadow
    pub weapon_slot_1: Pubkey,
    pub weapon_slot_2: Pubkey,
    pub weapon_slot_3: Pubkey,
    pub training_cooldown: i64,
    pub max_health: u16,
}
```

### Clan
```rust
pub struct Clan {
    pub owner: Pubkey,
    pub gold: u64,
    pub dojo_level: u8,
    pub ninja_count: u8,
    pub ninjas: [Pubkey; 25], // Max 25 ninjas
    pub total_battles: u32,
    pub wins: u32,
    pub losses: u32,
    pub created_at: i64,
}
```

### Battle
```rust
pub struct Battle {
    pub clan1: Pubkey,
    pub clan2: Pubkey,
    pub state: BattleState,
    pub current_turn: u16,
    pub clan1_ninjas_remaining: u8,
    pub clan2_ninjas_remaining: u8,
    pub winner: Pubkey,
    pub gold_reward: u64,
    pub karma_reward: u32,
    pub started_at: i64,
    pub finished_at: i64,
    pub delegated: bool, // True if delegated to ER
}
```

## Systems

### init_clan
Initialize a new clan and player profile.

**Parameters**: None  
**Effects**:
- Creates Clan component with default values
- Creates PlayerProfile component
- Grants starting gold (1000)
- Grants starting karma (100)

### recruit
Recruit a new ninja and add to clan.

**Parameters**:
- `element: u8` - Element type (0-5)

**Effects**:
- Creates Ninja component with random stats
- Adds ninja to clan roster
- Deducts gold cost (progressive: 100 + count * 50)

**Requirements**:
- Clan has space (< 25 ninjas)
- Sufficient gold

### train
Train a ninja to improve stats.

**Parameters**:
- `stat_type: u8` - 0=health, 1=power, 2=speed

**Effects**:
- Increases selected stat
- Adds experience
- May trigger level up
- Sets training cooldown (60 seconds)
- Deducts gold (50 * level)

**Requirements**:
- Training cooldown expired
- Sufficient gold

### initiate_battle
Create a new battle between two clans.

**Parameters**: None (inferred from accounts)

**Effects**:
- Creates Battle component
- Sets initial state
- Calculates potential rewards

**Requirements**:
- Both clans have ninjas

### resolve_battle_turn
Execute one turn of battle (intended for ER).

**Parameters**:
- `damage_dealt: u16` - Damage for this turn

**Effects**:
- Increments turn counter
- Updates ninja counts
- May resolve battle if one side defeated

**State**: Runs in Ephemeral Rollup

### finalize_battle
Commit battle results and distribute rewards.

**Parameters**: None

**Effects**:
- Distributes gold/karma to winner
- Updates win/loss records
- Finalizes battle state

**Requirements**:
- Battle state is Resolved

## MagicBlock Integration

### Delegation
Battle accounts can be delegated to Ephemeral Rollups for gasless turn resolution:

```rust
// In battle system
battle.delegated = true;
// Client calls delegation program
// Turns execute in ER
// Final state commits back to Solana
```

### VRF
Use MagicBlock VRF for randomness:

```rust
// In recruit system
let vrf_result = get_vrf_randomness(vrf_account)?;
let rarity = calculate_rarity(vrf_result);
```

## Gas Optimization

- Use `#[derive(Copy)]` where possible
- Battle state is minimal for ER efficiency
- Ninja stats are u16 to save space

## Security

- All systems validate authority
- State transitions are checked
- No unlimited loops
- Cooldowns prevent spam

## Testing

```bash
# Integration tests in backend/tests/
bolt test

# Test flows:
# 1. Initialize clan
# 2. Recruit ninja
# 3. Train ninja
# 4. Battle another clan
```

## Next Steps

1. Deploy to devnet
2. Test all systems
3. Add weapon/relic systems
4. Implement staking for KARMA
5. Add tournament system

