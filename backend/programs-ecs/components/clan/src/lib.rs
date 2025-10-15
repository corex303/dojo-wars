use bolt_lang::*;

declare_id!("ClanCoMPonEnT11111111111111111111111111111111");

#[component]
pub struct Clan {
    pub owner: Pubkey,
    pub gold: u64,
    pub dojo_level: u8,
    pub ninja_count: u8,
    pub ninjas: [Pubkey; 25],
    pub total_battles: u32,
    pub wins: u32,
    pub losses: u32,
    pub created_at: i64,
}

impl Default for Clan {
    fn default() -> Self {
        Self {
            owner: Pubkey::default(),
            gold: 1000, // Starting gold
            dojo_level: 1,
            ninja_count: 0,
            ninjas: [Pubkey::default(); 25],
            total_battles: 0,
            wins: 0,
            losses: 0,
            created_at: 0,
        }
    }
}

