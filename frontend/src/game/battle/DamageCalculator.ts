import { Ninja, getElementalMultiplier } from '@types/ninja'
import { Weapon, Rarity } from '@types/items'

export interface DamageResult {
  baseDamage: number
  weaponBonus: number
  elementalMultiplier: number
  criticalHit: boolean
  finalDamage: number
}

/**
 * Calculate comprehensive damage for an attack
 */
export function calculateDetailedDamage(
  attacker: Ninja,
  defender: Ninja,
  attackerWeapons: Weapon[],
  critChance: number = 5,
): DamageResult {
  // Base damage from power stat
  const baseDamage = attacker.power

  // Sum weapon damage bonuses
  let weaponBonus = 0
  for (const weapon of attackerWeapons) {
    weaponBonus += weapon.damageModifier
    
    // Higher rarity weapons deal more damage
    weaponBonus += getRarityBonus(weapon.rarity)
  }

  // Elemental advantage
  const elementalMultiplier = getElementalMultiplier(attacker.element, defender.element)

  // Critical hit roll
  const criticalHit = Math.random() * 100 < critChance
  const critMultiplier = criticalHit ? 1.5 : 1.0

  // Calculate final damage
  let finalDamage = (baseDamage + weaponBonus) * elementalMultiplier * critMultiplier

  // Add variance (±10%)
  const variance = 0.9 + Math.random() * 0.2
  finalDamage = Math.floor(finalDamage * variance)

  // Minimum damage
  finalDamage = Math.max(1, finalDamage)

  return {
    baseDamage,
    weaponBonus,
    elementalMultiplier,
    criticalHit,
    finalDamage,
  }
}

/**
 * Get damage bonus from weapon rarity
 */
function getRarityBonus(rarity: Rarity): number {
  switch (rarity) {
    case Rarity.Common: return 0
    case Rarity.Uncommon: return 2
    case Rarity.Rare: return 5
    case Rarity.Epic: return 10
    case Rarity.Legendary: return 20
    default: return 0
  }
}

/**
 * Calculate expected damage range
 */
export function getDamageRange(
  attacker: Ninja,
  attackerWeapons: Weapon[],
  elementalMultiplier: number,
): { min: number; max: number; average: number } {
  const baseDamage = attacker.power
  let weaponBonus = 0
  
  for (const weapon of attackerWeapons) {
    weaponBonus += weapon.damageModifier + getRarityBonus(weapon.rarity)
  }

  const totalDamage = (baseDamage + weaponBonus) * elementalMultiplier

  const min = Math.floor(totalDamage * 0.9)
  const max = Math.floor(totalDamage * 1.1 * 1.5) // With crit
  const average = Math.floor(totalDamage)

  return { min, max, average }
}

