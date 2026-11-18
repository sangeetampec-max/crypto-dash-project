import { useEffect, useState, useMemo } from 'react'
import Coindetails from './pages/coin-details '
import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/page'
import Header from './component /Header'
import Homepage from './pages/home'
import NotFoundPage from './pages/notfoundpage'
import ShopLaterPage from './pages/ShopLaterPage'
import NotificationBar from './component /NotificationBar'
import AuthModal from './component /AuthModal'
import CryptoChatModal from './component /CryptoChatModal'
import { ShopLaterProvider } from './context/ShopLaterContext'
import { AuthProvider } from './context/AuthContext'


const API_URL =
  import.meta.env.VITE_COINS_API_URL ||
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState('market_cap_desc')
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true)
        setError(null)
        const headers = API_KEY ? { 'x-cg-demo-api-key': API_KEY } : {}
        const response = await fetch(
          `${API_URL}&order=${sort}&per_page=${limit}&page=1&sparkline=false`,
          { headers }
        )

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              'CoinGecko API rate limit reached (429). Please wait a moment and refresh.'
            )
          }
          throw new Error(`Unable to fetch market data (${response.status})`)
        }

        const marketData = await response.json()
        setCoins(marketData)
      } catch (fetchError) {
        console.error('Market data request failed:', fetchError)
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [limit, sort])

  // Count active signals for header badge
  const notificationCount = useMemo(() => {
    if (!coins || coins.length === 0) return 0
    return coins.filter((coin) => {
      const dropFromHigh =
        coin.high_24h > 0
          ? ((coin.current_price - coin.high_24h) / coin.high_24h) * 100
          : 0
      const gainFromLow =
        coin.low_24h > 0
          ? ((coin.current_price - coin.low_24h) / coin.low_24h) * 100
          : 0
      return dropFromHigh <= -2 || gainFromLow >= 2.5
    }).length
  }, [coins])

  const renderHeader = () => (
    <Header
      onToggleNotifications={() => setIsNotificationOpen((prev) => !prev)}
      notificationCount={notificationCount}
    />
  )

  return (
    <AuthProvider>
      <ShopLaterProvider>
        <div className="onepiece-app-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {renderHeader()}
                  <Homepage
                    coins={coins}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    limit={limit}
                    setLimit={setLimit}
                    sort={sort}
                    setSort={setSort}
                    loading={loading}
                    error={error}
                  />
                </>
              }
            />
            <Route
              path="/shop-later"
              element={
                <>
                  {renderHeader()}
                  <ShopLaterPage />
                </>
              }
            />
            <Route
              path="/watchlist"
              element={
                <>
                  {renderHeader()}
                  <ShopLaterPage />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  {renderHeader()}
                  <AboutPage />
                </>
              }
            />
            <Route
              path="/coin/:id"
              element={
                <>
                  {renderHeader()}
                  <Coindetails />
                </>
              }
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>

          {/* Right-End Notification Bar */}
          <NotificationBar
            coins={coins}
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            onToggle={() => setIsNotificationOpen((prev) => !prev)}
          />

          {/* Sign In / Sign Up Modal */}
          <AuthModal />

          {/* Frontend CryptoGPT Assistant & Budget Planner */}
          <CryptoChatModal coins={coins} />
        </div>
      </ShopLaterProvider>
    </AuthProvider>
  )
}

export default App