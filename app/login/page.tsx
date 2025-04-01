"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const { login, isLoading: authLoading } = useAuth()

  // Only run client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">HotHotelMS</CardTitle>
            <CardDescription className="text-center">Loading...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setDebugInfo(null)

    try {
      const result = await login(email, password)

      if (!result.success) {
        setError(result.error || "Login failed")
        setDebugInfo({ error: result.error })
      } else {
        // Login successful, router will handle redirect in AuthProvider
        router.push("/dashboard")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const testDatabaseConnection = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/system/test-db-connection")
      const data = await response.json()
      setDebugInfo(data)

      if (data.success) {
        setError(`Database connection successful! ${data.adminExists ? "Admin user exists." : "No admin user found."}`)
      } else {
        setError(`Database connection failed: ${data.message || "Unknown error"}`)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to test database connection")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">HotHotelMS</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the hotel management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="default" className="mb-4 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-600">First Time User?</AlertTitle>
            <AlertDescription className="text-blue-600">
              If you don't have an account yet, please sign up first.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || authLoading}>
              {loading || authLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm mb-2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>

          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm" onClick={() => setShowDebug(!showDebug)}>
              {showDebug ? "Hide Debug" : "Show Debug"}
            </Button>
            <Button variant="outline" size="sm" onClick={testDatabaseConnection} disabled={loading}>
              Test DB
            </Button>
          </div>

          {showDebug && debugInfo && (
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

