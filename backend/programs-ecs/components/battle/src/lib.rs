use bolt_lang::*;

declare_id!("BattLeCoMPonEnT1111111111111111111111111111111");

#[component]
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
    pub delegated: bool,
}

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum BattleState {
    Initiated = 0,
    InProgress = 1,
    Resolved = 2,
    Finalized = 3,
}

impl Default for Battle {
    fn default() -> Self {
        Self {
            clan1: Pubkey::default(),
            clan2: Pubkey::default(),
            state: BattleState::Initiated,
            current_turn: 0,
            clan1_ninjas_remaining: 0,
            clan2_ninjas_remaining: 0,
            winner: Pubkey::default(),
            gold_reward: 0,
            karma_reward: 0,
            started_at: 0,
            finished_at: 0,
            delegated: false,
        }
    }
}

