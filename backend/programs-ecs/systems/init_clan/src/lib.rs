use bolt_lang::*;
use clan::Clan;
use player_profile::PlayerProfile;

declare_id!("InitCLanSYsteM1111111111111111111111111111111");

#[system]
pub mod init_clan {

    pub fn execute(ctx: Context<Components>) -> Result<Components> {
        let clock = Clock::get()?;
        
        let clan = &mut ctx.accounts.clan.borrow_mut();
        let player_profile = &mut ctx.accounts.player_profile.borrow_mut();

        // Initialize clan
        clan.owner = ctx.accounts.authority.key();
        clan.gold = 1000; // Starting gold
        clan.dojo_level = 1;
        clan.ninja_count = 0;
        clan.ninjas = [Pubkey::default(); 25];
        clan.total_battles = 0;
        clan.wins = 0;
        clan.losses = 0;
        clan.created_at = clock.unix_timestamp;

        // Initialize player profile
        player_profile.authority = ctx.accounts.authority.key();
        player_profile.karma_balance = 100; // Starting karma
        player_profile.karma_staked = 0;
        player_profile.total_battles = 0;
        player_profile.total_wins = 0;
        player_profile.total_losses = 0;
        player_profile.highest_streak = 0;
        player_profile.current_streak = 0;
        player_profile.clan = ctx.accounts.clan.key();
        player_profile.joined_at = clock.unix_timestamp;

        Ok(ctx.accounts)
    }

    #[system_input]
    pub struct Components {
        pub clan: Clan,
        pub player_profile: PlayerProfile,
        #[authority]
        pub authority: Pubkey,
    }
}

