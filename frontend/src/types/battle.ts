import { PublicKey } from '@solana/web3.js'

export enum BattleState {
  Initiated = 0,
  InProgress = 1,
  Resolved = 2,
  Finalized = 3,
}

export interface Battle {
  entity: PublicKey
  clan1: PublicKey
  clan2: PublicKey
  state: BattleState
  currentTurn: number
  clan1NinjasRemaining: number
  clan2NinjasRemaining: number
  winner: PublicKey
  goldReward: number
  karmaReward: number
  startedAt: number
  finishedAt: number
  delegated: boolean
}

export interface BattleEvent {
  turn: number
  attackerNinja: PublicKey
  defenderNinja: PublicKey
  damage: number
  defenderHealthRemaining: number
  defenderDefeated: boolean
  timestamp: number
}

export interface BattleSummary {
  battle: Battle
  events: BattleEvent[]
  duration: number
  totalDamageDealt: number
}

