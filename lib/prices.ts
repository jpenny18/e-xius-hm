// CoinGecko API integration for real-time crypto prices

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

// Map our coin IDs to CoinGecko IDs
const coinGeckoIds: { [key: string]: string } = {
  btc: 'bitcoin',
  eth: 'ethereum',
  xrp: 'ripple',
  bnb: 'binancecoin',
  usdt: 'tether',
  trx: 'tron',
  usdc: 'usd-coin',
  sol: 'solana',
  ltc: 'litecoin',
}

// Cache for prices (5 minute cache)
const priceCache: { [key: string]: { price: number; timestamp: number } } = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Fetch current price for a coin in USD
export const getCryptoPrice = async (coinId: string): Promise<number> => {
  const coin = coinId.toLowerCase()
  const geckoId = coinGeckoIds[coin]
  
  if (!geckoId) {
    console.warn(`No CoinGecko ID found for ${coin}`)
    return 0
  }

  // Check cache
  const cached = priceCache[coin]
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.price
  }

  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${geckoId}&vs_currencies=usd`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch price')
    }
    
    const data = await response.json()
    const price = data[geckoId]?.usd || 0
    
    // Update cache
    priceCache[coin] = {
      price,
      timestamp: Date.now(),
    }
    
    return price
  } catch (error) {
    console.error(`Error fetching price for ${coin}:`, error)
    
    // Return cached price if available, even if expired
    if (cached) {
      return cached.price
    }
    
    // Fallback prices (approximate)
    const fallbackPrices: { [key: string]: number } = {
      btc: 91000,
      eth: 2660,
      xrp: 0.50,
      bnb: 300,
      usdt: 1,
      trx: 0.08,
      usdc: 1,
      sol: 150,
      ltc: 75,
    }
    
    return fallbackPrices[coin] || 0
  }
}

// Convert USD amount to crypto amount
export const usdToCrypto = async (usdAmount: number, coinId: string): Promise<number> => {
  const price = await getCryptoPrice(coinId)
  if (price === 0) return 0
  return usdAmount / price
}

// Convert crypto amount to USD
export const cryptoToUsd = async (cryptoAmount: number, coinId: string): Promise<number> => {
  const price = await getCryptoPrice(coinId)
  return cryptoAmount * price
}

// Fetch multiple prices at once
export const getMultiplePrices = async (coinIds: string[]): Promise<{ [key: string]: number }> => {
  const prices: { [key: string]: number } = {}
  
  // Check which prices we need to fetch (not in cache or expired)
  const toFetch: string[] = []
  const geckoIdsToFetch: string[] = []
  
  for (const coin of coinIds) {
    const cached = priceCache[coin.toLowerCase()]
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      prices[coin.toLowerCase()] = cached.price
    } else {
      const geckoId = coinGeckoIds[coin.toLowerCase()]
      if (geckoId) {
        toFetch.push(coin.toLowerCase())
        geckoIdsToFetch.push(geckoId)
      }
    }
  }
  
  if (toFetch.length === 0) {
    return prices
  }
  
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${geckoIdsToFetch.join(',')}&vs_currencies=usd`,
      { next: { revalidate: 300 } }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices')
    }
    
    const data = await response.json()
    
    // Map results back to our coin IDs
    for (let i = 0; i < toFetch.length; i++) {
      const coin = toFetch[i]
      const geckoId = geckoIdsToFetch[i]
      const price = data[geckoId]?.usd || 0
      
      prices[coin] = price
      priceCache[coin] = {
        price,
        timestamp: Date.now(),
      }
    }
  } catch (error) {
    console.error('Error fetching multiple prices:', error)
    
    // Use fallback prices
    const fallbackPrices: { [key: string]: number } = {
      btc: 91000,
      eth: 2660,
      xrp: 0.50,
      bnb: 300,
      usdt: 1,
      trx: 0.08,
      usdc: 1,
      sol: 150,
      ltc: 75,
    }
    
    for (const coin of toFetch) {
      prices[coin] = fallbackPrices[coin] || 0
    }
  }
  
  return prices
}

// Format crypto amount with appropriate decimals
export const formatCryptoAmount = (amount: number, coinId: string): string => {
  const coin = coinId.toLowerCase()
  
  // Stablecoins and low-value coins get 2-4 decimals
  if (['usdt', 'usdc', 'trx', 'xrp'].includes(coin)) {
    return amount.toFixed(4)
  }
  
  // High-value coins like BTC get more decimals
  if (['btc'].includes(coin)) {
    return amount.toFixed(8)
  }
  
  // Everything else gets 6 decimals
  return amount.toFixed(6)
}
