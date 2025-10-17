# API Design Patterns

HTTP client, stores, React Query, and service layer patterns.

## Axios Instance Setup

**Location**: `shared/lib/axios.ts` (NOT `shared/api/`)

```tsx
// shared/lib/axios.ts
import axios from "axios"
import { env } from "~/shared/config/environment"

// API types (defined here, NOT in shared/types/)
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

**Key Points**:
- Axios instance in `shared/lib/axios.ts`
- API types defined in same file
- Import: `from "~/shared/lib/axios"`

## Service Layer Pattern

```tsx
// modules/[feature]/[feature]-service.ts
import { axiosInstance, type ApiResponse } from "~/shared/lib/axios"
import type { Credentials, Response } from "./[feature]-types"

class FeatureService {
  async action(credentials: Credentials): Promise<ApiResponse<Response>> {
    const response = await axiosInstance.post<ApiResponse<Response>>(
      "/api/endpoint",
      credentials
    )
    return response.data
  }

  async getList(params: PaginationParams): Promise<PaginatedResponse<Item>> {
    const response = await axiosInstance.get("/api/items", { params })
    return response.data
  }

  async cleanup(): Promise<void> {
    await axiosInstance.post("/api/cleanup")
    localStorage.removeItem("token")
  }
}

export default new FeatureService()
```

**Export Pattern**:
```tsx
// modules/[feature]/index.ts
export { default as featureService } from "./[feature]-service"
```

## Zustand Store Pattern

### Store with API Integration

```tsx
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import service from "./[feature]-service"
import type { DataItem } from "./[feature]-types"

interface FeatureState {
  data: DataItem | null
  token: string | null
  isLoading: boolean
  error: string | null
  action: (params: any) => Promise<void>
  reset: () => void
  clearError: () => void
}

export const useFeatureStore = create<FeatureState>()(
  persist(
    (set) => ({
      data: null,
      token: null,
      isLoading: false,
      error: null,

      action: async (params: any) => {
        set({ isLoading: true, error: null })
        try {
          const response = await service.action(params)
          const { data, token } = response.data
          localStorage.setItem("token", token)
          set({ data, token, isLoading: false })
        } catch (error: any) {
          const msg = error.message || "Action failed"
          set({ isLoading: false, error: msg })
          throw error
        }
      },

      reset: async () => {
        await service.cleanup()
        set({ data: null, token: null, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "feature-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        data: state.data,
        token: state.token,
      }),
    }
  )
)
```

### Store Usage

```tsx
// ✅ Select specific (recommended)
const data = useFeatureStore((s) => s.data)
const action = useFeatureStore((s) => s.action)

// ✅ Select multiple
const { data, isLoading } = useFeatureStore((s) => ({
  data: s.data,
  isLoading: s.isLoading
}))

// ❌ Avoid entire store
const store = useFeatureStore()  // Causes unnecessary re-renders
```

## React Query Pattern

### Query Hook

```tsx
// modules/[feature]/use-[feature]-data.ts
import { useQuery } from "@tanstack/react-query"
import service from "./[feature]-service"
import type { DataItem } from "./[feature]-types"

export function useFeatureData(id: string) {
  return useQuery({
    queryKey: ["feature-data", id],
    queryFn: () => service.getData(id),
    enabled: !!id,
  })
}
```

### Mutation Hook

```tsx
// modules/[feature]/use-[feature]-mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import service from "./[feature]-service"

export function useFeatureMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature-data"] })
    },
  })
}
```

### React Query Provider Setup

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

## Custom Hook Pattern

### Wrapper Hook (Zustand)

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

## Environment Configuration

**Location**: `shared/config/environment.ts` (NO index.ts)

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

**Import** (direct, no barrel):
```tsx
import { env } from "~/shared/config/environment"
```

## Provider Pattern

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

## Type Definition Pattern

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
}
```

### Service Method Types

```tsx
// modules/[feature]/[feature]-service.ts
interface CreateParams {
  name: string
  description?: string
}

interface UpdateParams extends Partial<CreateParams> {
  id: string
}

class FeatureService {
  async create(params: CreateParams): Promise<ApiResponse<DataItem>> {
    const response = await axiosInstance.post("/api/items", params)
    return response.data
  }

  async update(params: UpdateParams): Promise<ApiResponse<DataItem>> {
    const { id, ...data } = params
    const response = await axiosInstance.put(`/api/items/${id}`, data)
    return response.data
  }
}
```

## Module Organization

**Complete module with API integration**:

```
modules/[feature]/
├── index.ts                # Barrel exports (REQUIRED)
├── [feature]-store.ts      # Zustand store
├── [feature]-service.ts    # API calls
├── [feature]-types.ts      # Types
└── use-[feature].ts        # Custom hook
```

**Barrel export**:
```tsx
// modules/[feature]/index.ts
export { default as featureService } from "./[feature]-service"
export { useFeatureStore } from "./[feature]-store"
export { useFeature } from "./use-[feature]"
export type { FeatureState, DataItem } from "./[feature]-types"
```

## Key Rules

1. **Axios instance**: `shared/lib/axios.ts` (NOT `shared/api/`)
2. **API types**: Defined in `shared/lib/axios.ts`
3. **Service pattern**: Class with singleton export
4. **Store pattern**: Zustand with persist middleware
5. **Hook pattern**: Wrapper around store for computed values
6. **Import**: `from "~/shared/lib/axios"` (direct, no barrel)
7. **Env config**: `shared/config/environment.ts` (direct import)
