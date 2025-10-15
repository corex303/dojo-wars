import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { GAME_CONFIG } from './config'
import { MainMenuScene } from './scenes/MainMenuScene'
import { DojoScene } from './scenes/DojoScene'
import { BattleScene } from './scenes/BattleScene'
import { EventBus, GameEvent } from './EventBus'

interface PhaserGameProps {
  currentScene?: string
}

export default function PhaserGame({ currentScene }: PhaserGameProps) {
  const gameRef = useRef<Phaser.Game | null>(null)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    if (gameRef.current) return

    // Initialize Phaser game
    const config: Phaser.Types.Core.GameConfig = {
      ...GAME_CONFIG,
      scene: [MainMenuScene, DojoScene, BattleScene],
    }

    gameRef.current = new Phaser.Game(config)

    // Listen for scene ready events
    const handleSceneReady = (sceneKey: string) => {
      console.log(`Scene ready: ${sceneKey}`)
      setSceneReady(true)
    }

    EventBus.on(GameEvent.SCENE_READY, handleSceneReady)

    return () => {
      EventBus.off(GameEvent.SCENE_READY, handleSceneReady)
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  // Switch scenes based on currentScene prop
  useEffect(() => {
    if (!gameRef.current || !currentScene) return

    const scene = gameRef.current.scene.getScene(currentScene)
    if (scene && !scene.scene.isActive()) {
      gameRef.current.scene.start(currentScene)
    }
  }, [currentScene])

  return (
    <div 
      id="game-container" 
      style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        aspectRatio: '16/9',
      }}
    />
  )
}

// Export scene references for external control
export function getScene<T extends Phaser.Scene>(game: Phaser.Game | null, sceneKey: string): T | null {
  if (!game) return null
  return game.scene.getScene(sceneKey) as T
}

