import { type NextRequest, NextResponse } from "next/server"
import { createBarOrder, getBarOrders } from "@/lib/bar-utils"
import { handleApiError } from "@/lib/error-handler"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || undefined
    const paymentStatus = searchParams.get("paymentStatus") || undefined
    const roomId = searchParams.get("roomId") || undefined
    const bookingId = searchParams.get("bookingId") || undefined

    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")

    const startDate = startDateParam ? new Date(startDateParam) : undefined
    const endDate = endDateParam ? new Date(endDateParam) : undefined

    const orders = await getBarOrders({
      status,
      paymentStatus,
      roomId,
      bookingId,
      startDate,
      endDate,
    })

    return NextResponse.json(orders)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newOrder = await createBarOrder(body)
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

