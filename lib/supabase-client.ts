import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase credentials. Please check your environment variables.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Also export as default for compatibility
export default supabase

