import { type NextRequest, NextResponse } from "next/server"
import { getGuests, createGuest, getGuestByEmail } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search")

    const guests = await getGuests(search || undefined)

    return NextResponse.json(guests)
  } catch (error) {
    console.error("Error fetching guests:", error)
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if email already exists
    const existingGuest = await getGuestByEmail(body.email)

    if (existingGuest) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const guest = await createGuest({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      idNumber: body.idNumber,
      idType: body.idType,
    })

    return NextResponse.json(guest, { status: 201 })
  } catch (error) {
    console.error("Error creating guest:", error)
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 })
  }
}

