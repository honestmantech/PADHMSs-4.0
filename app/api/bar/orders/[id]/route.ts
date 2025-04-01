import { type NextRequest, NextResponse } from "next/server"
import { getBarOrderById, updateBarOrder, deleteBarOrder } from "@/lib/bar-utils"
import { handleApiError } from "@/lib/error-handler"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await getBarOrderById(params.id)
    return NextResponse.json(order)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedOrder = await updateBarOrder(params.id, body)
    return NextResponse.json(updatedOrder)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteBarOrder(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

