import { type NextRequest, NextResponse } from "next/server"
import { getBarItemById, updateBarItem, deleteBarItem } from "@/lib/bar-utils"
import { handleApiError } from "@/lib/error-handler"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const item = await getBarItemById(params.id)
    return NextResponse.json(item)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedItem = await updateBarItem(params.id, body)
    return NextResponse.json(updatedItem)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteBarItem(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

