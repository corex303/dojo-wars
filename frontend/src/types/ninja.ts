import { PublicKey } from '@solana/web3.js'

export enum Element {
  Fire = 0,
  Water = 1,
  Wind = 2,
  Earth = 3,
  Lightning = 4,
  Shadow = 5,
}

export interface Ninja {
  entity: PublicKey
  owner: PublicKey
  clanId: PublicKey
  level: number
  experience: number
  health: number
  power: number
  speed: number
  element: Element
  weaponSlot1: PublicKey
  weaponSlot2: PublicKey
  weaponSlot3: PublicKey
  trainingCooldown: number
  maxHealth: number
}

export const ELEMENT_NAMES: Record<Element, string> = {
  [Element.Fire]: 'Fire',
  [Element.Water]: 'Water',
  [Element.Wind]: 'Wind',
  [Element.Earth]: 'Earth',
  [Element.Lightning]: 'Lightning',
  [Element.Shadow]: 'Shadow',
}

export const ELEMENT_COLORS: Record<Element, string> = {
  [Element.Fire]: '#ff4444',
  [Element.Water]: '#4444ff',
  [Element.Wind]: '#44ff44',
  [Element.Earth]: '#aa8844',
  [Element.Lightning]: '#ffff44',
  [Element.Shadow]: '#8844ff',
}

// Elemental advantage system: Fire > Wind > Water > Fire
// Earth and Lightning are neutral
export function getElementalMultiplier(attacker: Element, defender: Element): number {
  if (attacker === Element.Fire && defender === Element.Wind) return 1.5
  if (attacker === Element.Wind && defender === Element.Water) return 1.5
  if (attacker === Element.Water && defender === Element.Fire) return 1.5
  if (attacker === Element.Lightning && defender === Element.Water) return 1.3
  if (attacker === Element.Earth && defender === Element.Lightning) return 1.3
  
  // Reverse disadvantages
  if (attacker === Element.Wind && defender === Element.Fire) return 0.7
  if (attacker === Element.Water && defender === Element.Wind) return 0.7
  if (attacker === Element.Fire && defender === Element.Water) return 0.7
  
  return 1.0 // Neutral
}

