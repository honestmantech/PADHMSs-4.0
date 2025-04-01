// A simple health check endpoint to verify the API is working
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    // Don't expose sensitive information
    config: {
      supabaseConfigured: !!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
      jwtConfigured: !!process.env.JWT_SECRET,
    },
  })
}

