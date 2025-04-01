import { NextResponse } from "next/server"
import supabaseAdmin from "@/lib/supabase-admin"

// Export runtime config
export const runtime = "nodejs"

export async function GET() {
  try {
    console.log("Testing database connection")
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set (value hidden)" : "Not set")
    console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set (value hidden)" : "Not set")
    console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set (value hidden)" : "Not set")

    // Test the connection with a simple query using admin client
    try {
      const { data, error } = await supabaseAdmin.from("users").select("count").limit(1)

      if (error) {
        console.error("Database connection test error:", error)
        throw error
      }

      // Try to get the admin user
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from("users")
        .select("id, email, role")
        .eq("role", "ADMIN")
        .maybeSingle()

      if (adminError && adminError.code !== "PGRST116") {
        console.error("Error fetching admin user:", adminError)
      }

      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        adminExists: !!adminData,
        adminDetails: adminData
          ? {
              id: adminData.id,
              email: adminData.email,
              role: adminData.role,
            }
          : null,
        timestamp: new Date().toISOString(),
      })
    } catch (dbError) {
      console.error("Database query error:", dbError)

      // Check for specific error types
      let errorType = "UNKNOWN_ERROR"
      let errorMessage = "Unknown database error"

      if (dbError instanceof Error) {
        errorMessage = dbError.message

        if (errorMessage.includes("ECONNREFUSED")) {
          errorType = "CONNECTION_REFUSED"
        } else if (errorMessage.includes("authentication failed")) {
          errorType = "AUTHENTICATION_FAILED"
        } else if (errorMessage.includes("does not exist")) {
          errorType = "DATABASE_NOT_FOUND"
        } else if (errorMessage.includes("timeout")) {
          errorType = "CONNECTION_TIMEOUT"
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          errorType: errorType,
          error: dbError instanceof Error ? dbError.message : String(dbError),
          stack: dbError instanceof Error ? dbError.stack : undefined,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database test error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

