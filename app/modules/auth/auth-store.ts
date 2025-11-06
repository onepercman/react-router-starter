import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import authService from "./auth-service"
import type { AuthCredentials, User } from "./auth-types"

interface AuthState {
	user: User | null
	token: string | null
	isLoading: boolean
	error: string | null
	login: (credentials: AuthCredentials) => Promise<void>
	logout: () => void
	clearError: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isLoading: false,
			error: null,

			login: async (credentials: AuthCredentials) => {
				set({ isLoading: true, error: null })

				try {
					const response = await authService.login(credentials)
					const { user, token } = response.data

					localStorage.setItem("auth_token", token)

					set({
						user,
						token,
						isLoading: false,
						error: null,
					})
				} catch (error: any) {
					const errorMessage = error.message || "Login failed"
					set({
						isLoading: false,
						error: errorMessage,
					})
					throw error
				}
			},

			logout: async () => {
				await authService.logout()
				set({
					user: null,
					token: null,
					error: null,
				})
			},

			clearError: () => {
				set({ error: null })
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
		},
	),
)
