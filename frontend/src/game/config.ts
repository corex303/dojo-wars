import Phaser from 'phaser'

export const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#0a0a0a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  render: {
    pixelArt: true,
  }
}

export const COLORS = {
  primary: 0x667eea,
  secondary: 0x764ba2,
  success: 0x4caf50,
  danger: 0xf44336,
  warning: 0xffc107,
  info: 0x2196f3,
  dark: 0x0a0a0a,
  light: 0xffffff,
}

export const FONTS = {
  pixel: 'Arial',
  ui: 'Arial',
}

