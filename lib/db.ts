// This file provides a unified interface for database operations
import supabase from "@/lib/supabase-client"

// Create a db object with methods for common database operations
export const db = {
  /**
   * Get all records from a table
   * @param table The table name
   * @param options Query options
   */
  async getAll(table: string, options: any = {}) {
    let query = supabase.from(table).select(options.select || "*")

    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending !== false,
      })
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    return await query
  },

  /**
   * Get a single record by ID
   * @param table The table name
   * @param id The record ID
   * @param select Fields to select
   */
  async getById(table: string, id: string, select = "*") {
    return await supabase.from(table).select(select).eq("id", id).single()
  },

  /**
   * Create a new record
   * @param table The table name
   * @param data The data to insert
   */
  async create(table: string, data: any) {
    return await supabase.from(table).insert(data).select()
  },

  /**
   * Update an existing record
   * @param table The table name
   * @param id The record ID
   * @param data The data to update
   */
  async update(table: string, id: string, data: any) {
    return await supabase.from(table).update(data).eq("id", id).select()
  },

  /**
   * Delete a record
   * @param table The table name
   * @param id The record ID
   */
  async delete(table: string, id: string) {
    return await supabase.from(table).delete().eq("id", id)
  },

  /**
   * Search for records
   * @param table The table name
   * @param column The column to search
   * @param query The search query
   * @param options Additional options
   */
  async search(table: string, column: string, query: string, options: any = {}) {
    let dbQuery = supabase
      .from(table)
      .select(options.select || "*")
      .ilike(column, `%${query}%`)

    if (options.orderBy) {
      dbQuery = dbQuery.order(options.orderBy.column, {
        ascending: options.orderBy.ascending !== false,
      })
    }

    if (options.limit) {
      dbQuery = dbQuery.limit(options.limit)
    }

    return await dbQuery
  },

  /**
   * Count records in a table
   * @param table The table name
   * @param column The column to count
   * @param options Filter options
   */
  async count(table: string, column = "id", options: any = {}) {
    let query = supabase.from(table).select(column, { count: "exact" })

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })
    }

    const { count, error } = await query
    return { count, error }
  },
}

export { supabase }

