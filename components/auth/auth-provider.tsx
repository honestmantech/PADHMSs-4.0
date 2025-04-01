"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name?: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

// Create a default context value to avoid the "must be used within a provider" error during SSR
const defaultContextValue: AuthContextType = {
  user: null,
  token: null,
  isLoading: true,
  login: async () => ({ success: false, error: "Not implemented" }),
  logout: () => {},
  checkAuth: async () => false,
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize auth state from localStorage
  useEffect(() => {
    if (!isMounted) return

    const initAuth = async () => {
      setIsLoading(true)
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setToken(storedToken)

          // Verify token validity
          const isValid = await verifyToken(storedToken)
          if (!isValid) {
            console.error("Stored token is invalid")
            handleLogout()
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error)
          handleLogout()
        }
      }

      setIsLoading(false)
    }

    initAuth()
  }, [isMounted])

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isMounted || isLoading) return

    const publicPaths = ["/login", "/signup", "/register", "/setup"]
    const isPublicPath = publicPaths.some((path) => pathname?.startsWith(path))

    if (!user && !isPublicPath) {
      // Redirect to login if not authenticated and not on a public path
      router.push("/login")
    } else if (user && isPublicPath && pathname !== "/setup") {
      // Redirect to dashboard if authenticated and on a public path (except setup)
      router.push("/dashboard")
    }
  }, [user, isLoading, pathname, router, isMounted])

  const verifyToken = async (tokenToVerify: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/verify-token-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenToVerify }),
      })

      const data = await response.json()
      return data.valid === true
    } catch (error) {
      console.error("Token verification error:", error)
      return false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Login failed",
        }
      }

      // Store auth data
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Update state
      setToken(data.token)
      setUser(data.user)

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  }

  const handleLogout = () => {
    // Clear auth data
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }

    // Reset state
    setToken(null)
    setUser(null)
  }

  const checkAuth = async (): Promise<boolean> => {
    if (!token) return false

    const isValid = await verifyToken(token)
    if (!isValid) {
      handleLogout()
    }

    return isValid
  }

  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout: handleLogout,
    checkAuth,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}

