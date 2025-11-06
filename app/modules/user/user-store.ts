import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { api } from "~/shared/lib/axios"
import type { UserPreferences, UserProfile } from "./user-types"

interface UserState {
	profile: UserProfile | null
	preferences: UserPreferences | null
	isLoading: boolean
	error: string | null
	fetchProfile: (userId: string) => Promise<void>
	updateProfile: (profile: Partial<UserProfile>) => Promise<void>
	updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>
	clearError: () => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			profile: null,
			preferences: null,
			isLoading: false,
			error: null,

			fetchProfile: async (userId: string) => {
				set({ isLoading: true, error: null })

				try {
					const response = await api.get<UserProfile>(
						`/users/${userId}/profile`,
					)
					set({
						profile: response.data,
						isLoading: false,
						error: null,
					})
				} catch (error: any) {
					const errorMessage =
						error.response?.data?.message || "Failed to fetch profile"
					set({
						isLoading: false,
						error: errorMessage,
					})
					throw new Error(errorMessage)
				}
			},

			updateProfile: async (profile: Partial<UserProfile>) => {
				set({ isLoading: true, error: null })

				try {
					const response = await api.patch<UserProfile>(
						"/users/profile",
						profile,
					)
					set({
						profile: response.data,
						isLoading: false,
						error: null,
					})
				} catch (error: any) {
					const errorMessage =
						error.response?.data?.message || "Failed to update profile"
					set({
						isLoading: false,
						error: errorMessage,
					})
					throw new Error(errorMessage)
				}
			},

			updatePreferences: async (preferences: Partial<UserPreferences>) => {
				set({ isLoading: true, error: null })

				try {
					const response = await api.patch<UserPreferences>(
						"/users/preferences",
						preferences,
					)
					set({
						preferences: response.data,
						isLoading: false,
						error: null,
					})
				} catch (error: any) {
					const errorMessage =
						error.response?.data?.message || "Failed to update preferences"
					set({
						isLoading: false,
						error: errorMessage,
					})
					throw new Error(errorMessage)
				}
			},

			clearError: () => {
				set({ error: null })
			},
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				profile: state.profile,
				preferences: state.preferences,
			}),
		},
	),
)
