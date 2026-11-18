# 🏴‍☠️ TideCrypto — Grand Line Cryptocurrency Dashboard

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&style=flat-square)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

An anime-themed (**One Piece / Grand Line**) cryptocurrency market intelligence dashboard equipped with a **100% frontend AI Navigator (CryptoGPT)**, an interactive **Portfolio Budget Planner**, a real-time **Pirate Price Radar**, and a **Treasure Chest Watchlist**.

---

## 🌟 Key Features

### 1. 🏴‍☠️ One Piece Anime Theme & Wanted Bounty Cards
* **Grand Line Nautical Palette**: Deep oceanic navy blue (`#050b14`), pirate crimson red, and treasure gold accents.
* **Wanted Bounty Posters**: Cryptos formatted as official bounty posters with rank badges (`Rank #1`, `Rank #2`).
* **Berry Currency (฿)**: Live prices rendered in Berries (฿) alongside USD equivalents.
* **Treasure Chest (Shop Later)**: Persistent watchlist saved to local storage so users can stash bounties for future voyages.
* **Crew Authentication**: Join the crew with full Sign In / Sign Up, or 1-click **Guest Pirate Mode** ("Captain Luffy" with 3,000,000,000 ฿ bounty status).

### 2. 🤖 CryptoGPT AI Assistant (100% Frontend Only)
* **Zero Backend / Zero Paid APIs**: Pure client-side natural language engine running entirely in the browser.
* **Rich Knowledge Base**: Instant answers on Bitcoin, Ethereum, Blockchain, Wallets & Security, Dollar-Cost Averaging (DCA), Halving, Market Cap, Staking, and DeFi.
* **Live Price Lookups**: Queries real-time CoinGecko market data on demand (e.g., *"What is the price of Solana?"*, *"Who is surging today?"*).

### 3. 💰 Budget Recommender & Portfolio Planner
* Enter any custom budget (e.g., $100, $500, $1,000, $5,000) or select quick presets.
* Toggle between **Safe (Conservative)**, **Balanced**, and **Aggressive (Moonshot)** risk strategies.
* Calculates exact mathematical dollar allocations, coin units, and rationale.
* **1-Click Stash**: Stash recommended allocations directly into the Treasure Chest.

### 4. 📡 Pirate Price Radar (Notification Bar)
* Right-side slideout drawer monitoring market tides in real time.
* **🔻 Grand Line Whirlpools**: Alerts for coins dropping $\ge 2\%$ from recent highs.
* **🚀 Straw Hat Breakouts**: Alerts for coins surging $\ge 2.5\%$ from recent lows.
* Filter by *All Alerts*, *Drops Only*, or *Surges Only*.

### 5. 🎯 Homepage Price Budget Filter
* Filter all market bounties with preset pills (**All Bounties**, **Under $1**, **Under $10**, **Under $100**, **Under $1,000**) or enter a custom maximum price limit.

---

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sangeetampec-max/crypto-dash-project.git
   cd crypto-dash-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   ```text
   http://localhost:5173/
   ```

---

## 🛠️ Tech Stack

* **Frontend**: React 18, JSX, Vite
* **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Keyframe Animations)
* **Charts**: Chart.js & React-Chartjs-2
* **API**: [CoinGecko Public API](https://www.coingecko.com/en/api)
* **State Management**: React Context (`ShopLaterContext`, `AuthContext`) + LocalStorage
* **Linting & Code Quality**: ESLint, Vite Oxc / Rollup

---

## 📦 Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
