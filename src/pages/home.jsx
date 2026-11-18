import { useState } from 'react'
import CoinCard from '../component /CoinCard'
import SortSelector from '../component /sortSelector'
import Spinner from '../component /Spinner'

const Homepage = ({
  coins,
  searchTerm,
  setSearchTerm,
  limit,
  setLimit,
  sort,
  setSort,
  loading,
  error,
}) => {
  const [maxBudget, setMaxBudget] = useState('')

  const filteredCoins = coins.filter((coin) => {
    const searchValue = (searchTerm || '').toLowerCase().trim()
    const matchesSearch =
      !searchValue ||
      coin.name.toLowerCase().includes(searchValue) ||
      coin.symbol.toLowerCase().includes(searchValue)

    const budgetVal = parseFloat(maxBudget)
    const matchesBudget = !budgetVal || (coin.current_price <= budgetVal)

    return matchesSearch && matchesBudget
  })


  const sortedCoins = [...filteredCoins].sort((firstCoin, secondCoin) => {
    switch (sort) {
      case 'market_cap_asc':
        return firstCoin.market_cap - secondCoin.market_cap
      case 'price_desc':
        return secondCoin.current_price - firstCoin.current_price
      case 'price_asc':
        return firstCoin.current_price - secondCoin.current_price
      case 'change_desc':
        return (
          secondCoin.price_change_percentage_24h -
          firstCoin.price_change_percentage_24h
        )
      case 'change_asc':
        return (
          firstCoin.price_change_percentage_24h -
          secondCoin.price_change_percentage_24h
        )
      case 'market_cap_desc':
      default:
        return secondCoin.market_cap - firstCoin.market_cap
    }
  })

  return (
    <div className="home-page-container">
      {loading && <Spinner />}
      {error && <p className="error-banner">{error}</p>}

      <div className="home-hero-banner">
        <h1 className="home-title">
          ⚓ Grand Line Bounty Market
        </h1>
        <p className="home-subtitle">
          Track live bounties in Berries (฿), discover market dips on the radar, and hoard treasures for your crew.
        </p>
      </div>

      <div className="top-controls">
        <div className="filter">
          <label htmlFor="coin-search">Search Bounties by Name or Symbol:</label>
          <input
            id="coin-search"
            type="search"
            placeholder="Search Bitcoin, Ethereum, Solana..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>


        <div className="controls">
          <label htmlFor="limit">Show:</label>
          <select
            value={limit}
            id="limit"
            onChange={(event) => setLimit(Number(event.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {/* Budget Filter Bar */}
      <div className="home-budget-filter-bar">
        <div className="budget-bar-label">
          <span>🎯 Filter by Coin Price Budget:</span>
        </div>
        <div className="budget-presets-row">
          <button
            type="button"
            className={`budget-preset-pill ${!maxBudget ? 'active' : ''}`}
            onClick={() => setMaxBudget('')}
          >
            All Bounties
          </button>
          {['1', '10', '100', '1000'].map((val) => (
            <button
              key={val}
              type="button"
              className={`budget-preset-pill ${maxBudget === val ? 'active' : ''}`}
              onClick={() => setMaxBudget(val)}
            >
              Under ${val}
            </button>
          ))}
          <div className="custom-budget-input-wrapper">
            <span className="currency-mark">$</span>
            <input
              type="number"
              min="0"
              placeholder="Max Price"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="custom-budget-input"
            />
            {maxBudget && (
              <button
                type="button"
                className="clear-budget-btn"
                onClick={() => setMaxBudget('')}
                title="Clear budget filter"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      <SortSelector sort={sort} onSortchange={setSort} />


      {!loading && !error && (
        <main className="grid" aria-live="polite">
          {sortedCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
          {sortedCoins.length === 0 && <p>No coins found.</p>}
        </main>
      )}
    </div>
  )
}

export default Homepage;