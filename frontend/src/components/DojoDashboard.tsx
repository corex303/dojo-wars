import { useGameStore } from '@store/gameStore'
import './DojoDashboard.css'

export default function DojoDashboard() {
  const { clan, ninjas, playerProfile } = useGameStore()

  if (!clan || !playerProfile) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h3>No Clan Found</h3>
          <p>Initialize your clan to start playing</p>
          <button className="btn-primary">Create Clan</button>
        </div>
      </div>
    )
  }

  const winRate = clan.totalBattles > 0 
    ? ((clan.wins / clan.totalBattles) * 100).toFixed(1) 
    : 0

  return (
    <div className="dashboard-container">
      {/* Resources */}
      <div className="dashboard-card resources-card">
        <div className="resource-item">
          <span className="resource-icon">💰</span>
          <div>
            <div className="resource-label">Gold</div>
            <div className="resource-value">{clan.gold.toLocaleString()}</div>
          </div>
        </div>
        <div className="resource-item">
          <span className="resource-icon">🔮</span>
          <div>
            <div className="resource-label">Karma</div>
            <div className="resource-value">{playerProfile.karmaBalance.toLocaleString()}</div>
          </div>
        </div>
        <div className="resource-item">
          <span className="resource-icon">🥷</span>
          <div>
            <div className="resource-label">Ninjas</div>
            <div className="resource-value">{clan.ninjaCount} / 25</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-card stats-card">
        <h3>Clan Stats</h3>
        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-label">Dojo Level</div>
            <div className="stat-value">{clan.dojoLevel}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Win Rate</div>
            <div className="stat-value">{winRate}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Total Battles</div>
            <div className="stat-value">{clan.totalBattles}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Victories</div>
            <div className="stat-value">{clan.wins}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="dashboard-card actions-card">
        <button className="btn-action recruit">
          <span>🥷</span>
          Recruit Ninja
        </button>
        <button className="btn-action train">
          <span>💪</span>
          Train Ninjas
        </button>
        <button className="btn-action battle">
          <span>⚔️</span>
          Start Battle
        </button>
        <button className="btn-action inventory">
          <span>🎒</span>
          Inventory
        </button>
      </div>
    </div>
  )
}

