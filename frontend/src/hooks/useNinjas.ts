import { useState, useEffect, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { Ninja, Element } from '@types/ninja'
import { useGameStore } from '@store/gameStore'

/**
 * Hook for managing ninja data and actions
 */
export function useNinjas() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const { clan, ninjas, setNinjas, setLoading, setError } = useGameStore()
  const [isRecruiting, setIsRecruiting] = useState(false)
  const [isTraining, setIsTraining] = useState(false)

  /**
   * Fetch all ninjas for the current clan
   */
  const fetchNinjas = useCallback(async () => {
    if (!clan) {
      setNinjas([])
      return
    }

    setLoading(true)

    try {
      // TODO: Fetch ninja component data for each ninja in clan
      console.log('Fetching ninjas for clan:', clan.entity.toString())

      // In production:
      // 1. Get all ninja pubkeys from clan.ninjas array
      // 2. Fetch each ninja component account
      // 3. Parse the data into Ninja objects
      
      setNinjas([])
    } catch (error) {
      console.error('Error fetching ninjas:', error)
      setError('Failed to fetch ninjas')
    } finally {
      setLoading(false)
    }
  }, [clan, connection, setNinjas, setLoading, setError])

  /**
   * Recruit a new ninja
   */
  const recruitNinja = useCallback(async (element: Element) => {
    if (!clan || !publicKey) {
      throw new Error('Clan or wallet not found')
    }

    if (clan.ninjaCount >= 25) {
      throw new Error('Clan is full (max 25 ninjas)')
    }

    setIsRecruiting(true)
    setError(null)

    try {
      // TODO: Create recruit_ninja transaction
      // TODO: Sign and send
      // TODO: Wait for confirmation
      // TODO: Fetch updated data

      console.log('Recruiting ninja with element:', element)

      // Simulate successful recruitment
      setTimeout(() => {
        fetchNinjas()
      }, 1000)
    } catch (error) {
      console.error('Error recruiting ninja:', error)
      setError('Failed to recruit ninja')
      throw error
    } finally {
      setIsRecruiting(false)
    }
  }, [clan, publicKey, fetchNinjas, setError])

  /**
   * Train a ninja to improve stats
   */
  const trainNinja = useCallback(async (ninjaId: PublicKey, statType: 0 | 1 | 2) => {
    if (!clan || !publicKey) {
      throw new Error('Clan or wallet not found')
    }

    setIsTraining(true)
    setError(null)

    try {
      // TODO: Create train_ninja transaction
      // statType: 0=health, 1=power, 2=speed

      console.log('Training ninja:', ninjaId.toString(), 'stat:', statType)

      // Simulate successful training
      setTimeout(() => {
        fetchNinjas()
      }, 1000)
    } catch (error) {
      console.error('Error training ninja:', error)
      setError('Failed to train ninja')
      throw error
    } finally {
      setIsTraining(false)
    }
  }, [clan, publicKey, fetchNinjas, setError])

  // Fetch ninjas when clan changes
  useEffect(() => {
    fetchNinjas()
  }, [fetchNinjas])

  return {
    ninjas,
    isRecruiting,
    isTraining,
    fetchNinjas,
    recruitNinja,
    trainNinja,
  }
}

