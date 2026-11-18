import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, signup, guestLogin } =
    useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (!isAuthModalOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please provide your pirate credentials (email & password)!')
      return
    }
    if (authMode === 'signup' && !name) {
      setError('Every pirate needs a name! Please enter your name.')
      return
    }

    if (authMode === 'signin') {
      login(email, password)
    } else {
      signup(name, email, password)
    }
  }

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div
        className="auth-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="auth-header">
          <div className="pirate-flag-icon">👒☠️</div>
          <h2>
            {authMode === 'signin'
              ? 'Board the Sunny Go'
              : 'Join the Straw Hat Crew'}
          </h2>
          <p className="auth-subtitle">
            {authMode === 'signin'
              ? 'Log in to access your Grand Line crypto log & bounty alerts.'
              : 'Sign up to register your bounty and track treasures across the Grand Line.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => {
              setAuthMode('signin')
              setError('')
            }}
          >
            Sign In ⚓
          </button>
          <button
            type="button"
            className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setAuthMode('signup')
              setError('')
            }}
          >
            Sign Up 📜
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {authMode === 'signup' && (
            <div className="form-group">
              <label htmlFor="auth-name">Pirate Name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="e.g. Roronoa Zoro"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Den Den Mushi (Email)</label>
            <input
              id="auth-email"
              type="email"
              placeholder="pirate@grandline.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Secret Code (Password)</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="pirate-submit-btn">
            {authMode === 'signin' ? '⚡ Log In to Grand Line' : '⚔️ Sign Up as Pirate'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="guest-login-btn"
          onClick={guestLogin}
          title="Quick 1-click login as Captain Luffy"
        >
          👒 Set Sail as Guest (Captain Luffy)
        </button>
      </div>
    </div>
  )
}

export default AuthModal
