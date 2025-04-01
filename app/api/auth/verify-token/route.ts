import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

// Export runtime config
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    // Get token from authorization header or cookie
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 })
    }

    // Get JWT_SECRET from environment
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables")
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "JWT_SECRET is not configured",
        },
        { status: 500 },
      )
    }

    try {
      // Verify token
      const decoded = verify(token, jwtSecret)

      return NextResponse.json({
        valid: true,
        decoded,
        token: token.substring(0, 10) + "...",
        jwtSecretPrefix: jwtSecret.substring(0, 5) + "...",
      })
    } catch (verifyError) {
      return NextResponse.json(
        {
          valid: false,
          error: "Invalid token",
          details: verifyError instanceof Error ? verifyError.message : "Unknown error",
          token: token.substring(0, 10) + "...",
          jwtSecretPrefix: jwtSecret.substring(0, 5) + "...",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      {
        error: "Token verification failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

