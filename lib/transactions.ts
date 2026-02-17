import { collection, addDoc, doc, updateDoc, getDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface Transaction {
  id?: string
  userId: string
  userEmail: string
  type: 'deposit' | 'withdrawal'
  coin: string
  network?: string
  amount: number
  usdValue: number
  status: 'pending' | 'confirmed' | 'rejected' | 'completed'
  trackingPhrase: string
  depositAddress?: string
  withdrawalAddress?: string
  savingsType: 'flexible' | 'fixed-term'
  createdAt: string
  updatedAt: string
  confirmedAt?: string
  confirmedBy?: string
}

export interface Balance {
  amount: number
  usdValue: number
  savingsType: 'flexible' | 'fixed-term'
  lastUpdated: string
  startDate: string
  totalEarned: number
}

// Create a new deposit transaction
export const createDepositTransaction = async (
  userId: string,
  userEmail: string,
  coin: string,
  network: string | undefined,
  amount: number,
  usdValue: number,
  trackingPhrase: string,
  depositAddress: string,
  savingsType: 'flexible' | 'fixed-term'
) => {
  try {
    const transaction: any = {
      userId,
      userEmail,
      type: 'deposit',
      coin: coin.toUpperCase(),
      amount,
      usdValue,
      status: 'pending',
      trackingPhrase,
      depositAddress,
      savingsType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Only add network if it exists (Firestore doesn't allow undefined)
    if (network) {
      transaction.network = network.toUpperCase()
    }

    const docRef = await addDoc(collection(db, 'transactions'), transaction)
    return { success: true, transactionId: docRef.id }
  } catch (error: any) {
    console.error('Error creating transaction:', error)
    return { success: false, error: error.message }
  }
}

// Get all transactions for a user
export const getUserTransactions = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId)
    )
    const querySnapshot = await getDocs(q)
    const transactions: Transaction[] = []
    
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction)
    })
    
    // Sort by createdAt descending on the client side
    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return { success: true, transactions }
  } catch (error: any) {
    console.error('Error fetching transactions:', error)
    return { success: false, error: error.message, transactions: [] }
  }
}

// Get all pending transactions (for admin)
export const getPendingTransactions = async () => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('status', '==', 'pending')
    )
    const querySnapshot = await getDocs(q)
    const transactions: Transaction[] = []
    
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction)
    })
    
    // Sort by createdAt descending on the client side
    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return { success: true, transactions }
  } catch (error: any) {
    console.error('Error fetching pending transactions:', error)
    return { success: false, error: error.message, transactions: [] }
  }
}

// Get all transactions (for admin)
export const getAllTransactions = async () => {
  try {
    const q = query(
      collection(db, 'transactions'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const transactions: Transaction[] = []
    
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction)
    })
    
    return { success: true, transactions }
  } catch (error: any) {
    console.error('Error fetching all transactions:', error)
    return { success: false, error: error.message, transactions: [] }
  }
}

// Confirm/Approve a deposit transaction
export const confirmTransaction = async (
  transactionId: string,
  adminEmail: string
) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId)
    const transactionDoc = await getDoc(transactionRef)
    
    if (!transactionDoc.exists()) {
      return { success: false, error: 'Transaction not found' }
    }
    
    const transaction = transactionDoc.data() as Transaction
    
    // Update transaction status
    await updateDoc(transactionRef, {
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      confirmedBy: adminEmail,
      updatedAt: new Date().toISOString(),
    })
    
    // Update user balance
    const userRef = doc(db, 'users', transaction.userId)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      const balances = userData.balances || {}
      const coinKey = `${transaction.coin}_${transaction.savingsType}`
      
      const currentBalance = balances[coinKey] || {
        amount: 0,
        usdValue: 0,
        savingsType: transaction.savingsType,
        lastUpdated: new Date().toISOString(),
        startDate: new Date().toISOString(),
        totalEarned: 0,
      }
      
      // Add deposit amount to balance
      currentBalance.amount += transaction.amount
      currentBalance.usdValue += transaction.usdValue
      currentBalance.lastUpdated = new Date().toISOString()
      
      balances[coinKey] = currentBalance
      
      await updateDoc(userRef, { balances })
    }
    
    return { success: true, transaction }
  } catch (error: any) {
    console.error('Error confirming transaction:', error)
    return { success: false, error: error.message }
  }
}

// Reject a transaction
export const rejectTransaction = async (
  transactionId: string,
  adminEmail: string
) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId)
    
    await updateDoc(transactionRef, {
      status: 'rejected',
      confirmedAt: new Date().toISOString(),
      confirmedBy: adminEmail,
      updatedAt: new Date().toISOString(),
    })
    
    return { success: true }
  } catch (error: any) {
    console.error('Error rejecting transaction:', error)
    return { success: false, error: error.message }
  }
}

// Update user balance manually (admin function)
export const updateUserBalance = async (
  userId: string,
  coin: string,
  savingsType: 'flexible' | 'fixed-term',
  newAmount: number,
  newUsdValue: number,
  adminEmail: string
) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' }
    }
    
    const userData = userDoc.data()
    const balances = userData.balances || {}
    const coinKey = `${coin}_${savingsType}`
    
    const currentBalance = balances[coinKey] || {
      amount: 0,
      usdValue: 0,
      savingsType,
      lastUpdated: new Date().toISOString(),
      startDate: new Date().toISOString(),
      totalEarned: 0,
    }
    
    currentBalance.amount = newAmount
    currentBalance.usdValue = newUsdValue
    currentBalance.lastUpdated = new Date().toISOString()
    
    balances[coinKey] = currentBalance
    
    await updateDoc(userRef, { balances })
    
    // Log the manual adjustment
    await addDoc(collection(db, 'balance_adjustments'), {
      userId,
      coin,
      savingsType,
      previousAmount: currentBalance.amount,
      newAmount,
      previousUsdValue: currentBalance.usdValue,
      newUsdValue,
      adjustedBy: adminEmail,
      adjustedAt: new Date().toISOString(),
      reason: 'Manual adjustment by admin',
    })
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating balance:', error)
    return { success: false, error: error.message }
  }
}

// Get all users with their balances (for admin)
export const getAllUsersWithBalances = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const users: any[] = []
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      users.push({
        id: doc.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        accountType: userData.accountType,
        balances: userData.balances || {},
        createdAt: userData.createdAt,
        isAdmin: userData.isAdmin || false,
      })
    })
    
    return { success: true, users }
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return { success: false, error: error.message, users: [] }
  }
}

// Get user by ID with full details
export const getUserById = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' }
    }
    
    const userData = userDoc.data()
    
    // Get user's transactions
    const transactionsResult = await getUserTransactions(userId)
    
    return {
      success: true,
      user: {
        id: userDoc.id,
        ...userData,
      },
      transactions: transactionsResult.transactions || [],
    }
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return { success: false, error: error.message }
  }
}
