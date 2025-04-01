import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import supabaseAdmin from "@/lib/supabase-admin"

// Export runtime config
export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Registration attempt:", { name: body.name, email: body.email, role: body.role })

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists - using admin client to bypass RLS
    console.log("Checking if user exists with email:", body.email)
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", body.email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking for existing user:", checkError)
      return NextResponse.json(
        {
          error: "Registration failed",
          details: "Error checking for existing user",
          dbError: checkError,
        },
        { status: 500 },
      )
    }

    if (existingUser) {
      console.log("User already exists with email:", body.email)
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create the user - using admin client to bypass RLS
    console.log("Creating new user with role:", body.role || "STAFF")

    try {
      // Hash the password
      const hashedPassword = await hash(body.password, 10)
      console.log("Password hashed successfully")

      // Insert the user
      const { data: user, error: insertError } = await supabaseAdmin
        .from("users")
        .insert({
          name: body.name,
          email: body.email,
          password: hashedPassword,
          role: body.role || "STAFF",
        })
        .select("id, name, email, role, created_at, updated_at")
        .single()

      if (insertError) {
        console.error("Error inserting user:", insertError)
        return NextResponse.json(
          {
            error: "Registration failed",
            details: "Error inserting user into database",
            dbError: insertError,
          },
          { status: 500 },
        )
      }

      if (!user) {
        return NextResponse.json(
          {
            error: "Registration failed",
            details: "User was not created for unknown reason",
          },
          { status: 500 },
        )
      }

      console.log("User created successfully:", user.id)
      return NextResponse.json(user, { status: 201 })
    } catch (hashError) {
      console.error("Error hashing password:", hashError)
      return NextResponse.json(
        {
          error: "Registration failed",
          details: "Error hashing password",
          hashError: hashError instanceof Error ? hashError.message : "Unknown hashing error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        error: "Registration failed",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

