import Phaser from 'phaser'
import { EventBus, GameEvent } from '../EventBus'
import { COLORS } from '../config'

export class DojoScene extends Phaser.Scene {
  private ninjaPositions: Array<{ x: number; y: number }> = []

  constructor() {
    super({ key: 'DojoScene' })
  }

  create() {
    const { width, height } = this.cameras.main

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.dark)
    
    // Dojo platform
    const platformWidth = 800
    const platformHeight = 400
    const dojoRect = this.add.rectangle(
      width / 2, 
      height / 2 + 50, 
      platformWidth, 
      platformHeight, 
      0x1a1a1a
    )
    dojoRect.setStrokeStyle(3, COLORS.primary)

    // Generate ninja positions (5x5 grid)
    this.ninjaPositions = []
    const startX = width / 2 - 300
    const startY = height / 2 - 100
    const spacing = 75

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const x = startX + col * spacing
        const y = startY + row * spacing
        this.ninjaPositions.push({ x, y })
        
        // Placeholder ninja slot
        const slot = this.add.circle(x, y, 20, 0x333333)
        slot.setStrokeStyle(2, 0x555555)
      }
    }

    // Title
    const title = this.add.text(width / 2, 50, 'Your Dojo', {
      fontSize: '36px',
      color: '#667eea',
      fontStyle: 'bold',
    })
    title.setOrigin(0.5)

    EventBus.emit(GameEvent.SCENE_READY, this.scene.key)
  }

  // Method to add ninja sprites (called from React when ninjas are loaded)
  public displayNinjas(ninjaData: Array<{ id: string; element: number }>) {
    // Clear existing ninja sprites
    this.children.list
      .filter(child => child.getData('isNinja'))
      .forEach(child => child.destroy())

    // Add ninja sprites
    ninjaData.forEach((ninja, index) => {
      if (index < this.ninjaPositions.length) {
        const pos = this.ninjaPositions[index]
        
        // Create ninja representation (colored circle for now)
        const elementColors = [
          0xff4444, // Fire
          0x4444ff, // Water
          0x44ff44, // Wind
          0xaa8844, // Earth
          0xffff44, // Lightning
          0x8844ff, // Shadow
        ]
        
        const ninjaSprite = this.add.circle(
          pos.x, 
          pos.y, 
          25, 
          elementColors[ninja.element] || 0xffffff
        )
        ninjaSprite.setStrokeStyle(3, 0xffffff)
        ninjaSprite.setData('isNinja', true)
        ninjaSprite.setData('ninjaId', ninja.id)
        ninjaSprite.setInteractive({ useHandCursor: true })
        
        // Click handler
        ninjaSprite.on('pointerdown', () => {
          EventBus.emit('ninja-clicked', ninja.id)
        })

        // Hover effects
        ninjaSprite.on('pointerover', () => {
          ninjaSprite.setScale(1.2)
        })
        
        ninjaSprite.on('pointerout', () => {
          ninjaSprite.setScale(1.0)
        })
      }
    })
  }
}

