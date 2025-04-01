import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

// Initialize the Supabase client with real-time capabilities
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Function to subscribe to table changes
export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void,
  filter?: { column: string; value: string | number },
) {
  const channel = supabaseClient
    .channel(`public:${tableName}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: tableName,
        ...(filter ? { filter: `${filter.column}=eq.${filter.value}` } : {}),
      },
      (payload) => {
        callback(payload)
      },
    )
    .subscribe()

  return () => {
    supabaseClient.removeChannel(channel)
  }
}

// Function to save data to any table
export async function saveData(
  tableName: string,
  data: any,
  id?: number | string,
): Promise<{ success: boolean; data?: any; error?: any }> {
  try {
    let result

    if (id) {
      // Update existing record
      result = await supabaseClient.from(tableName).update(data).eq("id", id).select().single()
    } else {
      // Insert new record
      result = await supabaseClient.from(tableName).insert(data).select().single()
    }

    if (result.error) {
      console.error(`Error saving data to ${tableName}:`, result.error)
      return { success: false, error: result.error }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error(`Error in saveData for ${tableName}:`, error)
    return { success: false, error }
  }
}

// Function to fetch data from any table
export async function fetchData(
  tableName: string,
  options?: {
    columns?: string
    filter?: { column: string; value: any }
    limit?: number
    order?: { column: string; ascending?: boolean }
  },
): Promise<{ success: boolean; data?: any; error?: any }> {
  try {
    let query = supabaseClient.from(tableName).select(options?.columns || "*")

    if (options?.filter) {
      query = query.eq(options.filter.column, options.filter.value)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending ?? true })
    }

    const result = await query

    if (result.error) {
      console.error(`Error fetching data from ${tableName}:`, result.error)
      return { success: false, error: result.error }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error(`Error in fetchData for ${tableName}:`, error)
    return { success: false, error }
  }
}

// Function to delete data from any table
export async function deleteData(tableName: string, id: number | string): Promise<{ success: boolean; error?: any }> {
  try {
    const result = await supabaseClient.from(tableName).delete().eq("id", id)

    if (result.error) {
      console.error(`Error deleting data from ${tableName}:`, result.error)
      return { success: false, error: result.error }
    }

    return { success: true }
  } catch (error) {
    console.error(`Error in deleteData for ${tableName}:`, error)
    return { success: false, error }
  }
}

