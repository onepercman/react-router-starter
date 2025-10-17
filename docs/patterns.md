# Code Patterns

TypeScript, imports, API design, stores, and service layer patterns.

## TypeScript

### Type Definitions

**`interface` for objects:**
```tsx
interface User {
  id: string
  name: string
}

interface FeatureState {
  user: User | null
  isLoading: boolean
  action: (id: string) => Promise<void>
}
```

**`type` for unions:**
```tsx
type Status = "idle" | "loading" | "success" | "error"
type Role = "admin" | "user"

type Action =
  | { type: "update"; payload: User }
  | { type: "delete"; payload: string }
```

### Type Organization

```tsx
// modules/[feature]/[feature]-types.ts - Feature-specific
export interface DataItem { id: string; name: string }
export interface FeatureState { data: DataItem | null }

// shared/types/common.ts - Shared (2+ features)
export interface ApiResponse<T> { data: T; message?: string }
export type AsyncState<T> = { data: T | null; isLoading: boolean; error: string | null }
```

### Type Imports

```tsx
import type { User } from "~/modules/auth"
import type { VariantProps } from "tailwind-variants"
```

## Import Patterns

### Import Order

```tsx
// 1. React & external
import { useState, useEffect } from "react"
import { tv, type VariantProps } from "tailwind-variants"

// 2. Modules
import { useAuth } from "~/modules/auth"

// 3. Shared
import { Button } from "~/shared/components/ui"
import { cn } from "~/shared/utils"

// 4. Types
import type { User } from "~/modules/auth"
```

### Barrel Exports

**Create for each module:**
```tsx
// modules/[feature]/index.ts
export * from "./[feature]-service"
export { use[Feature]Store } from "./[feature]-store"
export type { FeatureState, DataItem } from "./[feature]-types"
```

**Import from barrel:**
```tsx
// ✅ Correct
import { useAuth, useAuthStore } from "~/modules/auth"
import type { User } from "~/modules/auth"

// ❌ Wrong
import { useAuth } from "~/modules/auth/use-auth"
import { something } from "~/modules"  // NO modules/index.ts
```

## API Design

### Axios Setup

**Location**: `shared/lib/axios.ts`

```tsx
// shared/lib/axios.ts
import axios from "axios"

// API types (defined here)
export interface ApiResponse<T = any> {
  data: T
  message?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: { page: number; total: number }
}

export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
})

// Request interceptor - Add token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor - Handle errors
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

### Service Layer

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

// ❌ Avoid entire store (causes re-renders)
const store = useFeatureStore()
```

## React Query Pattern

### Query Hook

```tsx
// modules/[feature]/use-[feature]-data.ts
import { useQuery } from "@tanstack/react-query"
import service from "./[feature]-service"

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

### Provider Setup

```tsx
// shared/providers/query-provider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
    },
  },
})

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

## Custom Hook Pattern

```tsx
// modules/[feature]/use-[feature].ts
import { useFeatureStore } from "./[feature]-store"

export function useFeature() {
  const data = useFeatureStore((s) => s.data)
  const isLoading = useFeatureStore((s) => s.isLoading)
  const error = useFeatureStore((s) => s.error)
  const action = useFeatureStore((s) => s.action)
  const reset = useFeatureStore((s) => s.reset)

  const isReady = !!data

  return {
    data,
    isReady,
    isLoading,
    error,
    action,
    reset,
  }
}
```

## Naming Conventions

```tsx
// Functions: verb-based
function fetchData() { }
function validateInput(value: string) { }

// Hooks: 'use' prefix
function useAuth() { }

// Handlers: 'handle' prefix
function handleSubmit() { }

// Booleans: 'is/has/should'
function isValid() { }
function hasPermission() { }
```

## React Patterns

**Functional components only** (no classes)

**Event handlers:**
```tsx
// Inline for simple
<Button onPress={() => action()}>Click</Button>

// Named for complex
function handleSubmit(e: FormEvent) {
  e.preventDefault()
  // logic
}
<Form onSubmit={handleSubmit} />

// useCallback for child props
const handleClick = useCallback(() => {}, [deps])
<Child onClick={handleClick} />
```

## ClassName Management

**ALWAYS use `cn()` utility:**

```tsx
import { cn } from "~/shared/utils"

// ✅ Correct
<div className={cn("flex items-center", className)} />
<div className={cn("px-4", isActive && "bg-primary")} />
<div className={cn("text-base", { "font-bold": isImportant })} />

// ❌ Wrong
<div className={`flex items-center ${className}`} />
```

**Usage patterns:**
```tsx
// String concat
cn("base", "extra")

// Conditional
cn("flex", isActive && "bg-primary")

// Object syntax
cn("flex", { "bg-primary": isActive })

// Component pattern
export function Component({ className, isActive }: Props) {
  return (
    <div className={cn("flex px-4", isActive && "bg-primary", className)}>
      Content
    </div>
  )
}
```

## File Organization

### File Naming

```
kebab-case.tsx          # Components
use-[feature].ts        # Hooks
[feature]-store.ts      # Stores
[feature]-types.ts      # Types
[feature]-service.ts    # Services
index.ts                # Barrel exports
```

### Component File Structure

```tsx
// 1. Imports
import { useState } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Button } from "~/shared/components/ui"

// 2. Types
interface Props extends VariantProps<typeof variants> {
  title: string
  onSubmit: () => void
}

// 3. Variants/Constants
const variants = tv({
  base: "...",
  variants: { ... },
})

// 4. Component
export function MyComponent({ title, onSubmit, ...props }: Props) {
  const [state, setState] = useState(false)

  return (
    <div className={variants(props)}>
      <h1>{title}</h1>
      <Button onPress={onSubmit}>Submit</Button>
    </div>
  )
}
```

## Environment Configuration

**Location**: `shared/config/environment.ts`

```tsx
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue
  if (!value) throw new Error(`Missing: ${key}`)
  return value
}

export const env = {
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL", "http://localhost:3000/api"),
  APP_NAME: getEnvVar("VITE_APP_NAME", "App"),
  NODE_ENV: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const
```

**Import directly:**
```tsx
import { env } from "~/shared/config/environment"
```

## Module Organization

**Complete module:**
```
modules/[feature]/
├── index.ts                # Barrel exports (REQUIRED)
├── [feature]-store.ts      # Zustand store
├── [feature]-service.ts    # API calls
├── [feature]-types.ts      # Types
└── use-[feature].ts        # Custom hook
```

**Barrel export:**
```tsx
// modules/[feature]/index.ts
export { default as featureService } from "./[feature]-service"
export { useFeatureStore } from "./[feature]-store"
export { useFeature } from "./use-[feature]"
export type { FeatureState, DataItem } from "./[feature]-types"
```

## Comments

**Rules:**
- English only
- Minimize - prefer self-documenting code
- Explain "why" not "what"
- Remove commented-out code

**When to comment:**
- Complex logic unclear from code
- Workarounds for bugs
- TODOs with actionable items

```tsx
// ✅ Good - explains why
// Workaround for SSR hydration mismatch
const [mounted, setMounted] = useState(false)

// ❌ Bad - obvious
// Set user to null
setUser(null)
```

## Key Rules

1. **Axios**: `shared/lib/axios.ts` (NOT `shared/api/`)
2. **API types**: Defined in `shared/lib/axios.ts`
3. **Service**: Class with singleton export
4. **Store**: Zustand with persist middleware
5. **Hook**: Wrapper around store
6. **Types**: `interface` for objects, `type` for unions
7. **Imports**: Organized (React → Modules → Shared → Types)
8. **ClassName**: Always use `cn()` utility
9. **Files**: `kebab-case` naming
10. **Modules**: Each has `index.ts` barrel
