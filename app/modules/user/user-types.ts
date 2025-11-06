export interface UserProfile {
	id: string
	email: string
	name: string
	avatar?: string
	bio?: string
	location?: string
	website?: string
	socialLinks?: {
		twitter?: string
		linkedin?: string
		github?: string
	}
	createdAt: string
	updatedAt: string
}

export interface UserPreferences {
	id: string
	userId: string
	theme: "light" | "dark" | "system"
	language: string
	notifications: {
		email: boolean
		push: boolean
		sms: boolean
	}
	privacy: {
		profileVisibility: "public" | "private" | "friends"
		showEmail: boolean
		showLocation: boolean
	}
	createdAt: string
	updatedAt: string
}

export interface UserStats {
	totalPosts: number
	totalFollowers: number
	totalFollowing: number
	joinDate: string
}
