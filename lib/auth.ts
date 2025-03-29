import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import supabase from "@/lib/supabase-client"

export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned - user not found
        return null
      }
      throw error
    }

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
    const user = await getUserByEmail(email)

    if (!user) {
      return null
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  } catch (error) {
    console.error("Error validating credentials:", error)
    throw error
  }
}

export async function generateToken(user: { id: string; email: string; role: string }) {
  return sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "1d",
  })
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

