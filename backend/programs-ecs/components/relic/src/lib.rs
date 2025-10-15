use bolt_lang::*;

declare_id!("ReLicCoMPonEnT1111111111111111111111111111111");

#[component]
#[derive(Copy)]
pub struct Relic {
    pub owner: Pubkey,
    pub relic_type: RelicType,
    pub buff_magnitude: u16,
    pub tier: u8,
    pub equipped_to_clan: Pubkey,
}

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum RelicType {
    HealthBoost = 0,
    PowerBoost = 1,
    SpeedBoost = 2,
    GoldMultiplier = 3,
    ExpMultiplier = 4,
    CriticalChance = 5,
}

impl Default for Relic {
    fn default() -> Self {
        Self {
            owner: Pubkey::default(),
            relic_type: RelicType::HealthBoost,
            buff_magnitude: 10,
            tier: 1,
            equipped_to_clan: Pubkey::default(),
        }
    }
}

