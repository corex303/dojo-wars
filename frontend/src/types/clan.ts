import { PublicKey } from '@solana/web3.js'

export interface Clan {
  entity: PublicKey
  owner: PublicKey
  gold: number
  dojoLevel: number
  ninjaCount: number
  ninjas: PublicKey[]
  totalBattles: number
  wins: number
  losses: number
  createdAt: number
}

export function getWinRate(clan: Clan): number {
  if (clan.totalBattles === 0) return 0
  return (clan.wins / clan.totalBattles) * 100
}

export function getDojoUpgradeCost(currentLevel: number): number {
  return 500 * currentLevel
}

