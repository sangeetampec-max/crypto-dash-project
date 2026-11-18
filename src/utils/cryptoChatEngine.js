/**
 * Frontend-Only Crypto Intelligence & Knowledge Engine
 * Provides instant responses to crypto questions, live market coin lookups,
 * and smart budget-based portfolio recommendations without any backend server.
 */

export const CRYPTO_KNOWLEDGE_BASE = [
  {
    keywords: ['what is bitcoin', 'about bitcoin', 'bitcoin', 'btc', 'who made bitcoin', 'satoshi'],
    topic: 'Bitcoin (BTC)',
    response:
      '🪙 **Bitcoin (BTC)** is the world\'s first and largest decentralized cryptocurrency, created in 2008 by the pseudonymous Satoshi Nakamoto. Often called "Digital Gold", Bitcoin has a strictly capped supply of 21 million coins, making it scarce and resistant to inflation. Transactions are verified by a global network using Proof-of-Work mining.',
    tips: ['Store long-term holdings in a hardware cold wallet.', 'Look into Dollar Cost Averaging (DCA) to reduce volatility risk.'],
  },
  {
    keywords: ['what is ethereum', 'about ethereum', 'ethereum', 'eth', 'smart contract', 'vitalik'],
    topic: 'Ethereum (ETH)',
    response:
      '⚡ **Ethereum (ETH)** is a decentralized, open-source blockchain with smart contract functionality, launched in 2015 by Vitalik Buterin and others. Rather than just digital money, Ethereum is a global decentralized computer that powers DeFi (Decentralized Finance), NFTs, and thousands of decentralized applications (dApps). It operates on energy-efficient Proof-of-Stake.',
    tips: ['Keep an eye on network Gas Fees when making transactions.', 'Staking ETH yields passive rewards (around 3-4% APR).'],
  },
  {
    keywords: ['what is blockchain', 'about blockchain', 'blockchain', 'how blockchain works', 'explain blockchain', 'ledger'],
    topic: 'Blockchain Technology',
    response:

      '🔗 A **Blockchain** is a distributed, immutable digital ledger that securely records transactions across a network of computers. Each "block" contains cryptographic hashes of previous transactions. Because records are distributed across thousands of independent nodes, no single government or company can alter or censor the data.',
    tips: ['Immutability means transactions cannot be reversed once confirmed.'],
  },
  {
    keywords: ['what is staking', 'how to stake', 'proof of stake', 'pos', 'pow'],
    topic: 'Staking & Consensus',
    response:
      '🥩 **Staking** is the process of locking up cryptocurrency tokens to help validate transactions and secure a Proof-of-Stake (PoS) blockchain (like Ethereum or Solana). In exchange for helping secure the network, stakers receive newly minted rewards, similar to earning interest on savings.',
    tips: ['Beware of lockup periods during which you cannot withdraw tokens immediately.'],
  },
  {
    keywords: ['what is market cap', 'market capitalization', 'circulating supply', 'fdv'],
    topic: 'Market Capitalization',
    response:
      '📊 **Market Cap** equals the `Current Coin Price × Total Circulating Supply`. It is the best metric to measure the true size and stability of a crypto project, far better than just unit price. A coin priced at $1 with 100B supply has a larger market cap than a coin priced at $10 with 1M supply!',
    tips: ['Large caps (> $10B) are generally less volatile than micro-cap gems.'],
  },
  {
    keywords: ['what is dca', 'dollar cost average', 'how to invest', 'investment strategy'],
    topic: 'Dollar Cost Averaging (DCA)',
    response:
      '💡 **Dollar Cost Averaging (DCA)** is an investment strategy where you divide your total budget and purchase fixed dollar amounts of crypto at regular intervals (e.g. $50 every Monday), regardless of price fluctuations. This prevents emotional FOMO buying at market tops and lowers your average purchase price over time.',
    tips: ['DCA is widely considered the safest strategy for crypto beginners.'],
  },
  {
    keywords: ['wallet', 'cold wallet', 'hot wallet', 'seed phrase', 'security', 'how to store'],
    topic: 'Crypto Wallets & Security',
    response:
      '🛡️ **Crypto Wallets** store the private cryptographic keys needed to access your coins: \n- **Cold Wallets (Hardware)**: Devices like Ledger or Trezor that keep keys completely offline away from hackers. (Safest)\n- **Hot Wallets (Software)**: Apps like MetaMask or Phantom connected to the internet for daily trading.\n\n⚠️ **Golden Rule**: Never share your 12-24 word Seed Phrase with ANYONE, and never enter it on unverified websites!',
    tips: ['Write your seed phrase on physical paper or metal, never take a screenshot.'],
  },
  {
    keywords: ['halving', 'bitcoin halving', 'what is halving', 'cycle'],
    topic: 'Bitcoin Halving',
    response:
      '⏳ The **Bitcoin Halving** occurs every 210,000 blocks (roughly every 4 years). It cuts the block mining reward given to miners by 50%, slowing the rate at which new Bitcoin enters circulation. Historically, halving events reduce available supply and precede major multi-month crypto bull markets.',
    tips: ['Halvings took place in 2012, 2016, 2020, and 2024.'],
  },
  {
    keywords: ['what is defi', 'decentralized finance', 'dex', 'uniswap'],
    topic: 'Decentralized Finance (DeFi)',
    response:
      '🏦 **DeFi (Decentralized Finance)** refers to financial services (lending, borrowing, trading, earning interest) built entirely on smart contracts without traditional banks or intermediaries. You retain full self-custody of your funds while interacting directly with protocols on-chain.',
    tips: ['Always check protocol smart contract audits before depositing large amounts.'],
  },
]

/**
 * Calculates a smart cryptocurrency portfolio tailored to the user's budget and risk appetite.
 */
export function calculateBudgetPortfolio(budgetAmount, marketCoins = [], riskProfile = 'balanced') {
  const budget = Math.max(1, parseFloat(budgetAmount) || 0)

  if (!marketCoins || marketCoins.length === 0) {
    return {
      budget,
      riskProfile,
      allocations: [],
      advice: 'Waiting for live market data to generate optimal recommendations...',
    }
  }

  // Find popular anchor coins
  const btc = marketCoins.find((c) => c.symbol?.toLowerCase() === 'btc') || marketCoins[0]
  const eth = marketCoins.find((c) => c.symbol?.toLowerCase() === 'eth') || marketCoins[1]
  const alt1 = marketCoins.find((c) => ['sol', 'bnb', 'xrp'].includes(c.symbol?.toLowerCase())) || marketCoins[2]
  const alt2 = marketCoins.find((c) => ['ada', 'doge', 'avax', 'link', 'dot'].includes(c.symbol?.toLowerCase())) || marketCoins[3]

  let plan
  let advice

  if (riskProfile === 'safe') {
    // 60% BTC, 30% ETH, 10% Large Cap Alt
    plan = [
      { coin: btc, percent: 0.60, role: 'Digital Gold / Primary Store of Value' },
      { coin: eth, percent: 0.30, role: 'Smart Contract & Web3 Foundation' },
      { coin: alt1, percent: 0.10, role: 'Large-Cap Ecosystem Growth' },
    ]
    advice = '🛡️ **Conservative / Blue Chip Strategy**: Prioritizes capital preservation with Bitcoin & Ethereum market leaders, ideal for holding through market waves.'
  } else if (riskProfile === 'aggressive') {
    // 30% BTC, 25% ETH, 25% Alt1, 20% Alt2
    plan = [
      { coin: btc, percent: 0.30, role: 'Anchor Foundation' },
      { coin: eth, percent: 0.25, role: 'DeFi & Layer 1 Utility' },
      { coin: alt1, percent: 0.25, role: 'High Momentum Altcoin' },
      { coin: alt2, percent: 0.20, role: 'High Beta / Maximum Upside' },
    ]
    advice = '🚀 **High-Growth / Moonshot Strategy**: Weighted heavier into high-momentum altcoins for higher potential percentage returns, with higher volatility.'
  } else {
    // Balanced Default: 45% BTC, 30% ETH, 15% Alt1, 10% Alt2
    plan = [
      { coin: btc, percent: 0.45, role: 'Market Backbone & Wealth Preservation' },
      { coin: eth, percent: 0.30, role: 'Smart Contract Dominance' },
      { coin: alt1, percent: 0.15, role: 'High-Throughput Ecosystem' },
      { coin: alt2, percent: 0.10, role: 'Diversification & Growth Booster' },
    ]
    advice = '⚖️ **Balanced Grand Line Strategy**: The golden ratio balancing stability from market kings (BTC/ETH) with upside potential from leading altcoins.'
  }

  const allocations = plan
    .filter((item) => item.coin && item.coin.current_price > 0)
    .map((item) => {
      const allocatedUsd = budget * item.percent
      const price = item.coin.current_price
      const units = allocatedUsd / price

      return {
        id: item.coin.id,
        name: item.coin.name,
        symbol: item.coin.symbol?.toUpperCase(),
        image: item.coin.image,
        current_price: price,
        percent: Math.round(item.percent * 100),
        allocatedUsd: Number(allocatedUsd.toFixed(2)),
        units: units < 0.001 ? units.toFixed(6) : units < 1 ? units.toFixed(4) : units.toFixed(2),
        role: item.role,
        price_change_24h: item.coin.price_change_percentage_24h || 0,
        coin: item.coin,
      }
    })

  return {
    budget,
    riskProfile,
    allocations,
    advice,
  }
}

/**
 * Helper to match keywords with word boundaries for short acronyms
 */
function matchesKeyword(text, keyword) {
  if (keyword.length <= 4) {
    return new RegExp(`\\b${keyword}\\b`, 'i').test(text)
  }
  return text.includes(keyword)
}

/**
 * Intelligent query processor answering crypto questions or checking real-time market data
 */
export function processCryptoChatQuery(query, marketCoins = []) {
  const clean = (query || '').trim().toLowerCase()

  if (!clean) {
    return {
      text: "Ahoy! I'm your Grand Line Crypto AI Navigator. Ask me anything about Bitcoin, Ethereum, blockchain, market metrics, or tell me your budget (e.g. '$500') and I'll calculate the best crypto portfolio for you!",
      type: 'greeting',
    }
  }

  // 1. Check for budget / investment amount query (e.g. "budget $500", "i have 100 dollars", "$200", "invest 1000")
  const budgetMatch = clean.match(/(?:budget|have|invest|spend|\$)\s*(\d+(?:\.\d+)?)/i) || clean.match(/^(\d+(?:\.\d+)?)\s*\$?$/)
  if (budgetMatch || clean.includes('budget') || clean.includes('what should i buy') || clean.includes('best coin to buy')) {
    const rawAmount = budgetMatch ? parseFloat(budgetMatch[1]) : 500
    const budgetData = calculateBudgetPortfolio(rawAmount, marketCoins, 'balanced')

    return {
      type: 'budget',
      budgetData,
      text: `💰 **Recommended Portfolio for $${budgetData.budget.toLocaleString()} Budget:**\n\n${budgetData.advice}\n\nHere is your optimal allocation across the Grand Line:`,
    }
  }

  // 2. Educational & conceptual queries ("what is", "how does", "explain", "about") vs Price checks
  const hasPriceIntent =
    clean.includes('price') ||
    clean.includes('worth') ||
    clean.includes('bounty') ||
    clean.includes('rate') ||
    clean.includes('cost') ||
    clean.includes('how much')

  const isEducational =
    !hasPriceIntent &&
    (clean.includes('what is') ||
      clean.includes('how does') ||
      clean.includes('explain') ||
      clean.includes('about') ||
      clean.includes('who made') ||
      clean.includes('history'))

  if (isEducational) {
    for (const entry of CRYPTO_KNOWLEDGE_BASE) {
      if (entry.keywords.some((kw) => matchesKeyword(clean, kw))) {
        return {
          type: 'knowledge',
          text: `${entry.response}\n\n💡 **Pro Tips:**\n${entry.tips.map((t) => `- ${t}`).join('\n')}`,
        }
      }
    }
  }


  // 3. Live Coin stats lookup (e.g. "price of bitcoin", "how is solana doing", "dogecoin")
  if (marketCoins && marketCoins.length > 0) {
    const matchedCoin = marketCoins.find((coin) => {
      const name = coin.name.toLowerCase()
      const symbol = coin.symbol.toLowerCase()
      const hasName = clean.includes(name)
      const hasSymbol = new RegExp(`\\b${symbol}\\b`, 'i').test(clean)
      return hasName || hasSymbol
    })

    if (matchedCoin) {
      const price = matchedCoin.current_price?.toLocaleString()
      const change = matchedCoin.price_change_percentage_24h || 0
      const isUp = change >= 0
      const high = matchedCoin.high_24h?.toLocaleString()
      const low = matchedCoin.low_24h?.toLocaleString()
      const rank = matchedCoin.market_cap_rank ? `#${matchedCoin.market_cap_rank}` : 'Top Tier'

      return {
        type: 'live_coin',
        coin: matchedCoin,
        text: `🏴‍☠️ **Live Bounty Intel on ${matchedCoin.name} (${matchedCoin.symbol.toUpperCase()}):**\n\n` +
          `- **Current Bounty**: ฿ ${price} ($${price})\n` +
          `- **24h Tide**: ${isUp ? '📈 +' : '🔻 '}${change.toFixed(2)}%\n` +
          `- **Grand Line Rank**: ${rank}\n` +
          `- **24h High/Low**: ฿ ${high} / ฿ ${low}\n` +
          `- **Market Treasure**: $${(matchedCoin.market_cap / 1e9).toFixed(2)} Billion\n\n` +
          `${isUp ? '🚀 Strong buying momentum detected!' : '⚠️ In a pullback / dip. Great opportunity to accumulate if fundamentals remain strong.'}`,
      }
    }
  }

  // 4. Market-wide summaries (e.g., "top gainers", "biggest drop", "market status")
  if (clean.includes('gainer') || clean.includes('surge') || clean.includes('pump') || clean.includes('best performer')) {
    const topGainer = [...marketCoins].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))[0]
    if (topGainer) {
      return {
        type: 'market_insight',
        text: `🚀 **Top Bullish Gainer Today:**\n\n` +
          `**${topGainer.name} (${topGainer.symbol.toUpperCase()})** is leading the fleet with a **+${topGainer.price_change_percentage_24h?.toFixed(2)}%** surge today at **฿ ${topGainer.current_price?.toLocaleString()}**!`,
      }
    }
  }

  if (clean.includes('loser') || clean.includes('dip') || clean.includes('drop') || clean.includes('whirlpool') || clean.includes('fall')) {
    const topDip = [...marketCoins].sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))[0]
    if (topDip) {
      return {
        type: 'market_insight',
        text: `🔻 **Biggest Market Dip Today:**\n\n` +
          `**${topDip.name} (${topDip.symbol.toUpperCase()})** dipped **${topDip.price_change_percentage_24h?.toFixed(2)}%** to **฿ ${topDip.current_price?.toLocaleString()}**. Keep an eye on support levels for dip-buying!`,
      }
    }
  }

  // 5. Remaining Knowledge Base checks
  for (const entry of CRYPTO_KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => matchesKeyword(clean, kw))) {
      return {
        type: 'knowledge',
        text: `${entry.response}\n\n💡 **Pro Tips:**\n${entry.tips.map((t) => `- ${t}`).join('\n')}`,
      }
    }
  }

  // 6. Intelligent Fallback
  return {
    type: 'fallback',
    text: `🧭 **Grand Line Navigator Intel:**\n\n` +
      `I couldn't find an exact match for "${query}", but here are great topics you can ask me:\n` +
      `- 💰 *"Plan a portfolio for $500 budget"*\n` +
      `- 🪙 *"What is Bitcoin / Ethereum?"*\n` +
      `- 📈 *"What's the price of Solana?"*\n` +
      `- 🥩 *"What is Staking / Blockchain / DeFi?"*\n` +
      `- 🛡️ *"How do crypto wallets and DCA work?"*`,
  }
}

