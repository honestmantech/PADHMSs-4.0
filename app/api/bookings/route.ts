import { type NextRequest, NextResponse } from "next/server"
import { getBookings, createBooking, getRoomAvailability } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const guestId = searchParams.get("guestId")
    const roomId = searchParams.get("roomId")

    const bookings = await getBookings({
      status: status || undefined,
      guestId: guestId || undefined,
      roomId: roomId || undefined,
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.guestId || !body.roomId || !body.userId || !body.checkInDate || !body.checkOutDate || !body.totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if room is available for the requested dates
    const checkInDate = new Date(body.checkInDate)
    const checkOutDate = new Date(body.checkOutDate)

    const availability = await getRoomAvailability(body.roomId, checkInDate, checkOutDate)

    if (!availability.available) {
      return NextResponse.json({ error: "Room is not available for the requested dates" }, { status: 400 })
    }

    const booking = await createBooking({
      guestId: body.guestId,
      roomId: body.roomId,
      userId: body.userId,
      checkInDate,
      checkOutDate,
      totalAmount: body.totalAmount,
      status: body.status,
      paymentStatus: body.paymentStatus,
      specialRequests: body.specialRequests,
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

