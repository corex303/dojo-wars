use bolt_lang::*;

declare_id!("WeaponCoMPonEnT111111111111111111111111111111");

#[component]
#[derive(Copy)]
pub struct Weapon {
    pub owner: Pubkey,
    pub weapon_type: WeaponType,
    pub damage_modifier: u16,
    pub speed_modifier: i16,
    pub element: Element,
    pub rarity: Rarity,
    pub level: u8,
    pub equipped_to: Pubkey,
}

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum WeaponType {
    Katana = 0,
    Shuriken = 1,
    Staff = 2,
    Kunai = 3,
    Nunchaku = 4,
    Sai = 5,
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

#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum Rarity {
    Common = 0,
    Uncommon = 1,
    Rare = 2,
    Epic = 3,
    Legendary = 4,
}

impl Default for Weapon {
    fn default() -> Self {
        Self {
            owner: Pubkey::default(),
            weapon_type: WeaponType::Katana,
            damage_modifier: 10,
            speed_modifier: 0,
            element: Element::Fire,
            rarity: Rarity::Common,
            level: 1,
            equipped_to: Pubkey::default(),
        }
    }
}

