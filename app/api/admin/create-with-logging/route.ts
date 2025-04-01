import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import supabase from "@/lib/supabase-client"

export async function GET() {
  try {
    console.log("Starting admin user creation with detailed logging")
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set (value hidden)" : "Not set")
    console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set (value hidden)" : "Not set")

    // Create admin user with a fixed password
    const adminPassword = await hash("admin123", 10)
    console.log("Generated password hash:", adminPassword)

    // First check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", "admin@hothotelms.com")
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking for existing admin:", checkError)
    }

    if (existingAdmin) {
      console.log("Admin already exists, updating password")

      const { data: updatedAdmin, error: updateError } = await supabase
        .from("users")
        .update({
          password: adminPassword,
        })
        .eq("email", "admin@hothotelms.com")
        .select("id, email, name, role")
        .single()

      if (updateError) {
        console.error("Error updating admin user:", updateError)
        throw updateError
      }

      console.log("Admin user updated successfully:", updatedAdmin.id)

      return NextResponse.json({
        status: "success",
        message: "Admin user updated successfully",
        data: {
          admin: { id: updatedAdmin.id, email: updatedAdmin.email, name: updatedAdmin.name, role: updatedAdmin.role },
          password: "admin123", // Plain text password for reference
          passwordHash: adminPassword,
        },
      })
    }

    console.log("Creating new admin user")
    const { data: admin, error: adminError } = await supabase
      .from("users")
      .insert({
        email: "admin@hothotelms.com",
        name: "Admin User",
        password: adminPassword,
        role: "ADMIN",
      })
      .select("id, email, name, role")
      .single()

    if (adminError) {
      console.error("Error creating admin user:", adminError)
      throw adminError
    }

    console.log("Admin user created successfully:", admin.id)

    return NextResponse.json({
      status: "success",
      message: "Admin user created successfully",
      data: {
        admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
        password: "admin123", // Plain text password for reference
        passwordHash: adminPassword,
      },
    })
  } catch (error) {
    console.error("Error creating admin user:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create admin user",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

