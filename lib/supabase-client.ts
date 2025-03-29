import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

const supabaseUrl = process.env.DATABASE_URL || "https://kiyszlomrnquftanwkbw.supabase.co"
const supabaseKey = process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeXN6bG9tcm5xdWZ0YW53a2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMDUyNjIsImV4cCI6MjA1ODc4MTI2Mn0.FW0gc79rNZxnLLedpGXi5sMU7FR2_4p0n40KHvOrLDg"

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables")
}

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Don't persist session in server environment
  },
})

export default supabase

