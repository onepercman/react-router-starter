import type { LoginRequest, LoginResponse } from "~/shared/types/auth-types"
import type { AuthCredentials, AuthResponse, User } from "./auth-types"

class AuthService {
  async login(
    credentials: AuthCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.email.split("@")[0],
          password: credentials.password,
        } as LoginRequest),
      })

      const result: LoginResponse = await response.json()

      if (!result.success || !result.user || !result.token) {
        throw new Error(result.message || "Login failed")
      }

      const user: User = {
        id: result.user.id,
        email: `${result.user.username}@example.com`,
        name: result.user.name,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return {
        data: { user, token: result.token },
        message: result.message,
        success: true,
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Invalid credentials"
      )
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("auth_token")
  }
}

interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export default new AuthService()
