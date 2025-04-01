import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET() {
  try {
    // Test the Supabase connection by making a simple query
    const { data, error } = await supabase.from("system_settings").select("*").limit(1)

    if (error) {
      let errorType = "UNKNOWN_ERROR"

      if (error.message.includes("connection")) {
        errorType = "CONNECTION_REFUSED"
      } else if (error.message.includes("authentication")) {
        errorType = "AUTHENTICATION_FAILED"
      } else if (error.message.includes("not found") || error.message.includes("doesn't exist")) {
        errorType = "DATABASE_NOT_FOUND"
      } else if (error.message.includes("timeout")) {
        errorType = "CONNECTION_TIMEOUT"
      }

      return NextResponse.json(
        {
          success: false,
          message: `Failed to connect to Supabase: ${error.message}`,
          errorType,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Supabase",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking database status:", error)

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
        errorType: "UNEXPECTED_ERROR",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

