import Phaser from 'phaser'

// Event bus for communication between Phaser scenes and React
export const EventBus = new Phaser.Events.EventEmitter()

// Game events
export enum GameEvent {
  // Scene events
  SCENE_READY = 'scene-ready',
  
  // Battle events
  BATTLE_START = 'battle-start',
  BATTLE_TURN = 'battle-turn',
  BATTLE_END = 'battle-end',
  
  // Training events
  TRAINING_START = 'training-start',
  TRAINING_COMPLETE = 'training-complete',
  
  // Recruitment events
  NINJA_RECRUITED = 'ninja-recruited',
  
  // UI events
  CHANGE_VIEW = 'change-view',
  OPEN_MODAL = 'open-modal',
  CLOSE_MODAL = 'close-modal',
}

