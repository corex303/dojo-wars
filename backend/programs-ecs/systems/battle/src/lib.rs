use bolt_lang::*;
use battle::{Battle, BattleState};
use clan::Clan;

declare_id!("BattLeSYsteM111111111111111111111111111111111");

#[system]
pub mod initiate_battle {

    pub fn execute(ctx: Context<Components>) -> Result<Components> {
        let clock = Clock::get()?;
        
        let battle = &mut ctx.accounts.battle.borrow_mut();
        let clan1 = &ctx.accounts.clan1.borrow();
        let clan2 = &ctx.accounts.clan2.borrow();

        // Validate both clans have ninjas
        require!(clan1.ninja_count > 0, ErrorCode::ClanEmpty);
        require!(clan2.ninja_count > 0, ErrorCode::ClanEmpty);

        // Initialize battle
        battle.clan1 = ctx.accounts.clan1.key();
        battle.clan2 = ctx.accounts.clan2.key();
        battle.state = BattleState::Initiated;
        battle.current_turn = 0;
        battle.clan1_ninjas_remaining = clan1.ninja_count;
        battle.clan2_ninjas_remaining = clan2.ninja_count;
        battle.started_at = clock.unix_timestamp;
        battle.delegated = false;

        // Calculate potential rewards
        battle.gold_reward = calculate_gold_reward(clan1.dojo_level, clan2.dojo_level);
        battle.karma_reward = calculate_karma_reward(clan1.ninja_count, clan2.ninja_count);

        Ok(ctx.accounts)
    }

    #[system_input]
    pub struct Components {
        pub battle: Battle,
        pub clan1: Clan,
        pub clan2: Clan,
    }
}

#[system]
pub mod resolve_battle_turn {

    pub fn execute(ctx: Context<Components>, damage_dealt: u16) -> Result<Components> {
        let battle = &mut ctx.accounts.battle.borrow_mut();

        // Validate battle is in progress
        require!(
            battle.state == BattleState::InProgress || battle.state == BattleState::Initiated,
            ErrorCode::InvalidBattleState
        );

        // Update battle state
        if battle.state == BattleState::Initiated {
            battle.state = BattleState::InProgress;
        }

        battle.current_turn += 1;

        // Simplified turn resolution - in production, this would:
        // 1. Select random ninja from each clan
        // 2. Calculate damage with weapons/relics
        // 3. Apply elemental bonuses
        // 4. Update ninja health
        // 5. Remove defeated ninjas

        // For now, just decrement ninja count based on damage threshold
        if damage_dealt > 100 {
            if battle.current_turn % 2 == 0 {
                battle.clan2_ninjas_remaining = battle.clan2_ninjas_remaining.saturating_sub(1);
            } else {
                battle.clan1_ninjas_remaining = battle.clan1_ninjas_remaining.saturating_sub(1);
            }
        }

        // Check for battle end
        if battle.clan1_ninjas_remaining == 0 {
            battle.state = BattleState::Resolved;
            battle.winner = battle.clan2;
        } else if battle.clan2_ninjas_remaining == 0 {
            battle.state = BattleState::Resolved;
            battle.winner = battle.clan1;
        }

        Ok(ctx.accounts)
    }

    #[system_input]
    pub struct Components {
        pub battle: Battle,
    }
}

#[system]
pub mod finalize_battle {

    pub fn execute(ctx: Context<Components>) -> Result<Components> {
        let clock = Clock::get()?;
        
        let battle = &mut ctx.accounts.battle.borrow_mut();
        let clan1 = &mut ctx.accounts.clan1.borrow_mut();
        let clan2 = &mut ctx.accounts.clan2.borrow_mut();

        // Validate battle is resolved
        require!(
            battle.state == BattleState::Resolved,
            ErrorCode::BattleNotResolved
        );

        // Distribute rewards to winner
        if battle.winner == ctx.accounts.clan1.key() {
            clan1.gold += battle.gold_reward;
            clan1.wins += 1;
            clan2.losses += 1;
        } else {
            clan2.gold += battle.gold_reward;
            clan2.wins += 1;
            clan1.losses += 1;
        }

        // Update battle counts
        clan1.total_battles += 1;
        clan2.total_battles += 1;

        // Finalize battle
        battle.state = BattleState::Finalized;
        battle.finished_at = clock.unix_timestamp;

        Ok(ctx.accounts)
    }

    #[system_input]
    pub struct Components {
        pub battle: Battle,
        pub clan1: Clan,
        pub clan2: Clan,
    }
}

fn calculate_gold_reward(level1: u8, level2: u8) -> u64 {
    let avg_level = ((level1 as u64) + (level2 as u64)) / 2;
    100 + (avg_level * 20)
}

fn calculate_karma_reward(count1: u8, count2: u8) -> u32 {
    let avg_count = ((count1 as u32) + (count2 as u32)) / 2;
    10 + (avg_count * 2)
}

#[error_code]
pub enum ErrorCode {
    #[msg("Clan has no ninjas")]
    ClanEmpty,
    #[msg("Battle is not in correct state")]
    InvalidBattleState,
    #[msg("Battle must be resolved before finalization")]
    BattleNotResolved,
}

