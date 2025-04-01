"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DirectDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get user and token from localStorage
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing user from localStorage:", error)
      }
    }

    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const verifyToken = async () => {
    if (!token) return

    try {
      setLoading(true)
      const response = await fetch("/api/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setVerificationResult(data)
    } catch (error) {
      console.error("Error verifying token:", error)
      setVerificationResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  const goToDashboard = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Direct Dashboard Access</CardTitle>
          <CardDescription>This page bypasses the middleware to help diagnose authentication issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant={user ? "default" : "destructive"}>
            {user ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{user ? "User Found" : "No User Found"}</AlertTitle>
            <AlertDescription>
              {user ? `Logged in as ${user.name} (${user.email})` : "No user found in localStorage"}
            </AlertDescription>
          </Alert>

          <Alert variant={token ? "default" : "destructive"}>
            {token ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{token ? "Token Found" : "No Token Found"}</AlertTitle>
            <AlertDescription>
              {token ? `Token: ${token.substring(0, 20)}...` : "No token found in localStorage"}
            </AlertDescription>
          </Alert>

          {verificationResult && (
            <Alert variant={verificationResult.valid ? "default" : "destructive"}>
              {verificationResult.valid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{verificationResult.valid ? "Token Valid" : "Token Invalid"}</AlertTitle>
              <AlertDescription>
                <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(verificationResult, null, 2)}
                </pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={verifyToken} disabled={!token || loading}>
            {loading ? "Verifying..." : "Verify Token"}
          </Button>
          <Button onClick={goToDashboard} disabled={!token}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Verify that your JWT_SECRET environment variable is set correctly</li>
              <li>Make sure the same JWT_SECRET is used for both token creation and verification</li>
              <li>Check that your token is being stored correctly in both localStorage and cookies</li>
              <li>Try logging out and logging in again to get a fresh token</li>
              <li>Clear your browser cache and cookies if you're still having issues</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

