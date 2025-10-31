import type { LoginRequest, LoginResponse } from "~/shared/types/auth-types"
import type { Route } from "./+types/api.login"

const HARDCODED_USER = {
  username: "admin",
  password: "admin123",
  id: "1",
  name: "Admin User",
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    )
  }

  try {
    const body = (await request.json()) as LoginRequest

    if (!body.username || !body.password) {
      return Response.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      )
    }

    if (
      body.username === HARDCODED_USER.username &&
      body.password === HARDCODED_USER.password
    ) {
      const token = `mock-jwt-token-${Date.now()}`

      const response: LoginResponse = {
        success: true,
        message: "Login successful",
        user: {
          id: HARDCODED_USER.id,
          username: HARDCODED_USER.username,
          name: HARDCODED_USER.name,
        },
        token,
      }

      return Response.json(response, { status: 200 })
    }

    return Response.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 }
    )
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    )
  }
}
