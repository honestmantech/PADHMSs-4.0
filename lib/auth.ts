import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import supabase from "@/lib/supabase-client"

export async function getUserByEmail(email: string) {
  try {
    console.log("Looking up user by email:", email)
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error) {
      if (error.code === "PGRST116") {
        console.log("User not found with email:", email)
        return null
      }
      console.error("Error fetching user by email:", error)
      throw error
    }

    console.log("User found:", data.id)
    return data
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

export async function getUserById(id: string) {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned - user not found
        return null
      }
      throw error
    }

    return data
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  role?: "ADMIN" | "MANAGER" | "STAFF"
}) {
  try {
    const hashedPassword = await hash(userData.password, 10)

    const { data, error } = await supabase
      .from("users")
      .insert({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || "STAFF",
      })
      .select("id, name, email, role, created_at, updated_at")
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function validateCredentials(email: string, password: string) {
  try {
    console.log("Validating credentials for email:", email)
    const user = await getUserByEmail(email)

    if (!user) {
      console.log("No user found with email:", email)
      return null
    }

    console.log("User found, comparing password for user:", user.id)
    console.log("Stored password hash:", user.password.substring(0, 10) + "...")

    try {
      const isPasswordValid = await compare(password, user.password)
      console.log("Password comparison result:", isPasswordValid)

      if (!isPasswordValid) {
        console.log("Password validation failed for user:", user.id)
        return null
      }

      console.log("Password validation successful for user:", user.id)
      // Don't return the password
      const { password: _, ...userWithoutPassword } = user

      return userWithoutPassword
    } catch (passwordError) {
      console.error("Error during password comparison:", passwordError)
      throw new Error(`Password comparison failed: ${passwordError.message}`)
    }
  } catch (error) {
    console.error("Error validating credentials:", error)
    throw error
  }
}

export async function generateToken(user: { id: string; email: string; role: string }) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables")
      throw new Error("JWT_SECRET is not configured")
    }

    return sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "1d",
    })
  } catch (error) {
    console.error("Error generating token:", error)
    throw error
  }
}

export async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key")
    return decoded
  } catch (error) {
    return null
  }
}

export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, created_at, updated_at")
      .order("name", { ascending: true })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

export async function updateUser(
  id: string,
  userData: {
    name?: string
    email?: string
    password?: string
    role?: "ADMIN" | "MANAGER" | "STAFF"
  },
) {
  try {
    const updateData: any = {}
    if (userData.name !== undefined) updateData.name = userData.name
    if (userData.email !== undefined) updateData.email = userData.email
    if (userData.role !== undefined) updateData.role = userData.role

    if (userData.password) {
      updateData.password = await hash(userData.password, 10)
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("id, name, email, role, created_at, updated_at")
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

export async function deleteUser(id: string) {
  try {
    const { error } = await supabase.from("users").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

// Add a function to create a default admin user if it doesn't exist
export async function ensureDefaultAdminExists() {
  try {
    const adminEmail = "admin@hothotelms.com"
    console.log("Checking if admin exists:", adminEmail)

    const existingAdmin = await getUserByEmail(adminEmail)

    if (!existingAdmin) {
      console.log("Admin not found, creating default admin user")
      const adminPassword = await hash("admin123", 10)
      console.log("Generated password hash for admin")

      const { data, error } = await supabase
        .from("users")
        .insert({
          name: "Admin User",
          email: adminEmail,
          password: adminPassword,
          role: "ADMIN",
        })
        .select("id, name, email, role")
        .single()

      if (error) {
        console.error("Supabase error creating admin:", error)
        throw error
      }

      console.log("Default admin user created:", data.id)
      return data
    }

    console.log("Admin already exists:", existingAdmin.id)
    return existingAdmin
  } catch (error) {
    console.error("Error ensuring default admin exists:", error)
    throw error
  }
}

