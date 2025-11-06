import type { ApiResponse } from "~/shared/lib/axios"
import type { AuthCredentials, AuthResponse } from "./auth-types"

const mockUsers = [
	{
		id: "1",
		email: "admin@example.com",
		name: "Admin User",
		role: "admin" as const,
		avatar: "https://i.pravatar.cc/150?img=1",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "2",
		email: "user@example.com",
		name: "John Doe",
		role: "user" as const,
		avatar: "https://i.pravatar.cc/150?img=2",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
]

class AuthService {
	async login(
		credentials: AuthCredentials,
	): Promise<ApiResponse<AuthResponse>> {
		const user = mockUsers.find((u) => u.email === credentials.email)

		if (!user || credentials.password !== "password") {
			throw new Error("Invalid credentials")
		}

		const token = `mock_token_${user.id}_${Date.now()}`

		return {
			data: { user, token },
			message: "Login successful",
			success: true,
		}
	}

	async logout(): Promise<void> {
		localStorage.removeItem("auth_token")
	}
}

export default new AuthService()
