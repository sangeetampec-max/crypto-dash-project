import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useShopLater } from '../context/ShopLaterContext'

const NotificationBar = ({ coins = [], isOpen, onClose, onToggle }) => {
  const [filter, setFilter] = useState('all') // 'all', 'drops', 'gains'
  const { isSaved, toggleShopLater } = useShopLater()

  // Generate dynamic live alerts based on real market data
  const alerts = useMemo(() => {
    if (!coins || coins.length === 0) return []

    const list = []

    coins.forEach((coin) => {
      const currentPrice = coin.current_price || 0
      const high24h = coin.high_24h || currentPrice
      const low24h = coin.low_24h || currentPrice
      const change24h = coin.price_change_percentage_24h || 0

      // Calculate drop percentage from recent 24h high
      const dropFromHigh = high24h > 0 ? ((currentPrice - high24h) / high24h) * 100 : 0
      // Calculate gain percentage from recent 24h low
      const gainFromLow = low24h > 0 ? ((currentPrice - low24h) / low24h) * 100 : 0

      // Dips / Drops
      if (dropFromHigh <= -2 || change24h <= -1) {
        const severity = dropFromHigh <= -6 || change24h <= -4 ? 'critical' : 'moderate'
        list.push({
          id: `drop-${coin.id}`,
          coin,
          type: 'drop',
          severity,
          title: `${coin.name} (${coin.symbol.toUpperCase()}) Dips!`,
          change: dropFromHigh.toFixed(2),
          change24h: change24h.toFixed(2),
          message:
            dropFromHigh <= -5
              ? `Whirlpool Alert: Price dropped ${Math.abs(dropFromHigh).toFixed(1)}% from today's high! Prime buying opportunity.`
              : `Price pulled back ${Math.abs(dropFromHigh).toFixed(1)}% in recent hours. Monitoring for support.`,
          badge: dropFromHigh <= -5 ? '⚡ Big Drop' : '🔻 Price Dip',
          timestamp: 'Live Market Signal',
        })
      }

      // Bullish Surges / Going Up
      if (gainFromLow >= 2.5 || change24h >= 1.5) {
        list.push({
          id: `gain-${coin.id}`,
          coin,
          type: 'gain',
          severity: change24h >= 4 || gainFromLow >= 6 ? 'high' : 'normal',
          title: `${coin.name} (${coin.symbol.toUpperCase()}) Surging Up!`,
          change: `+${gainFromLow.toFixed(2)}`,
          change24h: `+${change24h.toFixed(2)}`,
          message:
            change24h >= 4
              ? `Straw Hat Full Sail: Bullish breakout! Surging +${gainFromLow.toFixed(1)}% off recent lows.`
              : `Upward momentum detected: +${gainFromLow.toFixed(1)}% climb. Buyers stepping in.`,
          badge: change24h >= 4 ? '🚀 Breakout' : '📈 Going Up',
          timestamp: 'Live Market Signal',
        })
      }
    })

    // Sort so strongest signals come first
    return list.sort((a, b) => {
      const aVal = Math.abs(parseFloat(a.change))
      const bVal = Math.abs(parseFloat(b.change))
      return bVal - aVal
    })
  }, [coins])

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'drops') return alert.type === 'drop'
    if (filter === 'gains') return alert.type === 'gain'
    return true
  })

  const dropCount = alerts.filter((a) => a.type === 'drop').length
  const gainCount = alerts.filter((a) => a.type === 'gain').length

  return (
    <>
      {/* Floating Right-Edge Trigger Button */}
      <button
        type="button"
        className={`floating-alert-trigger ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        aria-label="Toggle Grand Line Notification Bar"
        title="Grand Line Market Radar (Price Drops & Surges)"
      >
        <span className="radar-icon">📡</span>
        <span className="trigger-text">Pirate Radar</span>
        {alerts.length > 0 && (
          <span className="alert-pulse-badge">{alerts.length}</span>
        )}
      </button>

      {/* Backdrop overlay when open on mobile */}
      {isOpen && (
        <div
          className="notification-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Right-Hand Notification Panel */}
      <aside
        className={`notification-bar-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Market Notifications"
      >
        <div className="notification-header">
          <div className="notification-title-group">
            <span className="pirate-compass">🧭</span>
            <div>
              <h3>Grand Line Radar</h3>
              <p className="radar-sub">Price Dips & Upward Surges</p>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close notification drawer"
          >
            &times;
          </button>
        </div>

        {/* Filter Pills */}
        <div className="notification-filters">
          <button
            type="button"
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({alerts.length})
          </button>
          <button
            type="button"
            className={`filter-pill drop-pill ${filter === 'drops' ? 'active' : ''}`}
            onClick={() => setFilter('drops')}
          >
            🔻 Drops ({dropCount})
          </button>
          <button
            type="button"
            className={`filter-pill gain-pill ${filter === 'gains' ? 'active' : ''}`}
            onClick={() => setFilter('gains')}
          >
            🚀 Surges ({gainCount})
          </button>
        </div>

        {/* Alert List */}
        <div className="notification-list">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const saved = isSaved(alert.coin.id)
              return (
                <div
                  key={alert.id}
                  className={`alert-card ${alert.type} ${alert.severity}`}
                >
                  <div className="alert-card-top">
                    <span className={`alert-badge ${alert.type}`}>
                      {alert.badge}
                    </span>
                    <span className="alert-change">
                      {alert.type === 'drop' ? `${alert.change}%` : `${alert.change}%`}
                    </span>
                  </div>

                  <div className="alert-coin-row">
                    {alert.coin.image && (
                      <img
                        src={alert.coin.image}
                        alt={alert.coin.name}
                        className="alert-coin-img"
                      />
                    )}
                    <span className="alert-coin-name">{alert.title}</span>
                  </div>

                  <p className="alert-message">{alert.message}</p>

                  <div className="alert-price-info">
                    <span className="price-label">Current Bounty:</span>
                    <span className="price-value">
                      ฿ {alert.coin.current_price?.toLocaleString()} (${alert.coin.current_price?.toLocaleString()})
                    </span>
                  </div>

                  <div className="alert-card-actions">
                    <Link
                      to={`/coin/${alert.coin.id}`}
                      className="alert-link-btn"
                      onClick={onClose}
                    >
                      Inspect Coin &rarr;
                    </Link>
                    <button
                      type="button"
                      className={`alert-shop-btn ${saved ? 'saved' : ''}`}
                      onClick={() => toggleShopLater(alert.coin)}
                      title={saved ? 'In Shop Later' : 'Save to Shop Later'}
                    >
                      {saved ? '★ In List' : '+ Shop Later'}
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="notification-empty">
              <span className="empty-sea-icon">🌊</span>
              <h4>Calm Waters in the Grand Line</h4>
              <p>
                No extreme price drops or surges detected at this exact moment.
                Keep an eye on the radar as the market moves!
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default NotificationBar
