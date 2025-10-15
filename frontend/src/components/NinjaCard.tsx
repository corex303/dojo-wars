import { Ninja, ELEMENT_NAMES, ELEMENT_COLORS } from '@types/ninja'
import './NinjaCard.css'

interface NinjaCardProps {
  ninja: Ninja
  onClick?: () => void
}

export default function NinjaCard({ ninja, onClick }: NinjaCardProps) {
  const elementColor = ELEMENT_COLORS[ninja.element]
  const elementName = ELEMENT_NAMES[ninja.element]
  const healthPercent = (ninja.health / ninja.maxHealth) * 100

  return (
    <div 
      className="ninja-card" 
      onClick={onClick}
      style={{ borderColor: elementColor }}
    >
      <div className="ninja-header">
        <div className="ninja-level">Lv. {ninja.level}</div>
        <div className="ninja-element" style={{ color: elementColor }}>
          {elementName}
        </div>
      </div>

      <div className="ninja-avatar" style={{ backgroundColor: elementColor }}>
        🥷
      </div>

      <div className="ninja-stats">
        <div className="stat-bar">
          <div className="stat-label">HP</div>
          <div className="stat-value">
            <div className="stat-bar-bg">
              <div 
                className="stat-bar-fill health" 
                style={{ width: `${healthPercent}%` }}
              />
            </div>
            <span>{ninja.health}/{ninja.maxHealth}</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-item">
            <span className="stat-icon">⚔️</span>
            <span>{ninja.power}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span>{ninja.speed}</span>
          </div>
        </div>

        <div className="exp-bar">
          <div className="exp-label">EXP</div>
          <div className="exp-bar-bg">
            <div 
              className="exp-bar-fill" 
              style={{ width: `${(ninja.experience / (ninja.level * 100)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {ninja.trainingCooldown > Date.now() / 1000 && (
        <div className="training-cooldown">
          ⏱️ Training...
        </div>
      )}
    </div>
  )
}

