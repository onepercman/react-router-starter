export interface User {
	id: string
	email: string
	name: string
	role: UserRole
	avatar?: string
	createdAt: string
	updatedAt: string
}

export type UserRole = "admin" | "user" | "moderator"

export interface AuthCredentials {
	email: string
	password: string
}

export interface AuthResponse {
	user: User
	token: string
}

export interface RegisterCredentials extends AuthCredentials {
	name: string
	confirmPassword: string
}

export interface AuthState {
	isAuthenticated: boolean
	user: User | null
	token: string | null
}
