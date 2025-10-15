import Phaser from 'phaser'
import { EventBus, GameEvent } from '../EventBus'
import { COLORS } from '../config'

export class BattleScene extends Phaser.Scene {
  private clan1Ninjas: Phaser.GameObjects.Group | null = null
  private clan2Ninjas: Phaser.GameObjects.Group | null = null
  private turnText: Phaser.GameObjects.Text | null = null
  private logText: Phaser.GameObjects.Text[] = []

  constructor() {
    super({ key: 'BattleScene' })
  }

  create() {
    const { width, height } = this.cameras.main

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a1a)
    
    // Battle arena divider
    this.add.line(width / 2, height / 2, 0, -height, 0, height, 0x667eea, 0.5)

    // Labels
    this.add.text(width / 4, 50, 'Your Clan', {
      fontSize: '28px',
      color: '#667eea',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(width * 3 / 4, 50, 'Opponent', {
      fontSize: '28px',
      color: '#764ba2',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    // Turn counter
    this.turnText = this.add.text(width / 2, 50, 'Turn: 0', {
      fontSize: '24px',
      color: '#ffffff',
    })
    this.turnText.setOrigin(0.5)

    // Create ninja groups
    this.clan1Ninjas = this.add.group()
    this.clan2Ninjas = this.add.group()

    // Battle log area
    const logBackground = this.add.rectangle(width / 2, height - 80, width - 40, 120, 0x000000, 0.7)
    logBackground.setStrokeStyle(2, COLORS.primary)

    EventBus.emit(GameEvent.SCENE_READY, this.scene.key)
  }

  public initializeBattle(clan1Count: number, clan2Count: number) {
    const { width, height } = this.cameras.main
    
    // Clear existing ninjas
    this.clan1Ninjas?.clear(true, true)
    this.clan2Ninjas?.clear(true, true)

    // Position clan 1 ninjas (left side)
    for (let i = 0; i < clan1Count; i++) {
      const x = width / 4 - 100 + (i % 5) * 50
      const y = 150 + Math.floor(i / 5) * 60
      
      const ninja = this.add.circle(x, y, 20, 0x4444ff)
      ninja.setStrokeStyle(2, 0xffffff)
      ninja.setData('health', 100)
      this.clan1Ninjas?.add(ninja)
    }

    // Position clan 2 ninjas (right side)
    for (let i = 0; i < clan2Count; i++) {
      const x = width * 3 / 4 - 100 + (i % 5) * 50
      const y = 150 + Math.floor(i / 5) * 60
      
      const ninja = this.add.circle(x, y, 20, 0xff4444)
      ninja.setStrokeStyle(2, 0xffffff)
      ninja.setData('health', 100)
      this.clan2Ninjas?.add(ninja)
    }
  }

  public animateTurn(turn: number, attacker: 'clan1' | 'clan2', damage: number) {
    // Update turn text
    if (this.turnText) {
      this.turnText.setText(`Turn: ${turn}`)
    }

    const attackingGroup = attacker === 'clan1' ? this.clan1Ninjas : this.clan2Ninjas
    const defendingGroup = attacker === 'clan1' ? this.clan2Ninjas : this.clan1Ninjas

    if (!attackingGroup || !defendingGroup) return

    // Get random attacker and defender
    const attackers = attackingGroup.getChildren()
    const defenders = defendingGroup.getChildren()

    if (attackers.length === 0 || defenders.length === 0) return

    const attackerNinja = attackers[Math.floor(Math.random() * attackers.length)] as Phaser.GameObjects.Arc
    const defenderNinja = defenders[Math.floor(Math.random() * defenders.length)] as Phaser.GameObjects.Arc

    // Attack animation
    const originalX = attackerNinja.x
    const originalY = attackerNinja.y
    const targetX = defenderNinja.x
    const targetY = defenderNinja.y

    // Move towards target
    this.tweens.add({
      targets: attackerNinja,
      x: originalX + (targetX - originalX) * 0.3,
      y: originalY + (targetY - originalY) * 0.3,
      duration: 200,
      yoyo: true,
      onYoyo: () => {
        // Flash defender on hit
        this.tweens.add({
          targets: defenderNinja,
          alpha: 0.3,
          duration: 100,
          yoyo: true,
        })

        // Reduce health
        const currentHealth = defenderNinja.getData('health') as number
        const newHealth = Math.max(0, currentHealth - damage)
        defenderNinja.setData('health', newHealth)

        // If defeated, fade out
        if (newHealth <= 0) {
          this.tweens.add({
            targets: defenderNinja,
            alpha: 0,
            scale: 0,
            duration: 300,
            onComplete: () => {
              defenderNinja.destroy()
            }
          })
        }
      }
    })

    // Add damage text
    const damageText = this.add.text(targetX, targetY - 40, `-${damage}`, {
      fontSize: '20px',
      color: '#ff4444',
      fontStyle: 'bold',
    })
    damageText.setOrigin(0.5)
    
    this.tweens.add({
      targets: damageText,
      y: targetY - 80,
      alpha: 0,
      duration: 1000,
      onComplete: () => damageText.destroy()
    })
  }

  public showVictory(winner: 'clan1' | 'clan2') {
    const { width, height } = this.cameras.main
    
    const message = winner === 'clan1' ? 'VICTORY!' : 'DEFEAT'
    const color = winner === 'clan1' ? '#4caf50' : '#f44336'

    const victoryText = this.add.text(width / 2, height / 2, message, {
      fontSize: '72px',
      color,
      fontStyle: 'bold',
    })
    victoryText.setOrigin(0.5)
    victoryText.setAlpha(0)

    this.tweens.add({
      targets: victoryText,
      alpha: 1,
      scale: 1.2,
      duration: 500,
    })

    EventBus.emit(GameEvent.BATTLE_END, winner)
  }
}

