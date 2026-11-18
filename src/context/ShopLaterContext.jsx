import { createContext, useContext, useEffect, useState } from 'react'

const ShopLaterContext = createContext()

const STORAGE_KEY = 'crypto_shop_later_list'

export const ShopLaterProvider = ({ children }) => {
  const [shopLaterCoins, setShopLaterCoins] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      console.error('Failed to load saved crypto list from localStorage', err)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shopLaterCoins))
    } catch (err) {
      console.error('Failed to save crypto list to localStorage', err)
    }
  }, [shopLaterCoins])

  const normalizeCoin = (coin) => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image:
        typeof coin.image === 'string'
          ? coin.image
          : coin.image?.large || coin.image?.small || '',
      current_price:
        coin.current_price ?? coin.market_data?.current_price?.usd ?? 0,
      price_change_percentage_24h:
        coin.price_change_percentage_24h ??
        coin.market_data?.price_change_percentage_24h ??
        0,
      market_cap:
        coin.market_cap ?? coin.market_data?.market_cap?.usd ?? 0,
      savedAt: new Date().toISOString(),
    }
  }

  const isSaved = (coinId) => {
    return shopLaterCoins.some((c) => c.id === coinId)
  }

  const addToShopLater = (coin) => {
    if (!coin || !coin.id) return
    setShopLaterCoins((prev) => {
      if (prev.some((c) => c.id === coin.id)) return prev
      return [normalizeCoin(coin), ...prev]
    })
  }

  const removeFromShopLater = (coinId) => {
    setShopLaterCoins((prev) => prev.filter((c) => c.id !== coinId))
  }

  const toggleShopLater = (coin) => {
    if (!coin || !coin.id) return
    if (isSaved(coin.id)) {
      removeFromShopLater(coin.id)
    } else {
      addToShopLater(coin)
    }
  }

  const clearShopLater = () => {
    setShopLaterCoins([])
  }

  return (
    <ShopLaterContext.Provider
      value={{
        shopLaterCoins,
        isSaved,
        addToShopLater,
        removeFromShopLater,
        toggleShopLater,
        clearShopLater,
      }}
    >
      {children}
    </ShopLaterContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useShopLater = () => {
  const context = useContext(ShopLaterContext)
  if (!context) {
    throw new Error('useShopLater must be used within a ShopLaterProvider')
  }
  return context
}
