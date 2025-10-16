# Implementation Patterns

## API Client Pattern

### Axios Instance Setup

**Location**: `shared/lib/axios.ts` (NOT `shared/api/`)

```tsx
// shared/lib/axios.ts
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

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - Handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)
```

### Service Layer Pattern
```tsx
// modules/[feature]/[feature]-service.ts
import { axiosInstance } from "~/shared/lib/axios"
import type { ApiResponse } from "~/shared/lib/axios"
import type { Credentials, Response } from "./[feature]-types"

class FeatureService {
  async action(credentials: Credentials): Promise<ApiResponse<Response>> {
    const response = await axiosInstance.post<ApiResponse<Response>>(
      "/api/endpoint",
      credentials
    )
    return response.data
  }

  async cleanup(): Promise<void> {
    await axiosInstance.post("/api/cleanup")
    localStorage.removeItem("token")
  }
}

export default new FeatureService()
```

**Key Points**:
- Axios instance defined in `shared/lib/axios.ts` (not `shared/api/`)
- API types (ApiResponse, PaginationParams, etc.) defined in same file
- Import from `~/shared/lib/axios`
- Service files use pattern: `[feature]-service.ts`

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
// modules/[feature]/use-[feature].ts
import { useFeatureStore } from "./[feature]-store"

export function useFeature() {
  const data = useFeatureStore((s) => s.data)
  const isLoading = useFeatureStore((s) => s.isLoading)
  const error = useFeatureStore((s) => s.error)
  const action = useFeatureStore((s) => s.action)
  const reset = useFeatureStore((s) => s.reset)
  const clearError = useFeatureStore((s) => s.clearError)

  const isReady = !!data

  return {
    data,
    isReady,
    isLoading,
    error,
    action,
    reset,
    clearError,
  }
}
```

### React Query Hook
```tsx
// modules/[feature]/use-[feature]-data.ts
import { useQuery } from "@tanstack/react-query"
import type { DataType } from "./[feature]-types"

async function fetchData(id: string): Promise<DataType> {
  // Implementation
}

export function useFeatureData(id: string) {
  return useQuery({
    queryKey: ["feature-data", id],
    queryFn: () => fetchData(id),
    enabled: !!id,
  })
}
```

## Module Organization

**IMPORTANT**: Every module MUST have `index.ts` for barrel exports

### Flat Structure (Recommended)
```
modules/[feature]/
├── index.ts              # Barrel exports (REQUIRED)
├── [feature]-store.ts    # Zustand store (optional)
├── [feature]-service.ts  # API calls (optional)
├── [feature]-types.ts    # Type definitions
├── [feature]-components.tsx   # Components (optional)
└── use-[feature].ts      # Custom hook (optional)
```

**Barrel Export Example**:
```tsx
// modules/[feature]/index.ts (REQUIRED for each module)
export * from "./[feature]-service"
export { useFeatureStore } from "./[feature]-store"
export type { FeatureState, FeatureData } from "./[feature]-types"
export { useFeature } from "./use-[feature]"
```

**Import Usage**:
```tsx
// ✅ Correct - Import from module
import { useFeature, useFeatureStore } from "~/modules/[feature]"

// ❌ Wrong - No modules/index.ts exists
import { useFeature } from "~/modules"
```

### Simple Module (No State)
```
modules/[feature]/
├── index.ts                      # Barrel exports (REQUIRED)
├── [feature]-components.tsx      # Components
└── [feature]-types.ts            # Types
```

**Example**:
```tsx
// modules/[feature]/index.ts
export * from "./[feature]-components"
export type * from "./[feature]-types"

// modules/[feature]/[feature]-components.tsx
export function FeatureGrid({ items }: Props) { }
export function FeatureCard({ item }: Props) { }
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
// routes/[page]._index.tsx
import { useState } from "react"
import type { DataType } from "~/modules/[feature]"
import { FeatureFilters, FeatureGrid } from "~/modules/[feature]"
import { PageHeader } from "~/shared/components/page-header"
import { Button } from "~/shared/components/ui"

export default function FeaturePage() {
  const [selectedSort, setSelectedSort] = useState("newest")

  return (
    <div>
      <PageHeader title="Feature" description="Feature description">
        <Button intent="primary">Add Item</Button>
      </PageHeader>

      <FeatureFilters />
      <FeatureGrid items={items} />
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

**Location**: `shared/lib/axios.ts` (NOT `shared/api/` or `shared/types/`)

```tsx
// shared/lib/axios.ts
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

**Import pattern**:
```tsx
import { axiosInstance, type ApiResponse } from "~/shared/lib/axios"
```

### Feature Types
```tsx
// modules/[feature]/[feature]-types.ts
export type Status = "idle" | "loading" | "success" | "error"

export interface DataItem {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface FeatureState {
  data: DataItem | null
  status: Status
  isLoading: boolean
  error: string | null
  fetchData: (id: string) => Promise<void>
  reset: () => void
  clearError: () => void
}
```

## Environment Configuration

**Location**: `shared/config/environment.ts` (no index.ts)

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

**Import pattern** (direct import, no barrel):
```tsx
import { env } from "~/shared/config/environment"
```

## Shared Directory Import Patterns

### With Barrel Exports (has index.ts/tsx)
```tsx
// ✅ Use barrel exports
import { Button, TextField } from "~/shared/components/ui"
import { cn, formatDate } from "~/shared/utils"
import type { ApiResponse, User } from "~/shared/types"
```

### Without Barrel Exports (NO index)
```tsx
// ✅ Direct imports
import { axiosInstance } from "~/shared/lib/axios"
import { env } from "~/shared/config/environment"
import { APP_NAME } from "~/shared/constants/app-constants"
import { ThemeProvider } from "~/shared/providers/theme-provider"
import { QueryProvider } from "~/shared/providers/query-provider"
import { MainLayout } from "~/shared/layouts/main-layout"
import { PageHeader } from "~/shared/components/page-header"
import { useLocalStorage } from "~/shared/hooks/use-local-storage"
```

## Key Rules Summary

1. **Modules**: Each module MUST have `index.ts` for barrel exports
2. **NO** `modules/index.ts` at root level
3. **Import from modules**: `from "~/modules/[feature]"` (not `from "~/modules"`)
4. **Axios**: Located in `shared/lib/axios.ts` (NOT `shared/api/`)
5. **API Types**: Defined in `shared/lib/axios.ts` alongside axios instance
6. **Shared directories with index**: `components/ui/`, `utils/`, `types/`, `stores/`
7. **Shared directories WITHOUT index**: `lib/`, `config/`, `constants/`, `providers/`, `layouts/`, `components/`, `hooks/`
8. **Import pattern**: Use barrel exports where available, direct imports otherwise
