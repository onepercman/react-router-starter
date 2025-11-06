import { useCallback, useEffect } from "react"
import { useUserStore } from "./user-store"
import type { UserPreferences, UserProfile } from "./user-types"

export const useUserProfile = (userId?: string) => {
	const {
		profile,
		preferences,
		isLoading,
		error,
		fetchProfile,
		updateProfile,
		updatePreferences,
		clearError,
	} = useUserStore()

	useEffect(() => {
		if (userId) {
			fetchProfile(userId)
		}
	}, [userId, fetchProfile])

	const handleUpdateProfile = useCallback(
		async (profileData: Partial<UserProfile>) => {
			try {
				await updateProfile(profileData)
				return { success: true }
			} catch (error) {
				return {
					success: false,
					error:
						error instanceof Error ? error.message : "Failed to update profile",
				}
			}
		},
		[updateProfile],
	)

	const handleUpdatePreferences = useCallback(
		async (preferencesData: Partial<UserPreferences>) => {
			try {
				await updatePreferences(preferencesData)
				return { success: true }
			} catch (error) {
				return {
					success: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to update preferences",
				}
			}
		},
		[updatePreferences],
	)

	return {
		profile,
		preferences,
		isLoading,
		error,
		updateProfile: handleUpdateProfile,
		updatePreferences: handleUpdatePreferences,
		clearError,
	}
}
