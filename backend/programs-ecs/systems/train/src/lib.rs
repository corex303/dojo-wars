use bolt_lang::*;
use clan::Clan;
use ninja::Ninja;

declare_id!("TrainSYsteM111111111111111111111111111111111");

#[system]
pub mod train {

    pub fn execute(ctx: Context<Components>, stat_type: u8) -> Result<Components> {
        let clock = Clock::get()?;
        
        let clan = &mut ctx.accounts.clan.borrow_mut();
        let ninja = &mut ctx.accounts.ninja.borrow_mut();

        // Check training cooldown
        require!(
            clock.unix_timestamp >= ninja.training_cooldown,
            ErrorCode::TrainingCooldown
        );

        // Calculate training cost
        let training_cost = calculate_training_cost(ninja.level);
        require!(clan.gold >= training_cost, ErrorCode::InsufficientGold);

        // Deduct gold
        clan.gold -= training_cost;

        // Train stat based on type: 0=health, 1=power, 2=speed
        match stat_type {
            0 => {
                ninja.health += 10;
                ninja.max_health += 10;
            }
            1 => {
                ninja.power += 2;
            }
            2 => {
                ninja.speed += 2;
            }
            _ => return Err(ErrorCode::InvalidStatType.into()),
        }

        // Add experience
        ninja.experience += 50;

        // Level up if threshold reached
        let level_threshold = (ninja.level as u32) * 100;
        if ninja.experience >= level_threshold {
            ninja.level += 1;
            ninja.experience = 0;
        }

        // Set cooldown (5 minutes in production, 60 seconds for testing)
        ninja.training_cooldown = clock.unix_timestamp + 60;

        Ok(ctx.accounts)
    }

    #[system_input]
    pub struct Components {
        pub clan: Clan,
        pub ninja: Ninja,
    }
}

fn calculate_training_cost(level: u16) -> u64 {
    // Progressive cost: 50 * level
    50 * (level as u64)
}

#[error_code]
pub enum ErrorCode {
    #[msg("Ninja is still in training cooldown")]
    TrainingCooldown,
    #[msg("Insufficient gold for training")]
    InsufficientGold,
    #[msg("Invalid stat type (must be 0, 1, or 2)")]
    InvalidStatType,
}

