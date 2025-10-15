import { Keypair, PublicKey, Transaction } from '@solana/web3.js'

const SESSION_KEY_STORAGE_KEY = 'dojo_wars_session_key'
const SESSION_EXPIRY_STORAGE_KEY = 'dojo_wars_session_expiry'

export interface SessionKeyData {
  publicKey: PublicKey
  expiresAt: number
}

/**
 * Generate a new ephemeral session keypair
 * This keypair is used for gasless transactions in the ER
 */
export function generateSessionKey(): Keypair {
  return Keypair.generate()
}

/**
 * Store session key in local storage (encrypted in production)
 */
export function storeSessionKey(keypair: Keypair, durationMinutes: number = 60): void {
  const expiresAt = Date.now() + (durationMinutes * 60 * 1000)
  
  // Convert keypair to base58 for storage
  const secretKeyArray = Array.from(keypair.secretKey)
  
  localStorage.setItem(SESSION_KEY_STORAGE_KEY, JSON.stringify(secretKeyArray))
  localStorage.setItem(SESSION_EXPIRY_STORAGE_KEY, expiresAt.toString())
  
  console.log('Session key stored, expires in', durationMinutes, 'minutes')
}

/**
 * Retrieve stored session key
 * Returns null if expired or not found
 */
export function getStoredSessionKey(): Keypair | null {
  const storedKey = localStorage.getItem(SESSION_KEY_STORAGE_KEY)
  const storedExpiry = localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)
  
  if (!storedKey || !storedExpiry) {
    return null
  }
  
  const expiresAt = parseInt(storedExpiry)
  if (Date.now() > expiresAt) {
    clearSessionKey()
    return null
  }
  
  try {
    const secretKeyArray = JSON.parse(storedKey)
    const keypair = Keypair.fromSecretKey(new Uint8Array(secretKeyArray))
    return keypair
  } catch (error) {
    console.error('Error parsing session key:', error)
    clearSessionKey()
    return null
  }
}

/**
 * Clear session key from storage
 */
export function clearSessionKey(): void {
  localStorage.removeItem(SESSION_KEY_STORAGE_KEY)
  localStorage.removeItem(SESSION_EXPIRY_STORAGE_KEY)
  console.log('Session key cleared')
}

/**
 * Check if session key is valid
 */
export function isSessionKeyValid(): boolean {
  const storedExpiry = localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)
  if (!storedExpiry) return false
  
  const expiresAt = parseInt(storedExpiry)
  return Date.now() < expiresAt
}

/**
 * Get time remaining for session (in minutes)
 */
export function getSessionTimeRemaining(): number {
  const storedExpiry = localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)
  if (!storedExpiry) return 0
  
  const expiresAt = parseInt(storedExpiry)
  const remaining = expiresAt - Date.now()
  return Math.max(0, Math.floor(remaining / 60000))
}

/**
 * Create a transaction to authorize a session key
 * The user's main wallet signs this once to grant temporary authority
 */
export async function createSessionKeyAuthorization(
  userPublicKey: PublicKey,
  sessionKeyPublicKey: PublicKey,
  durationSeconds: number = 3600,
): Promise<Transaction> {
  const transaction = new Transaction()
  
  // TODO: Add actual session key authorization instruction
  // This would use MagicBlock's session key program
  
  console.log(`Authorizing session key ${sessionKeyPublicKey.toString()} for ${durationSeconds}s`)
  
  return transaction
}

