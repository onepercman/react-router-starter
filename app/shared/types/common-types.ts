export interface BaseEntity {
	id: number
	createdAt: Date
	updatedAt: Date
}

export interface BaseUser extends BaseEntity {
	name: string
	email: string
	role: UserRole
	isActive: boolean
}

export type UserRole = "admin" | "user" | "manager"

export interface Product extends BaseEntity {
	name: string
	description: string
	price: number
	category: string
	stock: number
	images: string[]
	isActive: boolean
}

export interface Order extends BaseEntity {
	userId: number
	status: OrderStatus
	items: OrderItem[]
	total: number
	shippingAddress: Address
}

export type OrderStatus =
	| "pending"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled"

export interface OrderItem {
	productId: number
	quantity: number
	price: number
}

export interface Address {
	street: string
	city: string
	state: string
	zipCode: string
	country: string
}

export interface ApiResponse<T> {
	data: T
	message: string
	success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		page: number
		limit: number
		total: number
		totalPages: number
	}
}

export interface FormError {
	field: string
	message: string
}

export interface NavItem {
	path: string
	label: string
	icon?: string
	children?: NavItem[]
}
