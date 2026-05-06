'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
      const res = await fetch(`${apiBaseUrl}/me`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data.user ?? data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void (async () => {
      await checkAuth()
    })()
  }, [checkAuth])

  const signIn = async (email: string, password: string) => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
    const res = await fetch(`${apiBaseUrl}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || 'Erro ao fazer login')
    }

    await checkAuth()
    router.push('/')
  }

  const signUp = async (name: string, email: string, password: string) => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
    const res = await fetch(`${apiBaseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || 'Erro ao criar conta')
    }

    router.push('/login')
  }

  const signOut = async () => {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
      await fetch(`${apiBaseUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {})
    } finally {
      document.cookie =
        'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      setUser(null)
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
