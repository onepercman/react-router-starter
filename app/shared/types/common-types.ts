// Base types
export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}

// Base user types (renamed to avoid conflict with auth User)
export interface BaseUser extends BaseEntity {
  name: string
  email: string
  role: UserRole
  isActive: boolean
}

export type UserRole = "admin" | "user" | "manager"

// Product types
export interface Product extends BaseEntity {
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  isActive: boolean
}

// Order types
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

// Address types
export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// API types
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

// Form types
export interface FormError {
  field: string
  message: string
}

// Navigation types
export interface NavItem {
  path: string
  label: string
  icon?: string
  children?: NavItem[]
}
