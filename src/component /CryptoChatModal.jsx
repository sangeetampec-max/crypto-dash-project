import { useState, useRef, useEffect, useMemo } from 'react'
import {
  processCryptoChatQuery,
  calculateBudgetPortfolio,
} from '../utils/cryptoChatEngine'
import { useShopLater } from '../context/ShopLaterContext'

let messageCounter = 0
const createMsgId = (prefix) => `${prefix}-${++messageCounter}`

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "Ahoy! I'm your **CryptoGPT Navigator** 🤖🏴‍☠️.\n\nAsk me any question about cryptocurrencies, live market prices, or enter your budget (e.g. **$500**) to get the best crypto allocation for your treasure!",
    timestamp: 'Just now',
  },
]

const QUICK_PROMPTS = [
  '💰 Best coins for $500 budget?',
  '🪙 What is Bitcoin?',
  '⚡ How does Ethereum work?',
  '🚀 Who is surging today?',
  '🛡️ How to keep crypto safe?',
  '💡 What is Dollar Cost Averaging?',
]

const CryptoChatModal = ({ coins = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('chat') // 'chat' or 'budget'
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Budget Planner tab state
  const [budgetInput, setBudgetInput] = useState('500')
  const [riskProfile, setRiskProfile] = useState('balanced')

  const messagesEndRef = useRef(null)
  const { addToShopLater, isSaved } = useShopLater()

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, activeTab])

  // Derive budget plan with useMemo
  const budgetPlan = useMemo(() => {
    if (!coins || coins.length === 0) return null
    return calculateBudgetPortfolio(parseFloat(budgetInput) || 500, coins, riskProfile)
  }, [budgetInput, riskProfile, coins])

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputValue
    if (!query.trim()) return

    const userMsg = {
      id: createMsgId('user'),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate natural AI thinking response without backend
    setTimeout(() => {
      const result = processCryptoChatQuery(query, coins)
      const botMsg = {
        id: createMsgId('bot'),
        sender: 'bot',
        text: result.text,
        budgetData: result.budgetData || null,
        timestamp: 'Just now',
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 350)
  }

  const handleAddAllToChest = (allocations = []) => {
    allocations.forEach((item) => {
      if (item.coin) addToShopLater(item.coin)
    })
  }

  return (
    <>
      {/* Floating Bottom-Right Trigger Button */}
      <button
        type="button"
        className={`floating-chatgpt-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open CryptoGPT Assistant"
        title="Ask CryptoGPT & Plan Budget"
      >
        <span className="chat-avatar-icon">🤖</span>
        <span className="chat-trigger-label">CryptoGPT</span>
        <span className="chat-pulse-dot" />
      </button>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="crypto-chat-window" role="dialog" aria-modal="false">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-header-bot-icon">🤖</span>
              <div>
                <div className="chat-title-row">
                  <h4>CryptoGPT Navigator</h4>
                  <span className="ai-badge">Frontend AI</span>
                </div>
                <p className="chat-header-desc">Instant Crypto Intel & Budget Planner</p>
              </div>
            </div>

            <div className="chat-header-actions">
              <button
                type="button"
                className="clear-chat-icon"
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Reset conversation"
              >
                🔄
              </button>
              <button
                type="button"
                className="close-chat-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="chat-mode-tabs">
            <button
              type="button"
              className={`mode-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 Ask AI
            </button>
            <button
              type="button"
              className={`mode-tab ${activeTab === 'budget' ? 'active' : ''}`}
              onClick={() => setActiveTab('budget')}
            >
              💰 Budget Planner
            </button>
          </div>

          {/* Tab 1: Chat Stream */}
          {activeTab === 'chat' && (
            <>
              <div className="chat-messages-container">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`}>
                    <div className="chat-bubble">
                      <div className="bubble-content" style={{ whiteSpace: 'pre-line' }}>
                        {msg.text}
                      </div>

                      {/* If message returned structured budget data */}
                      {msg.budgetData && msg.budgetData.allocations?.length > 0 && (
                        <div className="chat-budget-embedded-card">
                          <div className="embedded-allocations">
                            {msg.budgetData.allocations.map((item) => {
                              const saved = isSaved(item.id)
                              return (
                                <div key={item.id} className="embedded-coin-row">
                                  <div className="coin-left">
                                    {item.image && (
                                      <img src={item.image} alt={item.name} className="mini-coin-img" />
                                    )}
                                    <div>
                                      <span className="mini-name">{item.name}</span>
                                      <span className="mini-units">
                                        {item.units} {item.symbol}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="coin-right">
                                    <span className="allocated-money">${item.allocatedUsd}</span>
                                    <button
                                      type="button"
                                      className={`mini-add-btn ${saved ? 'saved' : ''}`}
                                      onClick={() => item.coin && addToShopLater(item.coin)}
                                      title={saved ? 'In Chest' : 'Add to Chest'}
                                    >
                                      {saved ? '✓' : '+ Chest'}
                                    </button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <button
                            type="button"
                            className="add-all-chest-btn"
                            onClick={() => handleAddAllToChest(msg.budgetData.allocations)}
                          >
                            💎 Add Entire Portfolio to Treasure Chest
                          </button>
                        </div>
                      )}

                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-bubble-wrapper bot">
                    <div className="chat-bubble typing-bubble">
                      <span className="dot dot-1" />
                      <span className="dot dot-2" />
                      <span className="dot dot-3" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div className="quick-prompts-bar">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="quick-chip"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <form
                className="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
              >
                <input
                  type="text"
                  placeholder="Ask any crypto question or enter budget..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="chat-text-input"
                />
                <button type="submit" className="chat-send-btn" disabled={!inputValue.trim()}>
                  ➤
                </button>
              </form>
            </>
          )}

          {/* Tab 2: Dedicated Budget Planner */}
          {activeTab === 'budget' && (
            <div className="budget-planner-view">
              <div className="budget-intro">
                <h5>🎯 Find Best Crypto for Your Budget</h5>
                <p>
                  Enter your spending budget and risk preference to calculate your optimal Grand Line
                  treasure allocation.
                </p>
              </div>

              {/* Budget Amount Presets & Custom Input */}
              <div className="budget-input-group">
                <label htmlFor="budget-amount-field">Your Budget (USD $):</label>
                <div className="budget-input-row">
                  <span className="currency-prefix">$</span>
                  <input
                    id="budget-amount-field"
                    type="number"
                    min="1"
                    step="10"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="budget-amount-input"
                  />
                </div>

                <div className="budget-presets">
                  {['50', '100', '500', '1000', '5000'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`preset-btn ${budgetInput === val ? 'active' : ''}`}
                      onClick={() => setBudgetInput(val)}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Profile Selector */}
              <div className="risk-selector-group">
                <label>Select Investment Strategy:</label>
                <div className="risk-options">
                  <button
                    type="button"
                    className={`risk-btn ${riskProfile === 'safe' ? 'active' : ''}`}
                    onClick={() => setRiskProfile('safe')}
                  >
                    🛡️ Safe
                    <small>BTC/ETH Focus</small>
                  </button>
                  <button
                    type="button"
                    className={`risk-btn ${riskProfile === 'balanced' ? 'active' : ''}`}
                    onClick={() => setRiskProfile('balanced')}
                  >
                    ⚖️ Balanced
                    <small>Recommended</small>
                  </button>
                  <button
                    type="button"
                    className={`risk-btn ${riskProfile === 'aggressive' ? 'active' : ''}`}
                    onClick={() => setRiskProfile('aggressive')}
                  >
                    🚀 Aggressive
                    <small>High Altcoin Upside</small>
                  </button>
                </div>
              </div>

              {/* Calculated Portfolio Output */}
              {budgetPlan && budgetPlan.allocations?.length > 0 && (
                <div className="calculated-budget-card">
                  <div className="budget-card-header">
                    <span>
                      Recommended Allocation for <strong>${budgetPlan.budget.toLocaleString()}</strong>
                    </span>
                    <button
                      type="button"
                      className="add-all-header-btn"
                      onClick={() => handleAddAllToChest(budgetPlan.allocations)}
                    >
                      + Save All to Chest
                    </button>
                  </div>

                  <p className="strategy-advice">{budgetPlan.advice}</p>

                  <div className="budget-allocations-list">
                    {budgetPlan.allocations.map((item) => {
                      const saved = isSaved(item.id)
                      return (
                        <div key={item.id} className="budget-item-card">
                          <div className="budget-item-left">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="item-coin-img" />
                            )}
                            <div>
                              <div className="item-name-row">
                                <span className="item-name">{item.name}</span>
                                <span className="item-symbol">{item.symbol}</span>
                                <span className="item-percent">{item.percent}%</span>
                              </div>
                              <span className="item-role">{item.role}</span>
                            </div>
                          </div>

                          <div className="budget-item-right">
                            <span className="item-usd">${item.allocatedUsd}</span>
                            <span className="item-units">
                              ~{item.units} {item.symbol}
                            </span>
                            <button
                              type="button"
                              className={`budget-save-btn ${saved ? 'saved' : ''}`}
                              onClick={() => item.coin && addToShopLater(item.coin)}
                            >
                              {saved ? '✓ Saved' : '+ Chest'}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CryptoChatModal
