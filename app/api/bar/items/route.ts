import { type NextRequest, NextResponse } from "next/server"
import { createBarItem, getBarItems } from "@/lib/bar-utils"
import { handleApiError } from "@/lib/error-handler"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category") || undefined
    const isAvailable = searchParams.has("isAvailable") ? searchParams.get("isAvailable") === "true" : undefined
    const search = searchParams.get("search") || undefined

    const items = await getBarItems({
      category,
      isAvailable,
      search,
    })

    return NextResponse.json(items)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = await createBarItem(body)
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}

