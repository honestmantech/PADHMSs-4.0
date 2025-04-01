import { type NextRequest, NextResponse } from "next/server"
import { updateBarInventory, getInventoryTransactions } from "@/lib/bar-utils"
import { handleApiError } from "@/lib/error-handler"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const itemId = searchParams.get("itemId") || undefined
    const transactionType = searchParams.get("transactionType") || undefined

    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")

    const startDate = startDateParam ? new Date(startDateParam) : undefined
    const endDate = endDateParam ? new Date(endDateParam) : undefined

    const transactions = await getInventoryTransactions({
      itemId,
      transactionType,
      startDate,
      endDate,
    })

    return NextResponse.json(transactions)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const transaction = await updateBarInventory(body)
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

