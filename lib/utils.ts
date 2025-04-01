import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabase-client"

/**
 * Combines multiple class names into a single string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  if (!date) return "N/A"

  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Format a date to include time
 */
export function formatDateTime(date: Date | string): string {
  if (!date) return "N/A"

  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a number as currency without the currency symbol
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculate the number of nights between two dates
 */
export function calculateNights(checkIn: Date | string, checkOut: Date | string): number {
  if (!checkIn || !checkOut) return 0

  const checkInDate = typeof checkIn === "string" ? new Date(checkIn) : checkIn
  const checkOutDate = typeof checkOut === "string" ? new Date(checkOut) : checkOut

  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

/**
 * Save data to the database
 * @param table The table name to save data to
 * @param data The data to save
 * @param id Optional ID for updates
 * @returns The saved data or error
 */
export async function saveData(
  table: string,
  data: any,
  id?: string,
): Promise<{ data: any | null; error: any | null }> {
  try {
    // If ID is provided, update the record
    if (id) {
      const { data: updatedData, error } = await supabase.from(table).update(data).eq("id", id).select()

      return { data: updatedData, error }
    }
    // Otherwise insert a new record
    else {
      const { data: insertedData, error } = await supabase.from(table).insert(data).select()

      return { data: insertedData, error }
    }
  } catch (error) {
    console.error(`Error saving data to ${table}:`, error)
    return { data: null, error }
  }
}

/**
 * Fetch data from the database
 * @param table The table name to fetch data from
 * @param query Optional query parameters
 * @returns The fetched data or error
 */
export async function fetchData(table: string, query?: any): Promise<{ data: any | null; error: any | null }> {
  try {
    let queryBuilder = supabase.from(table).select()

    // Apply filters if provided
    if (query) {
      if (query.id) {
        queryBuilder = queryBuilder.eq("id", query.id)
      }

      if (query.filters) {
        Object.entries(query.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryBuilder = queryBuilder.eq(key, value)
          }
        })
      }

      if (query.search && query.searchFields) {
        const searchFields = Array.isArray(query.searchFields) ? query.searchFields : [query.searchFields]

        searchFields.forEach((field: string) => {
          queryBuilder = queryBuilder.ilike(field, `%${query.search}%`)
        })
      }

      if (query.orderBy) {
        const { column, ascending = true } = query.orderBy
        queryBuilder = queryBuilder.order(column, { ascending })
      }

      if (query.limit) {
        queryBuilder = queryBuilder.limit(query.limit)
      }
    }

    const { data, error } = await queryBuilder
    return { data, error }
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error)
    return { data: null, error }
  }
}

