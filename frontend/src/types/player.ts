import { PublicKey } from '@solana/web3.js'

export interface PlayerProfile {
  entity: PublicKey
  authority: PublicKey
  karmaBalance: number
  karmaStaked: number
  totalBattles: number
  totalWins: number
  totalLosses: number
  highestStreak: number
  currentStreak: number
  clan: PublicKey
  joinedAt: number
}

export function getPlayerWinRate(player: PlayerProfile): number {
  if (player.totalBattles === 0) return 0
  return (player.totalWins / player.totalBattles) * 100
}

