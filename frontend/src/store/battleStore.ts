import { create } from 'zustand'
import { Battle, BattleEvent, BattleState } from '@types/battle'
import { PublicKey } from '@solana/web3.js'

interface BattleStore {
  // Current battle
  battle: Battle | null
  events: BattleEvent[]
  
  // Battle history
  battleHistory: Battle[]
  
  // UI state
  showBattleAnimation: boolean
  currentAnimationTurn: number
  
  // Actions
  setBattle: (battle: Battle | null) => void
  addBattleEvent: (event: BattleEvent) => void
  clearBattleEvents: () => void
  addToBattleHistory: (battle: Battle) => void
  setShowBattleAnimation: (show: boolean) => void
  setCurrentAnimationTurn: (turn: number) => void
  reset: () => void
}

const initialState = {
  battle: null,
  events: [],
  battleHistory: [],
  showBattleAnimation: false,
  currentAnimationTurn: 0,
}

export const useBattleStore = create<BattleStore>((set) => ({
  ...initialState,
  
  setBattle: (battle) => 
    set({ battle }),
  
  addBattleEvent: (event) => 
    set((state) => ({ events: [...state.events, event] })),
  
  clearBattleEvents: () => 
    set({ events: [] }),
  
  addToBattleHistory: (battle) => 
    set((state) => ({ battleHistory: [battle, ...state.battleHistory.slice(0, 9)] })),
  
  setShowBattleAnimation: (show) => 
    set({ showBattleAnimation: show }),
  
  setCurrentAnimationTurn: (turn) => 
    set({ currentAnimationTurn: turn }),
  
  reset: () => 
    set(initialState),
}))

