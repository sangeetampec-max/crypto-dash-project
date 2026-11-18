import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const STORAGE_KEY = 'onepiece_crypto_user'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (e) {
      console.error('Failed to parse auth user', e)
      return null
    }
  })

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'signup'

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (e) {
      console.error('Failed to save auth user', e)
    }
  }, [user])

  const openAuthModal = (mode = 'signin') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const login = (email, password) => {
    if (!password) return false
    // Simulated authentication for demo
    const name = email.split('@')[0] || 'Pirate'
    const authenticatedUser = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      bounty: '1,500,000,000 ฿',
      pirateRank: 'Grand Line Buccaneer 👒',
      avatar: '👒',
      loggedInAt: new Date().toISOString(),
    }
    setUser(authenticatedUser)
    closeAuthModal()
    return true
  }

  const signup = (name, email, password) => {
    if (!password) return false
    const authenticatedUser = {
      name: name || 'Monkey D. Pirate',
      email,
      bounty: '30,000,000 ฿',
      pirateRank: 'Straw Hat Recruit ⚓',
      avatar: '🍖',
      loggedInAt: new Date().toISOString(),
    }
    setUser(authenticatedUser)
    closeAuthModal()
    return true
  }


  const guestLogin = () => {
    const guestUser = {
      name: 'Monkey D. Luffy',
      email: 'luffy@strawhats.pirate',
      bounty: '3,000,000,000 ฿',
      pirateRank: 'Emperor of the Sea (Yonko) 🏴‍☠️',
      avatar: '👒',
      loggedInAt: new Date().toISOString(),
    }
    setUser(guestUser)
    closeAuthModal()
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        guestLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
