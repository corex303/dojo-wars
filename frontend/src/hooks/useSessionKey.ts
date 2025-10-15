import { useState, useEffect, useCallback } from 'react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  generateSessionKey,
  storeSessionKey,
  getStoredSessionKey,
  clearSessionKey,
  isSessionKeyValid,
  getSessionTimeRemaining,
} from '@utils/sessionKeyManager'
import { useGameStore } from '@store/gameStore'

export function useSessionKey() {
  const { publicKey, signTransaction } = useWallet()
  const { sessionKey, setSessionKey } = useGameStore()
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isCreating, setIsCreating] = useState(false)

  // Check for existing session key on mount
  useEffect(() => {
    if (!publicKey) {
      clearSessionKey()
      setSessionKey(null)
      return
    }

    const stored = getStoredSessionKey()
    if (stored && isSessionKeyValid()) {
      setSessionKey(stored.publicKey)
      setTimeRemaining(getSessionTimeRemaining())
    }
  }, [publicKey, setSessionKey])

  // Update time remaining every minute
  useEffect(() => {
    if (!sessionKey) return

    const interval = setInterval(() => {
      const remaining = getSessionTimeRemaining()
      setTimeRemaining(remaining)

      if (remaining === 0) {
        setSessionKey(null)
        clearSessionKey()
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [sessionKey, setSessionKey])

  /**
   * Create a new session key
   */
  const createSessionKey = useCallback(async (durationMinutes: number = 60) => {
    if (!publicKey || !signTransaction) {
      throw new Error('Wallet not connected')
    }

    setIsCreating(true)

    try {
      // Generate new keypair
      const newSessionKey = generateSessionKey()

      // TODO: Create authorization transaction
      // const authTx = await createSessionKeyAuthorization(
      //   publicKey,
      //   newSessionKey.publicKey,
      //   durationMinutes * 60
      // )
      // const signedTx = await signTransaction(authTx)
      // await connection.sendRawTransaction(signedTx.serialize())

      // Store session key
      storeSessionKey(newSessionKey, durationMinutes)
      setSessionKey(newSessionKey.publicKey)
      setTimeRemaining(durationMinutes)

      console.log('Session key created:', newSessionKey.publicKey.toString())
      
      return newSessionKey.publicKey
    } catch (error) {
      console.error('Error creating session key:', error)
      throw error
    } finally {
      setIsCreating(false)
    }
  }, [publicKey, signTransaction, setSessionKey])

  /**
   * Revoke current session key
   */
  const revokeSessionKey = useCallback(() => {
    clearSessionKey()
    setSessionKey(null)
    setTimeRemaining(0)
  }, [setSessionKey])

  return {
    sessionKey,
    timeRemaining,
    isCreating,
    hasValidSession: !!sessionKey && isSessionKeyValid(),
    createSessionKey,
    revokeSessionKey,
  }
}

