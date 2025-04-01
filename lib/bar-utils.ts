import supabase from "@/lib/supabase-client"

// Bar Item utilities
export async function getBarItems(filters?: {
  category?: string
  isAvailable?: boolean
  search?: string
}) {
  try {
    let query = supabase.from("bar_items").select("*").order("name", { ascending: true })

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    if (filters?.isAvailable !== undefined) {
      query = query.eq("is_available", filters.isAvailable)
    }

    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting bar items:", error)
    throw error
  }
}

export async function getBarItemById(id: string) {
  try {
    const { data, error } = await supabase.from("bar_items").select("*").eq("id", id).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error getting bar item by ID:", error)
    throw error
  }
}

export async function createBarItem(itemData: {
  name: string
  category: string
  price: number
  cost: number
  stockQuantity: number
  unit: string
  description?: string
  imageUrl?: string
  isAvailable?: boolean
}) {
  try {
    const { data, error } = await supabase
      .from("bar_items")
      .insert({
        name: itemData.name,
        category: itemData.category,
        price: itemData.price,
        cost: itemData.cost,
        stock_quantity: itemData.stockQuantity,
        unit: itemData.unit,
        description: itemData.description,
        image_url: itemData.imageUrl,
        is_available: itemData.isAvailable !== undefined ? itemData.isAvailable : true,
      })
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error creating bar item:", error)
    throw error
  }
}

export async function updateBarItem(
  id: string,
  itemData: {
    name?: string
    category?: string
    price?: number
    cost?: number
    stockQuantity?: number
    unit?: string
    description?: string
    imageUrl?: string
    isAvailable?: boolean
  },
) {
  try {
    const updateData: any = {}
    if (itemData.name !== undefined) updateData.name = itemData.name
    if (itemData.category !== undefined) updateData.category = itemData.category
    if (itemData.price !== undefined) updateData.price = itemData.price
    if (itemData.cost !== undefined) updateData.cost = itemData.cost
    if (itemData.stockQuantity !== undefined) updateData.stock_quantity = itemData.stockQuantity
    if (itemData.unit !== undefined) updateData.unit = itemData.unit
    if (itemData.description !== undefined) updateData.description = itemData.description
    if (itemData.imageUrl !== undefined) updateData.image_url = itemData.imageUrl
    if (itemData.isAvailable !== undefined) updateData.is_available = itemData.isAvailable
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase.from("bar_items").update(updateData).eq("id", id).select().single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating bar item:", error)
    throw error
  }
}

export async function deleteBarItem(id: string) {
  try {
    const { error } = await supabase.from("bar_items").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.error("Error deleting bar item:", error)
    throw error
  }
}

// Bar Order utilities
export async function getBarOrders(filters?: {
  status?: string
  paymentStatus?: string
  roomId?: string
  bookingId?: string
  startDate?: Date
  endDate?: Date
}) {
  try {
    let query = supabase
      .from("bar_orders")
      .select(`
        *,
        rooms:room_id(*),
        bookings:booking_id(*),
        users:user_id(id, name, email)
      `)
      .order("created_at", { ascending: false })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.paymentStatus) {
      query = query.eq("payment_status", filters.paymentStatus)
    }

    if (filters?.roomId) {
      query = query.eq("room_id", filters.roomId)
    }

    if (filters?.bookingId) {
      query = query.eq("booking_id", filters.bookingId)
    }

    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString())
    }

    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString())
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting bar orders:", error)
    throw error
  }
}

export async function getBarOrderById(id: string) {
  try {
    const { data: order, error: orderError } = await supabase
      .from("bar_orders")
      .select(`
        *,
        rooms:room_id(*),
        bookings:booking_id(*),
        users:user_id(id, name, email)
      `)
      .eq("id", id)
      .single()

    if (orderError) throw orderError

    const { data: orderItems, error: itemsError } = await supabase
      .from("bar_order_items")
      .select(`
        *,
        bar_items:item_id(*)
      `)
      .eq("order_id", id)

    if (itemsError) throw itemsError

    return {
      ...order,
      items: orderItems || [],
    }
  } catch (error) {
    console.error("Error getting bar order by ID:", error)
    throw error
  }
}

export async function createBarOrder(orderData: {
  customerName?: string
  roomId?: string
  bookingId?: string
  userId: string
  status?: string
  paymentStatus?: string
  paymentMethod?: string
  notes?: string
  items: Array<{
    itemId: string
    quantity: number
    unitPrice: number
    notes?: string
  }>
}) {
  try {
    // Generate order number
    const orderNumber = `BO-${Date.now().toString().slice(-6)}`

    // Calculate total amount
    const totalAmount = orderData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("bar_orders")
      .insert({
        order_number: orderNumber,
        customer_name: orderData.customerName,
        room_id: orderData.roomId,
        booking_id: orderData.bookingId,
        user_id: orderData.userId,
        status: orderData.status || "PENDING",
        total_amount: totalAmount,
        payment_status: orderData.paymentStatus || "UNPAID",
        payment_method: orderData.paymentMethod,
        notes: orderData.notes,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      item_id: item.itemId,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.quantity * item.unitPrice,
      notes: item.notes,
    }))

    const { data: items, error: itemsError } = await supabase.from("bar_order_items").insert(orderItems).select()

    if (itemsError) throw itemsError

    // Update inventory
    for (const item of orderData.items) {
      // Deduct from inventory
      await supabase.rpc("update_bar_item_stock", {
        p_item_id: item.itemId,
        p_quantity: -item.quantity,
      })

      // Record inventory transaction
      await supabase.from("bar_inventory_transactions").insert({
        item_id: item.itemId,
        transaction_type: "SALE",
        quantity: -item.quantity,
        reference_id: order.id,
        user_id: orderData.userId,
        notes: `Order ${orderNumber}`,
      })
    }

    return {
      ...order,
      items,
    }
  } catch (error) {
    console.error("Error creating bar order:", error)
    throw error
  }
}

export async function updateBarOrder(
  id: string,
  orderData: {
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    notes?: string
  },
) {
  try {
    const updateData: any = {}
    if (orderData.status !== undefined) updateData.status = orderData.status
    if (orderData.paymentStatus !== undefined) updateData.payment_status = orderData.paymentStatus
    if (orderData.paymentMethod !== undefined) updateData.payment_method = orderData.paymentMethod
    if (orderData.notes !== undefined) updateData.notes = orderData.notes
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase.from("bar_orders").update(updateData).eq("id", id).select().single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating bar order:", error)
    throw error
  }
}

export async function deleteBarOrder(id: string) {
  try {
    // Get order items to restore inventory
    const { data: orderItems, error: itemsError } = await supabase
      .from("bar_order_items")
      .select("item_id, quantity")
      .eq("order_id", id)

    if (itemsError) throw itemsError

    // Delete the order (cascade will delete order items)
    const { error } = await supabase.from("bar_orders").delete().eq("id", id)

    if (error) throw error

    // Restore inventory for each item
    for (const item of orderItems || []) {
      await supabase.rpc("update_bar_item_stock", {
        p_item_id: item.item_id,
        p_quantity: item.quantity,
      })

      // Record inventory transaction
      await supabase.from("bar_inventory_transactions").insert({
        item_id: item.item_id,
        transaction_type: "RETURN",
        quantity: item.quantity,
        notes: `Order deleted`,
      })
    }

    return true
  } catch (error) {
    console.error("Error deleting bar order:", error)
    throw error
  }
}

// Bar Inventory utilities
export async function updateBarInventory(transactionData: {
  itemId: string
  transactionType: string
  quantity: number
  unitCost?: number
  notes?: string
  userId: string
  referenceId?: string
}) {
  try {
    // Calculate total cost if unit cost is provided
    const totalCost = transactionData.unitCost
      ? transactionData.unitCost * Math.abs(transactionData.quantity)
      : undefined

    // Create inventory transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("bar_inventory_transactions")
      .insert({
        item_id: transactionData.itemId,
        transaction_type: transactionData.transactionType,
        quantity: transactionData.quantity,
        unit_cost: transactionData.unitCost,
        total_cost: totalCost,
        reference_id: transactionData.referenceId,
        notes: transactionData.notes,
        user_id: transactionData.userId,
      })
      .select()
      .single()

    if (transactionError) throw transactionError

    // Update item stock
    await supabase.rpc("update_bar_item_stock", {
      p_item_id: transactionData.itemId,
      p_quantity: transactionData.quantity,
    })

    // If it's a purchase/restock, update the item cost if provided
    if (transactionData.transactionType === "PURCHASE" && transactionData.unitCost) {
      await supabase
        .from("bar_items")
        .update({
          cost: transactionData.unitCost,
          updated_at: new Date().toISOString(),
        })
        .eq("id", transactionData.itemId)
    }

    return transaction
  } catch (error) {
    console.error("Error updating bar inventory:", error)
    throw error
  }
}

export async function getInventoryTransactions(filters?: {
  itemId?: string
  transactionType?: string
  startDate?: Date
  endDate?: Date
}) {
  try {
    let query = supabase
      .from("bar_inventory_transactions")
      .select(`
        *,
        bar_items:item_id(*),
        users:user_id(id, name, email)
      `)
      .order("created_at", { ascending: false })

    if (filters?.itemId) {
      query = query.eq("item_id", filters.itemId)
    }

    if (filters?.transactionType) {
      query = query.eq("transaction_type", filters.transactionType)
    }

    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString())
    }

    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString())
    }

    const { data, error } = await query

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting inventory transactions:", error)
    throw error
  }
}

// Bar Analytics utilities
export async function getBarSalesAnalytics(startDate: Date, endDate: Date) {
  try {
    // Get sales by day
    const { data: dailySales, error: dailyError } = await supabase
      .from("bar_orders")
      .select("created_at, total_amount")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .eq("status", "COMPLETED")

    if (dailyError) throw dailyError

    // Get sales by category
    const { data: categorySales, error: categoryError } = await supabase
      .from("bar_order_items")
      .select(`
        total_price,
        bar_items:item_id(category)
      `)
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())

    if (categoryError) throw categoryError

    // Get top selling items
    const { data: topItems, error: topItemsError } = await supabase
      .from("bar_order_items")
      .select(`
        item_id,
        bar_items:item_id(name, category),
        quantity
      `)
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())

    if (topItemsError) throw topItemsError

    // Process daily sales
    const salesByDay = dailySales?.reduce((acc: Record<string, number>, sale) => {
      const date = new Date(sale.created_at).toISOString().split("T")[0]
      acc[date] = (acc[date] || 0) + sale.total_amount
      return acc
    }, {})

    // Process category sales
    const salesByCategory = categorySales?.reduce((acc: Record<string, number>, sale) => {
      const category = sale.bar_items?.category || "Unknown"
      acc[category] = (acc[category] || 0) + sale.total_price
      return acc
    }, {})

    // Process top items
    const itemSales = topItems?.reduce(
      (acc: Record<string, { name: string; category: string; quantity: number }>, item) => {
        const itemId = item.item_id
        if (!acc[itemId]) {
          acc[itemId] = {
            name: item.bar_items?.name || "Unknown",
            category: item.bar_items?.category || "Unknown",
            quantity: 0,
          }
        }
        acc[itemId].quantity += item.quantity
        return acc
      },
      {},
    )

    // Convert to array and sort
    const topSellingItems = Object.entries(itemSales || {})
      .map(([id, data]) => ({
        id,
        name: data.name,
        category: data.category,
        quantity: data.quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10)

    return {
      salesByDay,
      salesByCategory,
      topSellingItems,
      totalSales: dailySales?.reduce((sum, sale) => sum + sale.total_amount, 0) || 0,
      totalOrders: dailySales?.length || 0,
    }
  } catch (error) {
    console.error("Error getting bar sales analytics:", error)
    throw error
  }
}

