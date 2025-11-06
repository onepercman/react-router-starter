import axios from "axios"
import { env } from "~/shared/config/environment"

export interface ApiResponse<T = any> {
	data: T
	message?: string
	success: boolean
}

export interface PaginationParams {
	page?: number
	limit?: number
	sortBy?: string
	sortOrder?: "asc" | "desc"
}

export interface PaginationMeta {
	page: number
	limit: number
	total: number
	totalPages: number
}

export interface PaginatedResponse<T> {
	data: T[]
	meta: PaginationMeta
}

export interface ApiError {
	message: string
	code?: string
	status?: number
	details?: any
}

const api = axios.create({
	baseURL: env.API_BASE_URL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("auth_token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("auth_token")
			window.location.href = "/login"
		}
		return Promise.reject(error)
	},
)

export { api }
