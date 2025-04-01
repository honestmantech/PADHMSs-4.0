import { type NextRequest, NextResponse } from "next/server"
import { getBarSalesAnalytics } from "@/lib/bar-utils"
import { handleApiError } from "@/lib/error-handler"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const startDateParam =
      searchParams.get("startDate") || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDateParam = searchParams.get("endDate") || new Date().toISOString()

    const startDate = new Date(startDateParam)
    const endDate = new Date(endDateParam)

    const analytics = await getBarSalesAnalytics(startDate, endDate)

    return NextResponse.json(analytics)
  } catch (error) {
    return handleApiError(error)
  }
}

