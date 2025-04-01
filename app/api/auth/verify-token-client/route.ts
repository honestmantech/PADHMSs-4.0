import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false, error: "No token provided" }, { status: 400 })
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables")
      return NextResponse.json(
        {
          valid: false,
          error: "Server configuration error",
        },
        { status: 500 },
      )
    }

    try {
      const decoded = verify(token, jwtSecret)
      return NextResponse.json({ valid: true, decoded })
    } catch (error) {
      console.error("Token verification error:", error)
      return NextResponse.json(
        {
          valid: false,
          error: "Invalid token",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Token verification request error:", error)
    return NextResponse.json(
      {
        valid: false,
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

