use bolt_lang::*;

declare_id!("PLaYErCoMPonEnT111111111111111111111111111111");

#[component]
pub struct PlayerProfile {
    pub authority: Pubkey,
    pub karma_balance: u64,
    pub karma_staked: u64,
    pub total_battles: u32,
    pub total_wins: u32,
    pub total_losses: u32,
    pub highest_streak: u16,
    pub current_streak: u16,
    pub clan: Pubkey,
    pub joined_at: i64,
}

impl Default for PlayerProfile {
    fn default() -> Self {
        Self {
            authority: Pubkey::default(),
            karma_balance: 0,
            karma_staked: 0,
            total_battles: 0,
            total_wins: 0,
            total_losses: 0,
            highest_streak: 0,
            current_streak: 0,
            clan: Pubkey::default(),
            joined_at: 0,
        }
    }
}

