import { type NextRequest, NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import supabaseAdmin from "@/lib/supabase-admin"

// Export runtime config
export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Login attempt for:", body.email)

    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    try {
      // Get user by email - using admin client to bypass RLS
      console.log("Looking up user by email:", body.email)
      const { data: user, error: userError } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("email", body.email)
        .single()

      if (userError) {
        console.error("Error fetching user:", userError)
        return NextResponse.json(
          {
            error: "Authentication failed",
            details: "Error fetching user",
            dbError: userError,
          },
          { status: 500 },
        )
      }

      if (!user) {
        console.log("No user found with email:", body.email)
        return NextResponse.json(
          {
            error: "Invalid credentials",
            message: "No user found with these credentials. Please sign up first.",
          },
          { status: 401 },
        )
      }

      // Compare password
      console.log("Comparing password for user:", user.id)
      const isPasswordValid = await compare(body.password, user.password)

      if (!isPasswordValid) {
        console.log("Password validation failed for user:", user.id)
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      console.log("User authenticated successfully:", user.id)

      // Create a JWT token
      try {
        const jwtSecret = process.env.JWT_SECRET

        if (!jwtSecret) {
          console.error("JWT_SECRET is not defined in environment variables")
          throw new Error("JWT_SECRET is not configured")
        }

        console.log("Using JWT_SECRET:", jwtSecret.substring(0, 5) + "...")

        const token = sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: "1d" })

        console.log("Token generated successfully")

        // Don't return the password
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
          user: userWithoutPassword,
          token,
        })
      } catch (tokenError) {
        console.error("Token generation error:", tokenError)
        return NextResponse.json(
          {
            error: "Authentication failed",
            details: "Failed to generate token",
            tokenError: tokenError instanceof Error ? tokenError.message : "Unknown token error",
          },
          { status: 500 },
        )
      }
    } catch (validationError) {
      console.error("Credential validation error:", validationError)
      return NextResponse.json(
        {
          error: "Authentication failed",
          details: "Failed to validate credentials",
          validationError: validationError instanceof Error ? validationError.message : "Unknown validation error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

