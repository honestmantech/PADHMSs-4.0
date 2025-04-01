import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

// Create a Supabase client with the service role key for admin operations
// This bypasses RLS policies
const supabaseUrl = process.env.DATABASE_URL || "https://kiyszlomrnquftanwkbw.supabase.co"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.JWT_SECRET

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables for admin client")
}

const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey || "", {
  auth: {
    persistSession: false,
  },
})

export default supabaseAdmin

