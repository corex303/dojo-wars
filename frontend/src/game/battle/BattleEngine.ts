import { Ninja, getElementalMultiplier } from '@types/ninja'
import { BattleEvent } from '@types/battle'
import { Weapon } from '@types/items'

export interface BattleParticipant {
  ninja: Ninja
  weapons: Weapon[]
  currentHealth: number
}

export interface BattleResult {
  winner: 'clan1' | 'clan2'
  events: BattleEvent[]
  totalTurns: number
  duration: number
}

export class BattleEngine {
  private clan1Ninjas: BattleParticipant[]
  private clan2Ninjas: BattleParticipant[]
  private events: BattleEvent[] = []
  private currentTurn: number = 0

  constructor(
    clan1Ninjas: Ninja[],
    clan2Ninjas: Ninja[],
    clan1Weapons: Map<string, Weapon[]>,
    clan2Weapons: Map<string, Weapon[]>,
  ) {
    // Initialize participants with current health
    this.clan1Ninjas = clan1Ninjas.map(ninja => ({
      ninja,
      weapons: clan1Weapons.get(ninja.entity.toString()) || [],
      currentHealth: ninja.health,
    }))

    this.clan2Ninjas = clan2Ninjas.map(ninja => ({
      ninja,
      weapons: clan2Weapons.get(ninja.entity.toString()) || [],
      currentHealth: ninja.health,
    }))
  }

  /**
   * Execute full battle simulation
   */
  public executeBattle(): BattleResult {
    const startTime = Date.now()
    
    // Battle continues until one side has no ninjas
    while (this.clan1Ninjas.length > 0 && this.clan2Ninjas.length > 0) {
      this.executeTurn()
      
      // Safety: max 100 turns
      if (this.currentTurn > 100) {
        console.warn('Battle exceeded max turns, forcing end')
        break
      }
    }

    const duration = Date.now() - startTime
    const winner = this.clan1Ninjas.length > 0 ? 'clan1' : 'clan2'

    return {
      winner,
      events: this.events,
      totalTurns: this.currentTurn,
      duration,
    }
  }

  /**
   * Execute a single turn of combat
   */
  private executeTurn(): void {
    this.currentTurn++

    // Randomly select one ninja from each side
    const attacker1 = this.selectRandomNinja(this.clan1Ninjas)
    const attacker2 = this.selectRandomNinja(this.clan2Ninjas)

    if (!attacker1 || !attacker2) return

    // Determine turn order based on speed
    const turnOrder = this.calculateTurnOrder(attacker1, attacker2)

    // Execute attacks in order
    for (const { attacker, defender, side } of turnOrder) {
      if (defender.currentHealth <= 0) continue

      const damage = this.calculateDamage(attacker, defender)
      defender.currentHealth -= damage

      // Record event
      this.events.push({
        turn: this.currentTurn,
        attackerNinja: attacker.ninja.entity,
        defenderNinja: defender.ninja.entity,
        damage,
        defenderHealthRemaining: Math.max(0, defender.currentHealth),
        defenderDefeated: defender.currentHealth <= 0,
        timestamp: Date.now(),
      })

      // Remove defeated ninja
      if (defender.currentHealth <= 0) {
        const defenderArray = side === 'clan1' ? this.clan2Ninjas : this.clan1Ninjas
        const index = defenderArray.indexOf(defender)
        if (index > -1) {
          defenderArray.splice(index, 1)
        }
      }
    }
  }

  /**
   * Calculate turn order based on speed
   */
  private calculateTurnOrder(
    participant1: BattleParticipant,
    participant2: BattleParticipant,
  ): Array<{ attacker: BattleParticipant; defender: BattleParticipant; side: 'clan1' | 'clan2' }> {
    const speed1 = this.calculateEffectiveSpeed(participant1)
    const speed2 = this.calculateEffectiveSpeed(participant2)

    if (speed1 >= speed2) {
      return [
        { attacker: participant1, defender: participant2, side: 'clan1' },
        { attacker: participant2, defender: participant1, side: 'clan2' },
      ]
    } else {
      return [
        { attacker: participant2, defender: participant1, side: 'clan2' },
        { attacker: participant1, defender: participant2, side: 'clan1' },
      ]
    }
  }

  /**
   * Calculate effective speed with weapon modifiers
   */
  private calculateEffectiveSpeed(participant: BattleParticipant): number {
    let speed = participant.ninja.speed
    
    for (const weapon of participant.weapons) {
      speed += weapon.speedModifier
    }

    return Math.max(1, speed)
  }

  /**
   * Calculate damage dealt in an attack
   */
  private calculateDamage(
    attacker: BattleParticipant,
    defender: BattleParticipant,
  ): number {
    // Base damage from power stat
    let damage = attacker.ninja.power

    // Add weapon damage modifiers
    for (const weapon of attacker.weapons) {
      damage += weapon.damageModifier
    }

    // Apply elemental multiplier
    const elementalMultiplier = getElementalMultiplier(
      attacker.ninja.element,
      defender.ninja.element,
    )
    damage = Math.floor(damage * elementalMultiplier)

    // Add randomness (±10%)
    const variance = 0.9 + Math.random() * 0.2
    damage = Math.floor(damage * variance)

    // Minimum damage of 1
    return Math.max(1, damage)
  }

  /**
   * Select a random ninja from an array
   */
  private selectRandomNinja(ninjas: BattleParticipant[]): BattleParticipant | null {
    if (ninjas.length === 0) return null
    const index = Math.floor(Math.random() * ninjas.length)
    return ninjas[index]
  }

  /**
   * Get current battle state
   */
  public getBattleState() {
    return {
      clan1NinjasRemaining: this.clan1Ninjas.length,
      clan2NinjasRemaining: this.clan2Ninjas.length,
      currentTurn: this.currentTurn,
      events: this.events,
    }
  }
}

