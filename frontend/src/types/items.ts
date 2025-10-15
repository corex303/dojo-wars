import { PublicKey } from '@solana/web3.js'

export enum WeaponType {
  Katana = 0,
  Shuriken = 1,
  Staff = 2,
  Kunai = 3,
  Nunchaku = 4,
  Sai = 5,
}

export enum Rarity {
  Common = 0,
  Uncommon = 1,
  Rare = 2,
  Epic = 3,
  Legendary = 4,
}

export interface Weapon {
  entity: PublicKey
  owner: PublicKey
  weaponType: WeaponType
  damageModifier: number
  speedModifier: number
  element: number
  rarity: Rarity
  level: number
  equippedTo: PublicKey
}

export enum RelicType {
  HealthBoost = 0,
  PowerBoost = 1,
  SpeedBoost = 2,
  GoldMultiplier = 3,
  ExpMultiplier = 4,
  CriticalChance = 5,
}

export interface Relic {
  entity: PublicKey
  owner: PublicKey
  relicType: RelicType
  buffMagnitude: number
  tier: number
  equippedToClan: PublicKey
}

export const WEAPON_NAMES: Record<WeaponType, string> = {
  [WeaponType.Katana]: 'Katana',
  [WeaponType.Shuriken]: 'Shuriken',
  [WeaponType.Staff]: 'Staff',
  [WeaponType.Kunai]: 'Kunai',
  [WeaponType.Nunchaku]: 'Nunchaku',
  [WeaponType.Sai]: 'Sai',
}

export const RARITY_NAMES: Record<Rarity, string> = {
  [Rarity.Common]: 'Common',
  [Rarity.Uncommon]: 'Uncommon',
  [Rarity.Rare]: 'Rare',
  [Rarity.Epic]: 'Epic',
  [Rarity.Legendary]: 'Legendary',
}

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.Common]: '#9e9e9e',
  [Rarity.Uncommon]: '#4caf50',
  [Rarity.Rare]: '#2196f3',
  [Rarity.Epic]: '#9c27b0',
  [Rarity.Legendary]: '#ff9800',
}

