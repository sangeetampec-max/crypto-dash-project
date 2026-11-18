import { Link, NavLink } from 'react-router-dom'
import { useShopLater } from '../context/ShopLaterContext'
import { useAuth } from '../context/AuthContext'

const Header = ({ onToggleNotifications, notificationCount = 0 }) => {
  const { shopLaterCoins } = useShopLater()
  const { user, openAuthModal, logout } = useAuth()
  const savedCount = shopLaterCoins.length

  return (
    <header className="main-header onepiece-header">
      <div className="header-brand">
        <Link to="/" className="brand-title">
          <span className="jolly-roger-icon">🏴‍☠️</span>
          <span className="brand-text">
            Straw Hat <span className="highlight-gold">Crypto</span>
          </span>
          <span className="grandline-tag">Grand Line</span>
        </Link>
      </div>

      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
          end
        >
          ⚓ Log Pose
        </NavLink>

        <NavLink
          to="/shop-later"
          className={({ isActive }) =>
            `nav-link shop-later-link ${isActive ? 'active' : ''}`
          }
        >
          <span>🛒 Treasure Chest</span>
          {savedCount > 0 && (
            <span className="cart-badge">{savedCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          📜 Crew Info
        </NavLink>

        {/* Right-End Notification Radar Bell */}
        <button
          type="button"
          className="header-alert-btn"
          onClick={onToggleNotifications}
          title="Open Grand Line Price Radar (Price Drops & Surges)"
        >
          <span>🔔 Radar</span>
          {notificationCount > 0 && (
            <span className="alert-count-pill">{notificationCount}</span>
          )}
        </button>

        {/* Auth Buttons / User Profile */}
        <div className="header-auth-group">
          {user ? (
            <div className="user-profile-badge">
              <span className="user-avatar">{user.avatar}</span>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-bounty">{user.bounty}</span>
              </div>
              <button
                type="button"
                className="logout-btn"
                onClick={logout}
                title="Leave the crew"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="auth-action-buttons">
              <button
                type="button"
                className="signin-nav-btn"
                onClick={() => openAuthModal('signin')}
              >
                Sign In
              </button>
              <button
                type="button"
                className="signup-nav-btn"
                onClick={() => openAuthModal('signup')}
              >
                Sign Up ⚔️
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header