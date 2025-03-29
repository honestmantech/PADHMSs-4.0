import supabase from "@/lib/supabase-client"

// Room utilities
export async function getRooms(filters?: {
  status?: string
  type?: string
}) {
  try {
    let query = supabase.from("rooms").select("*").order("room_number", { ascending: true })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.type) {
      query = query.eq("type", filters.type)
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting rooms:", error)
    throw error
  }
}

export async function getRoomById(id: string) {
  try {
    const { data, error } = await supabase.from("rooms").select("*").eq("id", id).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error getting room by ID:", error)
    throw error
  }
}

export async function getRoomByNumber(roomNumber: string) {
  try {
    const { data, error } = await supabase.from("rooms").select("*").eq("room_number", roomNumber).single()

    if (error && error.code !== "PGRST116") throw error

    return data
  } catch (error) {
    console.error("Error getting room by number:", error)
    throw error
  }
}

export async function createRoom(roomData: {
  roomNumber: string
  type: string
  price: number
  capacity: number
  status?: string
  amenities?: string[]
}) {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        room_number: roomData.roomNumber,
        type: roomData.type,
        price: roomData.price,
        capacity: roomData.capacity,
        status: roomData.status || "AVAILABLE",
        amenities: roomData.amenities || [],
      })
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error creating room:", error)
    throw error
  }
}

export async function updateRoom(
  id: string,
  roomData: {
    roomNumber?: string
    type?: string
    price?: number
    capacity?: number
    status?: string
    amenities?: string[]
  },
) {
  try {
    const updateData: any = {}
    if (roomData.roomNumber !== undefined) updateData.room_number = roomData.roomNumber
    if (roomData.type !== undefined) updateData.type = roomData.type
    if (roomData.price !== undefined) updateData.price = roomData.price
    if (roomData.capacity !== undefined) updateData.capacity = roomData.capacity
    if (roomData.status !== undefined) updateData.status = roomData.status
    if (roomData.amenities !== undefined) updateData.amenities = roomData.amenities

    const { data, error } = await supabase.from("rooms").update(updateData).eq("id", id).select().single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating room:", error)
    throw error
  }
}

export async function deleteRoom(id: string) {
  try {
    const { error } = await supabase.from("rooms").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.error("Error deleting room:", error)
    throw error
  }
}

export async function getRoomAvailability(roomId: string, startDate: Date, endDate: Date) {
  try {
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", roomId)
      .in("status", ["CONFIRMED", "CHECKED_IN"])
      .or(
        `check_in_date.gte.${startDate.toISOString()},check_in_date.lt.${endDate.toISOString()},` +
          `check_out_date.gt.${startDate.toISOString()},check_out_date.lte.${endDate.toISOString()},` +
          `and(check_in_date.lte.${startDate.toISOString()},check_out_date.gte.${endDate.toISOString()})`,
      )

    if (error) throw error

    return {
      available: bookings.length === 0,
      bookings: bookings || [],
    }
  } catch (error) {
    console.error("Error checking room availability:", error)
    throw error
  }
}

// Booking utilities
export async function getBookings(filters?: {
  status?: string
  guestId?: string
  roomId?: string
  startDate?: Date
  endDate?: Date
}) {
  try {
    let query = supabase
      .from("bookings")
      .select(`
        *,
        guests:guest_id(*),
        rooms:room_id(*),
        users:user_id(id, name, email)
      `)
      .order("check_in_date", { ascending: true })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.guestId) {
      query = query.eq("guest_id", filters.guestId)
    }

    if (filters?.roomId) {
      query = query.eq("room_id", filters.roomId)
    }

    if (filters?.startDate) {
      query = query.gte("check_in_date", filters.startDate.toISOString())
    }

    if (filters?.endDate) {
      query = query.lte("check_out_date", filters.endDate.toISOString())
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting bookings:", error)
    throw error
  }
}

export async function getBookingById(id: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        guests:guest_id(*),
        rooms:room_id(*),
        users:user_id(id, name, email)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error getting booking by ID:", error)
    throw error
  }
}

export async function createBooking(bookingData: {
  guestId: string
  roomId: string
  userId: string
  checkInDate: Date
  checkOutDate: Date
  totalAmount: number
  status?: string
  paymentStatus?: string
  specialRequests?: string
}) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        guest_id: bookingData.guestId,
        room_id: bookingData.roomId,
        user_id: bookingData.userId,
        check_in_date: bookingData.checkInDate.toISOString(),
        check_out_date: bookingData.checkOutDate.toISOString(),
        total_amount: bookingData.totalAmount,
        status: bookingData.status || "PENDING",
        payment_status: bookingData.paymentStatus || "UNPAID",
        special_requests: bookingData.specialRequests,
      })
      .select(`
        *,
        guests:guest_id(*),
        rooms:room_id(*)
      `)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

export async function updateBooking(
  id: string,
  bookingData: {
    status?: string
    paymentStatus?: string
    specialRequests?: string
    checkInDate?: Date
    checkOutDate?: Date
    roomId?: string
    totalAmount?: number
  },
) {
  try {
    const updateData: any = {}
    if (bookingData.status !== undefined) updateData.status = bookingData.status
    if (bookingData.paymentStatus !== undefined) updateData.payment_status = bookingData.paymentStatus
    if (bookingData.specialRequests !== undefined) updateData.special_requests = bookingData.specialRequests
    if (bookingData.checkInDate !== undefined) updateData.check_in_date = bookingData.checkInDate.toISOString()
    if (bookingData.checkOutDate !== undefined) updateData.check_out_date = bookingData.checkOutDate.toISOString()
    if (bookingData.roomId !== undefined) updateData.room_id = bookingData.roomId
    if (bookingData.totalAmount !== undefined) updateData.total_amount = bookingData.totalAmount

    const { data, error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", id)
      .select(`
        *,
        guests:guest_id(*),
        rooms:room_id(*)
      `)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating booking:", error)
    throw error
  }
}

export async function deleteBooking(id: string) {
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.error("Error deleting booking:", error)
    throw error
  }
}

// Guest utilities
export async function getGuests(search?: string) {
  try {
    let query = supabase.from("guests").select("*").order("last_name", { ascending: true })

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
      )
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting guests:", error)
    throw error
  }
}

export async function getGuestById(id: string) {
  try {
    const { data, error } = await supabase.from("guests").select("*").eq("id", id).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error getting guest by ID:", error)
    throw error
  }
}

export async function getGuestByEmail(email: string) {
  try {
    const { data, error } = await supabase.from("guests").select("*").eq("email", email).single()

    if (error && error.code !== "PGRST116") throw error

    return data
  } catch (error) {
    console.error("Error getting guest by email:", error)
    throw error
  }
}

export async function createGuest(guestData: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  idNumber?: string
  idType?: string
}) {
  try {
    const { data, error } = await supabase
      .from("guests")
      .insert({
        first_name: guestData.firstName,
        last_name: guestData.lastName,
        email: guestData.email,
        phone: guestData.phone,
        address: guestData.address,
        id_number: guestData.idNumber,
        id_type: guestData.idType,
      })
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error creating guest:", error)
    throw error
  }
}

export async function updateGuest(
  id: string,
  guestData: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    address?: string
    idNumber?: string
    idType?: string
  },
) {
  try {
    const updateData: any = {}
    if (guestData.firstName !== undefined) updateData.first_name = guestData.firstName
    if (guestData.lastName !== undefined) updateData.last_name = guestData.lastName
    if (guestData.email !== undefined) updateData.email = guestData.email
    if (guestData.phone !== undefined) updateData.phone = guestData.phone
    if (guestData.address !== undefined) updateData.address = guestData.address
    if (guestData.idNumber !== undefined) updateData.id_number = guestData.idNumber
    if (guestData.idType !== undefined) updateData.id_type = guestData.idType

    const { data, error } = await supabase.from("guests").update(updateData).eq("id", id).select().single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating guest:", error)
    throw error
  }
}

export async function deleteGuest(id: string) {
  try {
    const { error } = await supabase.from("guests").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.error("Error deleting guest:", error)
    throw error
  }
}

// Dashboard utilities
export async function getDashboardStats() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Get total rooms
    const { data: rooms, error: roomsError } = await supabase.from("rooms").select("id, status")

    if (roomsError) throw roomsError

    // Get today's check-ins
    const { data: todayCheckIns, error: checkInsError } = await supabase
      .from("bookings")
      .select("id")
      .gte("check_in_date", today.toISOString())
      .lt("check_in_date", tomorrow.toISOString())

    if (checkInsError) throw checkInsError

    // Get today's check-outs
    const { data: todayCheckOuts, error: checkOutsError } = await supabase
      .from("bookings")
      .select("id")
      .gte("check_out_date", today.toISOString())
      .lt("check_out_date", tomorrow.toISOString())

    if (checkOutsError) throw checkOutsError

    // Get total guests
    const { count: totalGuests, error: guestsError } = await supabase
      .from("guests")
      .select("id", { count: "exact", head: true })

    if (guestsError) throw guestsError

    // Get total bookings
    const { count: totalBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })

    if (bookingsError) throw bookingsError

    // Get bookings this month
    const { data: bookingsThisMonth, error: monthBookingsError } = await supabase
      .from("bookings")
      .select("total_amount")
      .gte("created_at", firstDayOfMonth.toISOString())

    if (monthBookingsError) throw monthBookingsError

    // Calculate stats
    const totalRooms = rooms.length
    const availableRooms = rooms.filter((room) => room.status === "AVAILABLE").length
    const occupiedRooms = rooms.filter((room) => room.status === "OCCUPIED").length
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0

    // Calculate revenue this month
    const revenueThisMonth = bookingsThisMonth.reduce((total, booking) => total + booking.total_amount, 0)

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      occupancyRate,
      todayCheckIns: todayCheckIns.length,
      todayCheckOuts: todayCheckOuts.length,
      totalGuests: totalGuests || 0,
      totalBookings: totalBookings || 0,
      revenueThisMonth,
    }
  } catch (error) {
    console.error("Error getting dashboard stats:", error)
    throw error
  }
}

