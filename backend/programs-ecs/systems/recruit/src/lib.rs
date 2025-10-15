use bolt_lang::*;
use clan::Clan;
use ninja::{Element, Ninja};
use player_profile::PlayerProfile;

declare_id!("RecrUitSYsteM11111111111111111111111111111111");

#[system]
pub mod recruit {

    pub fn execute(ctx: Context<Components>, element: u8) -> Result<Components> {
        let clock = Clock::get()?;
        
        // Get components
        let clan = &mut ctx.accounts.clan.borrow_mut();
        let ninja = &mut ctx.accounts.ninja.borrow_mut();
        let player_profile = &mut ctx.accounts.player_profile.borrow_mut();

        // Validate clan has space
        require!(clan.ninja_count < 25, ErrorCode::ClanFull);

        // Check gold balance
        let recruitment_cost = calculate_recruitment_cost(clan.ninja_count);
        require!(clan.gold >= recruitment_cost, ErrorCode::InsufficientGold);

        // Deduct gold
        clan.gold -= recruitment_cost;

        // Convert element
        let ninja_element = match element {
            0 => Element::Fire,
            1 => Element::Water,
            2 => Element::Wind,
            3 => Element::Earth,
            4 => Element::Lightning,
            5 => Element::Shadow,
            _ => Element::Fire,
        };

        // Initialize ninja with randomized stats
        // In production, use VRF for true randomness
        let base_stats = calculate_base_stats(&clock);
        
        ninja.owner = player_profile.authority;
        ninja.clan_id = ctx.accounts.clan.key();
        ninja.level = 1;
        ninja.experience = 0;
        ninja.health = base_stats.0;
        ninja.max_health = base_stats.0;
        ninja.power = base_stats.1;
        ninja.speed = base_stats.2;
        ninja.element = ninja_element;
        ninja.weapon_slot_1 = Pubkey::default();
        ninja.weapon_slot_2 = Pubkey::default();
        ninja.weapon_slot_3 = Pubkey::default();
        ninja.training_cooldown = 0;

        // Add ninja to clan
        clan.ninjas[clan.ninja_count as usize] = ctx.accounts.ninja.key();
        clan.ninja_count += 1;

        Ok(ctx.accounts)
    }

    // Component accounts
    #[system_input]
    pub struct Components {
        pub clan: Clan,
        pub ninja: Ninja,
        pub player_profile: PlayerProfile,
    }
}

fn calculate_recruitment_cost(current_count: u8) -> u64 {
    // Progressive cost: 100 + (count * 50)
    100 + (current_count as u64 * 50)
}

fn calculate_base_stats(clock: &Clock) -> (u16, u16, u16) {
    // Use clock slot as pseudo-random seed
    // In production, use MagicBlock VRF
    let seed = clock.slot;
    let health = 80 + ((seed % 40) as u16);
    let power = 8 + ((seed % 12) as u16);
    let speed = 8 + ((seed % 12) as u16);
    (health, power, speed)
}

#[error_code]
pub enum ErrorCode {
    #[msg("Clan is full (max 25 ninjas)")]
    ClanFull,
    #[msg("Insufficient gold for recruitment")]
    InsufficientGold,
}

