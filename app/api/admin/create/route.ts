import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import supabase from "@/lib/supabase-client"

export async function GET() {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          status: "error",
          message: "This endpoint is not available in production",
        },
        { status: 403 },
      )
    }

    // Create admin user with a fixed password
    const adminPassword = await hash("admin123", 10)

    const { data: admin, error: adminError } = await supabase
      .from("users")
      .upsert(
        {
          email: "admin@hothotelms.com",
          name: "Admin User",
          password: adminPassword,
          role: "ADMIN",
        },
        {
          onConflict: "email",
        },
      )
      .select("id, email, name, role")
      .single()

    if (adminError) {
      console.error("Error creating admin user:", adminError)
      throw adminError
    }

    return NextResponse.json({
      status: "success",
      message: "Admin user created successfully",
      data: {
        admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
        password: "admin123", // Plain text password for reference
      },
    })
  } catch (error) {
    console.error("Error creating admin user:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create admin user",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

