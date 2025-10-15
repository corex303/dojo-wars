use bolt_lang::*;

declare_id!("NinjaCoMPonEnT1111111111111111111111111111111");

#[component]
#[derive(Copy)]
pub struct Ninja {
    pub owner: Pubkey,
    pub clan_id: Pubkey,
    pub level: u16,
    pub experience: u32,
    pub health: u16,
    pub power: u16,
    pub speed: u16,
    pub element: Element,
    pub weapon_slot_1: Pubkey,
    pub weapon_slot_2: Pubkey,
    pub weapon_slot_3: Pubkey,
    pub training_cooldown: i64,
    pub max_health: u16,
}

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum Element {
    Fire = 0,
    Water = 1,
    Wind = 2,
    Earth = 3,
    Lightning = 4,
    Shadow = 5,
}

impl Default for Ninja {
    fn default() -> Self {
        Self {
            owner: Pubkey::default(),
            clan_id: Pubkey::default(),
            level: 1,
            experience: 0,
            health: 100,
            power: 10,
            speed: 10,
            element: Element::Fire,
            weapon_slot_1: Pubkey::default(),
            weapon_slot_2: Pubkey::default(),
            weapon_slot_3: Pubkey::default(),
            training_cooldown: 0,
            max_health: 100,
        }
    }
}

