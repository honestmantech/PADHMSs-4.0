import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { handleApiError } from "@/lib/error-handler"

export async function GET() {
  try {
    // Get settings from database
    const settings = await db.query(`SELECT * FROM system_settings WHERE id = 1`)

    if (settings.rows.length === 0) {
      // Create default settings if none exist
      const defaultSettings = {
        theme: "system",
        primaryColor: "blue",
        accentColor: "teal",
        currency: "GHS",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        language: "en",
      }

      await db.query(`INSERT INTO system_settings (id, settings) VALUES (1, $1)`, [JSON.stringify(defaultSettings)])

      return NextResponse.json({ settings: defaultSettings })
    }

    return NextResponse.json({ settings: settings.rows[0].settings })
  } catch (error) {
    return handleApiError(error, "Failed to fetch settings")
  }
}

export async function POST(request: NextRequest) {
  try {
    const { settings } = await request.json()

    // Update settings in database
    await db.query(
      `INSERT INTO system_settings (id, settings) 
       VALUES (1, $1)
       ON CONFLICT (id) DO UPDATE SET settings = $1`,
      [JSON.stringify(settings)],
    )

    return NextResponse.json({ success: true, settings })
  } catch (error) {
    return handleApiError(error, "Failed to update settings")
  }
}

