import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useGameStore, GameView } from '@store/gameStore'
import PhaserGame from '@game/PhaserGame'
import DojoDashboard from './DojoDashboard'
import './Game.css'

export default function Game() {
  const { publicKey, connected } = useWallet()
  const { 
    currentView, 
    setWalletConnected, 
    setCurrentView,
    playerProfile,
    clan 
  } = useGameStore()

  useEffect(() => {
    setWalletConnected(connected, publicKey ?? null)
    
    // If wallet connected and no clan, show main menu
    // If wallet connected and has clan, show dojo
    if (connected && publicKey) {
      // TODO: Check if player has a clan
      // For now, default to MainMenu
      if (!playerProfile || !clan) {
        setCurrentView(GameView.MainMenu)
      } else {
        setCurrentView(GameView.Dojo)
      }
    } else {
      setCurrentView(GameView.MainMenu)
    }
  }, [connected, publicKey, setWalletConnected, setCurrentView, playerProfile, clan])

  const getSceneKey = () => {
    switch (currentView) {
      case GameView.Dojo:
        return 'DojoScene'
      case GameView.Battle:
        return 'BattleScene'
      default:
        return 'MainMenuScene'
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">⚔️ DOJO WARS</div>
        <div className="header-actions">
          <WalletMultiButton />
        </div>
      </header>

      <main className="main-content">
        {connected && (currentView === GameView.Dojo || currentView === GameView.Battle) && (
          <DojoDashboard />
        )}
        
        <PhaserGame currentScene={getSceneKey()} />
        
        {!connected && (
          <div className="connect-prompt">
            <h2>Welcome to Dojo Wars</h2>
            <p>Connect your Solana wallet to start building your ninja clan</p>
          </div>
        )}
      </main>
    </div>
  )
}

