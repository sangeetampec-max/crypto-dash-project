import { Link } from 'react-router-dom'
import { useShopLater } from '../context/ShopLaterContext'

const ShopLaterPage = () => {
  const { shopLaterCoins, removeFromShopLater, clearShopLater } = useShopLater()

  const totalPrice = shopLaterCoins.reduce(
    (sum, coin) => sum + (coin.current_price || 0),
    0
  )

  return (
    <div className="shop-later-container onepiece-chest-container">
      <div className="shop-later-header">
        <div>
          <h1>🏴‍☠️ Pirate Treasure Chest</h1>
          <p className="shop-later-subtitle">
            Cryptocurrencies and bounties stashed to trade or shop on another day across the Grand Line.
          </p>
        </div>
        {shopLaterCoins.length > 0 && (
          <button
            type="button"
            className="clear-all-btn"
            onClick={clearShopLater}
            title="Empty treasure chest"
          >
            Empty Chest
          </button>
        )}
      </div>

      {shopLaterCoins.length > 0 ? (
        <>
          <div className="shop-later-summary-card">
            <div className="summary-item">
              <span className="summary-label">Treasures Stashed</span>
              <span className="summary-value">{shopLaterCoins.length} Bounties</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Combined Treasure Bounty</span>
              <span className="summary-value">
                ฿ {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', fontWeight: 500 }}>
                  (${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                </span>
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Log Pose Status</span>
              <span className="summary-value status-badge">⚓ Locked in Ship Vault</span>
            </div>
          </div>


          <div className="grid" style={{ marginTop: '2rem' }}>
            {shopLaterCoins.map((coin) => (
              <div key={coin.id} className="coin-card shop-later-card">
                <div className="coin-header">
                  {coin.image && (
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="coin-image"
                    />
                  )}
                  <div className="coin-title-group">
                    <h2>{coin.name}</h2>
                    <p className="symbol">{coin.symbol?.toUpperCase()}</p>
                  </div>
                </div>

                <p>Price: ${coin.current_price?.toLocaleString()}</p>
                <p
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? 'positive'
                      : 'negative'
                  }
                >
                  24h: {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
                {coin.market_cap > 0 && (
                  <p>Market Cap: ${coin.market_cap?.toLocaleString()}</p>
                )}

                <div className="shop-later-card-actions">
                  <Link to={`/coin/${coin.id}`} className="view-details-btn">
                    View Details &rarr;
                  </Link>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromShopLater(coin.id)}
                    title="Remove from saved list"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="shop-later-empty onepiece-empty-chest">
          <div className="empty-icon">💎☠️</div>
          <h2>Your Treasure Chest is Empty</h2>
          <p>
            You haven't stashed any cryptocurrency bounties yet.
            Explore the Grand Line market and click <strong>+ Chest</strong> on any bounty you want to shop for on another day!
          </p>
          <Link to="/" className="explore-btn">
            ⚓ Set Sail to Market
          </Link>
        </div>
      )}
    </div>

  )
}

export default ShopLaterPage
