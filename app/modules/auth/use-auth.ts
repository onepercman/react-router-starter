import { useCallback } from "react"
import { useAuthStore } from "./auth-store"
import type { AuthCredentials } from "./auth-types"

export const useAuth = () => {
	const { user, token, isLoading, error, login, logout, clearError } =
		useAuthStore()

	const isAuthenticated = !!user && !!token

	const handleLogin = useCallback(
		async (credentials: AuthCredentials) => {
			try {
				await login(credentials)
				return { success: true }
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Login failed",
				}
			}
		},
		[login],
	)

	const handleLogout = useCallback(() => {
		logout()
	}, [logout])

	return {
		user,
		token,
		isLoading,
		error,
		isAuthenticated,
		login: handleLogin,
		logout: handleLogout,
		clearError,
	}
}
