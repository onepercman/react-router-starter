# Implementation Patterns

Common implementation patterns used in this project.

## API Client Pattern

### Base Client Setup
```tsx
// shared/api/base-client.ts
import axios from "axios"
import { env } from "~/shared/config/environment"

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export { api }
```

### Service Layer Pattern
```tsx
// modules/auth/auth-service.ts
import type { ApiResponse } from "~/shared/api/base-client"
import type { AuthCredentials, AuthResponse } from "./auth-types"

class AuthService {
  async login(credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> {
    // Implementation
    return {
      data: { user, token },
      message: "Login successful",
      success: true,
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("auth_token")
  }
}

export default new AuthService()
```

## Provider Pattern

### Theme Provider
```tsx
// shared/providers/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { PropsWithChildren } from "react"

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

### React Query Provider
```tsx
// shared/providers/query-provider.tsx
import { QueryClient, QueryClientProvider, type QueryClientConfig } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
    },
  },
}

export const queryClient = new QueryClient(queryClientConfig)

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

### App Root Setup
```tsx
// app/root.tsx
import { Outlet } from "react-router"
import { MainLayout } from "~/shared/layouts/main-layout"
import QueryProvider from "./shared/providers/query-provider"
import { ThemeProvider } from "./shared/providers/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </QueryProvider>
    </ThemeProvider>
  )
}
```

## Custom Hook Pattern

### Simple Hook
```tsx
// modules/auth/use-auth.ts
import { useAuthStore } from "./auth-store"
import type { AuthCredentials } from "./auth-types"

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const error = useAuthStore((s) => s.error)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const clearError = useAuthStore((s) => s.clearError)

  const isAuthenticated = !!user

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  }
}
```

### React Query Hook
```tsx
// modules/user/use-user-profile.ts
import { useQuery } from "@tanstack/react-query"
import type { User } from "./user-types"

async function fetchUserProfile(userId: string): Promise<User> {
  // Implementation
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  })
}
```

## Module Organization

### Flat Structure (Simple Features)
```
modules/products/
├── index.ts                      # Barrel exports
├── products-components.tsx       # All components
└── products-types.ts             # Type definitions
```

**Example**:
```tsx
// modules/products/index.ts
export * from "./products-components"
export * from "./products-types"

// modules/products/products-components.tsx
export function ProductGrid({ products }: Props) { }
export function ProductFilters() { }
export function ProductCard({ product }: Props) { }
```

### With State Management
```
modules/auth/
├── index.ts              # Barrel exports
├── auth-store.ts         # Zustand store
├── auth-service.ts       # API service
├── auth-types.ts         # Type definitions
└── use-auth.ts           # Custom hook
```

## Route Composition Pattern

### Simple Route
```tsx
// routes/_index.tsx
import { Link } from "react-router"
import { Button, Card } from "~/shared/components/ui"

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  )
}
```

### Route with Module Integration
```tsx
// routes/products/index.tsx
import { useState } from "react"
import type { Product } from "~/modules/products"
import { ProductFilters, ProductGrid } from "~/modules/products"
import { PageHeader } from "~/shared/components/page-header"
import { Button } from "~/shared/components/ui"

export default function ProductsPage() {
  const [selectedSort, setSelectedSort] = useState("newest")

  return (
    <div>
      <PageHeader title="Products" description="Product catalog">
        <Button intent="primary">Add Product</Button>
      </PageHeader>

      <ProductFilters />
      <ProductGrid products={products} />
    </div>
  )
}
```

## Layout Pattern

### Main Layout
```tsx
// shared/layouts/main-layout.tsx
import { Link, useLocation } from "react-router"
import { ThemeToggle } from "../components/theme-toggle"
import { Button } from "../components/ui"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-bg border-b border-border sticky top-0">
        {/* Navigation */}
      </header>

      <main className="flex-1 bg-bg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-bg border-t border-border">
        {/* Footer content */}
      </footer>
    </div>
  )
}
```

## Shared Component Pattern

### Reusable Page Header
```tsx
// shared/components/page-header.tsx
interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-fg">{title}</h1>
        {description && (
          <p className="text-muted-fg mt-2">{description}</p>
        )}
      </div>
      {children && <div className="flex gap-3">{children}</div>}
    </div>
  )
}
```

## Type Definition Pattern

### API Types
```tsx
// shared/api/base-client.ts
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
```

### Feature Types
```tsx
// modules/auth/auth-types.ts
export type UserRole = "admin" | "user" | "guest"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}
```

## Environment Configuration

```tsx
// shared/config/environment.ts
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const env = {
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL", "http://localhost:3000/api"),
  APP_NAME: getEnvVar("VITE_APP_NAME", "React Router Starter"),
  NODE_ENV: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const
```
