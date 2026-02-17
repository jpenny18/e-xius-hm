import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from './firebase'

// Interest rates for flexible savings
const flexibleRates: { [key: string]: number } = {
  BTC: 9,
  ETH: 12.3,
  XRP: 9.3,
  BNB: 8,
  USDT: 16,
  TRX: 8,
  USDC: 14.5,
  SOL: 10,
  LTC: 7,
}

// Interest rates for fixed-term savings
const fixedRates: { [key: string]: number } = {
  BTC: 9.8,
  ETH: 14.6,
  XRP: 10.3,
  BNB: 9.6,
  USDT: 26,
  TRX: 12,
  USDC: 22.5,
  SOL: 16,
  LTC: 13,
}

// Calculate daily interest for a single balance
export const calculateDailyInterest = (
  principal: number,
  annualRate: number
): number => {
  // Daily compound interest formula: P * (1 + r/365) - P
  const dailyRate = annualRate / 100 / 365
  const interest = principal * dailyRate
  return interest
}

// Get the APY rate for a coin and savings type
export const getAPY = (coin: string, savingsType: 'flexible' | 'fixed-term'): number => {
  const rates = savingsType === 'flexible' ? flexibleRates : fixedRates
  return rates[coin.toUpperCase()] || 0
}

// Apply daily interest to all users
export const applyDailyInterestToAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const results = {
      totalUsers: 0,
      usersProcessed: 0,
      totalInterestAdded: 0,
      errors: [] as string[],
    }

    for (const userDoc of usersSnapshot.docs) {
      results.totalUsers++
      
      try {
        const userData = userDoc.data()
        const balances = userData.balances || {}
        
        if (Object.keys(balances).length === 0) {
          continue // Skip users with no balances
        }

        let userInterestAdded = 0
        const updatedBalances: any = {}

        // Calculate interest for each balance
        for (const [key, balance] of Object.entries(balances) as [string, any][]) {
          const [coin, savingsType] = key.split('_')
          const apy = getAPY(coin, savingsType as 'flexible' | 'fixed-term')
          
          if (apy > 0 && balance.usdValue > 0) {
            const dailyInterest = calculateDailyInterest(balance.usdValue, apy)
            const dailyInterestCoin = calculateDailyInterest(balance.amount, apy)
            
            // Update balance with interest
            updatedBalances[key] = {
              ...balance,
              amount: balance.amount + dailyInterestCoin,
              usdValue: balance.usdValue + dailyInterest,
              totalEarned: (balance.totalEarned || 0) + dailyInterest,
              lastUpdated: new Date().toISOString(),
            }
            
            userInterestAdded += dailyInterest
          } else {
            // Keep balance as is
            updatedBalances[key] = balance
          }
        }

        if (userInterestAdded > 0) {
          // Update user's balances
          await updateDoc(doc(db, 'users', userDoc.id), {
            balances: updatedBalances,
          })

          // Log the interest payment
          await addDoc(collection(db, 'interest_payments'), {
            userId: userDoc.id,
            userEmail: userData.email,
            totalInterestAdded: userInterestAdded,
            balances: updatedBalances,
            timestamp: new Date().toISOString(),
            type: 'daily_compound',
          })

          results.usersProcessed++
          results.totalInterestAdded += userInterestAdded
        }
      } catch (error: any) {
        results.errors.push(`Error processing user ${userDoc.id}: ${error.message}`)
      }
    }

    return {
      success: true,
      results,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

// Calculate projected earnings
export const calculateProjectedEarnings = (
  principal: number,
  annualRate: number,
  days: number
): { total: number; interest: number } => {
  // Compound daily: A = P(1 + r/365)^days
  const dailyRate = annualRate / 100 / 365
  const total = principal * Math.pow(1 + dailyRate, days)
  const interest = total - principal
  
  return {
    total,
    interest,
  }
}

// Get interest payment history for a user
export const getUserInterestHistory = async (userId: string) => {
  try {
    const paymentsSnapshot = await getDocs(collection(db, 'interest_payments'))
    const payments: any[] = []
    
    paymentsSnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.userId === userId) {
        payments.push({ id: doc.id, ...data })
      }
    })
    
    // Sort by timestamp descending
    payments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    return {
      success: true,
      payments,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      payments: [],
    }
  }
}

// Get total platform interest paid
export const getTotalPlatformInterest = async () => {
  try {
    const paymentsSnapshot = await getDocs(collection(db, 'interest_payments'))
    let total = 0
    
    paymentsSnapshot.forEach((doc) => {
      const data = doc.data()
      total += data.totalInterestAdded || 0
    })
    
    return {
      success: true,
      total,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      total: 0,
    }
  }
}
