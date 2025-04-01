import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

export async function GET() {
  try {
    // Test the connection with a simple query
    const { data, error } = await supabase.from("rooms").select("id").limit(1)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database test error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

