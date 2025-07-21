// App configuration
export const APP_CONFIG = {
  name: "React Router Starter",
  version: "1.0.0",
  description: "Modern React Router v7 application with modular architecture",
} as const;

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  retryAttempts: 3,
} as const;

// Pagination defaults
export const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 100,
  defaultPage: 1,
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
} as const;

// Order statuses
export const ORDER_STATUSES = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

// Product categories
export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Health & Beauty",
  "Toys & Games",
  "Automotive",
  "Food & Beverages",
  "Other",
] as const;

// Local storage keys
export const STORAGE_KEYS = {
  authToken: "auth_token",
  refreshToken: "refresh_token",
  userPreferences: "user_preferences",
  theme: "theme",
} as const;

// Routes
export const ROUTES = {
  home: "/",
  dashboard: "/",
  products: "/products",
  productDetail: "/products/:id",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
  },
  user: {
    profile: "/profile",
    settings: "/settings",
  },
} as const;
