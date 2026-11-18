import { Link } from 'react-router-dom'
import { useShopLater } from '../context/ShopLaterContext'

const CoinCard = ({ coin }) => {
  const { isSaved, toggleShopLater } = useShopLater()
  const saved = isSaved(coin.id)

  const handleShopLaterClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleShopLater(coin)
  }

  const isPositive = (coin.price_change_percentage_24h || 0) >= 0

  return (
    <Link to={`/coin/${coin.id}`} className="coin-card onepiece-bounty-card">
      <div className="bounty-card-banner">
        <span className="wanted-badge">WANTED</span>
        {coin.market_cap_rank && (
          <span className="bounty-rank">Rank #{coin.market_cap_rank}</span>
        )}
      </div>

      <div className="coin-header">
        <div className="coin-image-frame">
          <img src={coin.image} alt={coin.name} className="coin-image" />
        </div>
        <div className="coin-title-group">
          <h2>{coin.name}</h2>
          <p className="symbol">{coin.symbol.toUpperCase()}</p>
        </div>
        <button
          type="button"
          className={`shop-later-card-btn ${saved ? 'saved' : ''}`}
          onClick={handleShopLaterClick}
          title={saved ? 'In Treasure Chest' : 'Add to Treasure Chest'}
          aria-label={saved ? 'In Treasure Chest' : 'Add to Treasure Chest'}
        >
          {saved ? '★ In Chest' : '+ Chest'}
        </button>
      </div>

      <div className="bounty-price-section">
        <span className="bounty-label">BOUNTY:</span>
        <div className="bounty-price-row">
          <span className="berry-symbol">฿</span>
          <span className="bounty-amount">
            {coin.current_price?.toLocaleString()}
          </span>
          <span className="usd-equivalent">
            (${coin.current_price?.toLocaleString()})
          </span>
        </div>
      </div>

      <div className="card-stats-row">
        <div className="stat-col">
          <span className="stat-label">24h Tide:</span>
          <span className={`stat-value ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲ +' : '▼ '}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
        <div className="stat-col">
          <span className="stat-label">Market Treasure:</span>
          <span className="stat-value">
            ${coin.market_cap ? (coin.market_cap / 1e9).toFixed(2) + 'B' : 'N/A'}
          </span>
        </div>
      </div>

      <div className="coin-card-footer">
        <span className="view-details-link">Inspect Log Pose &rarr;</span>
      </div>
    </Link>
  )
}

export default CoinCard