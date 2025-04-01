"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, checkAuth } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsChecking(true)
        const isAuthenticated = await checkAuth()

        if (!isAuthenticated) {
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setError("Authentication error. Please try logging in again.")
      } finally {
        setIsChecking(false)
      }
    }

    if (!isLoading) {
      verifyAuth()
    }
  }, [isLoading, checkAuth, router])

  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg font-medium">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/login")} className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>You need to be logged in to access this page.</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/login")} className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

