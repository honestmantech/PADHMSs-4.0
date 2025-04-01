import { type NextRequest, NextResponse } from "next/server"
import { getRooms, createRoom, getRoomByNumber } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    const rooms = await getRooms({ status: status || undefined, type: type || undefined })

    return NextResponse.json(rooms)
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.roomNumber || !body.type || !body.price || !body.capacity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if room number already exists
    const existingRoom = await getRoomByNumber(body.roomNumber)

    if (existingRoom) {
      return NextResponse.json({ error: "Room number already exists" }, { status: 400 })
    }

    const room = await createRoom({
      roomNumber: body.roomNumber,
      type: body.type,
      price: body.price,
      capacity: body.capacity,
      status: body.status,
      amenities: body.amenities,
    })

    return NextResponse.json(room, { status: 201 })
  } catch (error) {
    console.error("Error creating room:", error)
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
  }
}

