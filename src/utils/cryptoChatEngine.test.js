/* global process */
import {
  CRYPTO_KNOWLEDGE_BASE,
  calculateBudgetPortfolio,
  processCryptoChatQuery,
} from './cryptoChatEngine.js'

// Mock coin market data
const mockCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    current_price: 80000,
    price_change_percentage_24h: 3.5,
    high_24h: 81000,
    low_24h: 78000,
    market_cap: 1600000000000,
    market_cap_rank: 1,
    image: 'https://example.com/btc.png',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    current_price: 2400,
    price_change_percentage_24h: -1.8,
    high_24h: 2500,
    low_24h: 2350,
    market_cap: 290000000000,
    market_cap_rank: 2,
    image: 'https://example.com/eth.png',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
    current_price: 150,
    price_change_percentage_24h: 8.2,
    high_24h: 155,
    low_24h: 138,
    market_cap: 70000000000,
    market_cap_rank: 5,
    image: 'https://example.com/sol.png',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ada',
    current_price: 0.5,
    price_change_percentage_24h: -4.5,
    high_24h: 0.55,
    low_24h: 0.48,
    market_cap: 18000000000,
    market_cap_rank: 10,
    image: 'https://example.com/ada.png',
  },
]

let passed = 0
let failed = 0

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`)
    passed++
  } else {
    console.error(`❌ FAIL: ${testName}`)
    failed++
  }
}

console.log('--- Running CryptoChatEngine Automated Tests ---\n')

// 1. Test Knowledge Base Entries
assert(CRYPTO_KNOWLEDGE_BASE.length >= 8, 'Knowledge base contains at least 8 key crypto topics')

// 2. Test General Knowledge Query
const btcQuery = processCryptoChatQuery('Tell me what is bitcoin?', mockCoins)
assert(btcQuery.type === 'knowledge' && btcQuery.text.includes('Bitcoin (BTC)'), 'Correctly explains Bitcoin from knowledge base')

const ethQuery = processCryptoChatQuery('How does Ethereum work?', mockCoins)
assert(ethQuery.type === 'knowledge' && ethQuery.text.includes('Ethereum'), 'Correctly explains Ethereum')

const dcaQuery = processCryptoChatQuery('explain dollar cost average strategy', mockCoins)
assert(dcaQuery.type === 'knowledge' && dcaQuery.text.includes('Dollar Cost Averaging'), 'Correctly explains DCA')

// 3. Test Live Coin Lookup
const liveBtc = processCryptoChatQuery('What is the price of BTC right now?', mockCoins)
assert(liveBtc.type === 'live_coin' && liveBtc.coin.symbol === 'btc', 'Resolves real-time Bitcoin price and stats')

const liveSol = processCryptoChatQuery('check solana', mockCoins)
assert(liveSol.type === 'live_coin' && liveSol.coin.id === 'solana', 'Resolves real-time Solana price and stats')

// 4. Test Top Gainer / Dip Lookup
const gainerQuery = processCryptoChatQuery('show me top gainers today', mockCoins)
assert(gainerQuery.type === 'market_insight' && gainerQuery.text.includes('Solana'), 'Identifies Solana as top gainer')

const dipQuery = processCryptoChatQuery('which coin dropped the most', mockCoins)
assert(dipQuery.type === 'market_insight' && dipQuery.text.includes('Cardano'), 'Identifies Cardano as biggest dip')

// 5. Test Budget Allocation Calculations
const budget500 = calculateBudgetPortfolio(500, mockCoins, 'balanced')
assert(budget500.budget === 500, 'Calculates budget portfolio for $500')
assert(budget500.allocations.length >= 3, 'Provides at least 3 coin allocations')

// Verify sum of percentages equals 100%
const totalPercent = budget500.allocations.reduce((sum, a) => sum + a.percent, 0)
assert(totalPercent >= 98 && totalPercent <= 102, `Portfolio percentage sums to ~100% (got ${totalPercent}%)`)

// Test Safe Risk Profile
const budgetSafe = calculateBudgetPortfolio(1000, mockCoins, 'safe')
assert(budgetSafe.allocations[0].percent === 60, 'Safe profile assigns 60% to Bitcoin')

// Test Aggressive Risk Profile
const budgetAggressive = calculateBudgetPortfolio(250, mockCoins, 'aggressive')
assert(budgetAggressive.allocations[0].percent === 30, 'Aggressive profile lowers Bitcoin weighting to 30% for altcoins')

// Test Query triggering budget
const budgetQuery = processCryptoChatQuery('I have a budget of $300 what should I buy?', mockCoins)
assert(budgetQuery.type === 'budget' && budgetQuery.budgetData.budget === 300, 'Natural language query parses budget amount ($300)')

// 6. Test Fallback Query
const fallbackQuery = processCryptoChatQuery('something completely unrelated to crypto like pizza recipes', mockCoins)
assert(fallbackQuery.type === 'fallback', 'Gracefully returns fallback response with prompt ideas')

console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`)
if (failed > 0) {
  process.exit(1)
} else {
  console.log('🎉 All automated tests passed successfully!')
}
