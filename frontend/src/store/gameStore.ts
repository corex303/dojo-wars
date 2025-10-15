import { create } from 'zustand'
import { PublicKey } from '@solana/web3.js'
import { Clan } from '@types/clan'
import { Ninja } from '@types/ninja'
import { PlayerProfile } from '@types/player'
import { Battle } from '@types/battle'

export enum GameView {
  MainMenu,
  Dojo,
  Battle,
  Recruitment,
  Training,
  Inventory,
}

interface GameState {
  // Wallet & Player
  walletConnected: boolean
  walletPublicKey: PublicKey | null
  playerProfile: PlayerProfile | null
  sessionKey: PublicKey | null
  
  // Game Data
  clan: Clan | null
  ninjas: Ninja[]
  activeBattle: Battle | null
  
  // UI State
  currentView: GameView
  loading: boolean
  error: string | null
  
  // Actions
  setWalletConnected: (connected: boolean, publicKey: PublicKey | null) => void
  setPlayerProfile: (profile: PlayerProfile | null) => void
  setClan: (clan: Clan | null) => void
  setNinjas: (ninjas: Ninja[]) => void
  setActiveBattle: (battle: Battle | null) => void
  setCurrentView: (view: GameView) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSessionKey: (key: PublicKey | null) => void
  reset: () => void
}

const initialState = {
  walletConnected: false,
  walletPublicKey: null,
  playerProfile: null,
  sessionKey: null,
  clan: null,
  ninjas: [],
  activeBattle: null,
  currentView: GameView.MainMenu,
  loading: false,
  error: null,
}

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  
  setWalletConnected: (connected, publicKey) => 
    set({ walletConnected: connected, walletPublicKey: publicKey }),
  
  setPlayerProfile: (profile) => 
    set({ playerProfile: profile }),
  
  setClan: (clan) => 
    set({ clan }),
  
  setNinjas: (ninjas) => 
    set({ ninjas }),
  
  setActiveBattle: (battle) => 
    set({ activeBattle: battle }),
  
  setCurrentView: (view) => 
    set({ currentView: view }),
  
  setLoading: (loading) => 
    set({ loading }),
  
  setError: (error) => 
    set({ error }),
  
  setSessionKey: (key) => 
    set({ sessionKey: key }),
  
  reset: () => 
    set(initialState),
}))

