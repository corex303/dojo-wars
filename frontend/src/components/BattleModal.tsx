import { useState } from 'react'
import { useBattleStore } from '@store/battleStore'
import './BattleModal.css'

interface BattleModalProps {
  isOpen: boolean
  onClose: () => void
  onStartBattle: (opponentId: string) => void
}

export default function BattleModal({ isOpen, onClose, onStartBattle }: BattleModalProps) {
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null)
  const { battleHistory } = useBattleStore()

  // Mock opponents for demo
  const opponents = [
    { id: '1', name: 'Shadow Clan', ninjas: 12, level: 3, winRate: 65 },
    { id: '2', name: 'Fire Dragons', ninjas: 18, level: 5, winRate: 72 },
    { id: '3', name: 'Wind Walkers', ninjas: 8, level: 2, winRate: 45 },
    { id: '4', name: 'Water Warriors', ninjas: 15, level: 4, winRate: 58 },
  ]

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚔️ Choose Opponent</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="opponents-list">
          {opponents.map(opponent => (
            <div 
              key={opponent.id}
              className={`opponent-card ${selectedOpponent === opponent.id ? 'selected' : ''}`}
              onClick={() => setSelectedOpponent(opponent.id)}
            >
              <div className="opponent-header">
                <h3>{opponent.name}</h3>
                <div className="opponent-level">Lv. {opponent.level}</div>
              </div>
              <div className="opponent-stats">
                <div className="opponent-stat">
                  <span>🥷 Ninjas:</span>
                  <strong>{opponent.ninjas}</strong>
                </div>
                <div className="opponent-stat">
                  <span>📊 Win Rate:</span>
                  <strong>{opponent.winRate}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="battle-info">
          <div className="info-box">
            <span className="info-icon">💰</span>
            <div>
              <div className="info-label">Potential Reward</div>
              <div className="info-value">150-300 Gold</div>
            </div>
          </div>
          <div className="info-box">
            <span className="info-icon">🔮</span>
            <div>
              <div className="info-label">Karma Earned</div>
              <div className="info-value">20-40 KARMA</div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-battle" 
            disabled={!selectedOpponent}
            onClick={() => selectedOpponent && onStartBattle(selectedOpponent)}
          >
            Start Battle
          </button>
        </div>

        {battleHistory.length > 0 && (
          <div className="battle-history">
            <h3>Recent Battles</h3>
            <div className="history-list">
              {battleHistory.slice(0, 3).map((battle, index) => (
                <div key={index} className="history-item">
                  <span>Battle #{index + 1}</span>
                  <span className={battle.state === 2 ? 'victory' : 'defeat'}>
                    {battle.state === 2 ? 'Victory' : 'Defeat'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

