import Phaser from 'phaser'
import { EventBus, GameEvent } from '../EventBus'
import { COLORS } from '../config'

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  create() {
    const { width, height } = this.cameras.main

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.dark)
    
    // Title
    const title = this.add.text(width / 2, height / 3, 'DOJO WARS', {
      fontSize: '72px',
      color: '#667eea',
      fontStyle: 'bold',
    })
    title.setOrigin(0.5)

    // Subtitle
    const subtitle = this.add.text(width / 2, height / 3 + 80, 'Ninja Clan Battler on Solana', {
      fontSize: '24px',
      color: '#ffffff',
    })
    subtitle.setOrigin(0.5)

    // Instruction text
    const instruction = this.add.text(width / 2, height / 2 + 100, 'Connect your wallet to begin', {
      fontSize: '20px',
      color: '#aaaaaa',
    })
    instruction.setOrigin(0.5)

    // Pulsing animation for instruction
    this.tweens.add({
      targets: instruction,
      alpha: 0.5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    })

    // Emit ready event
    EventBus.emit(GameEvent.SCENE_READY, this.scene.key)
  }
}

