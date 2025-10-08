# Coding Standards

## TypeScript

### Type Definitions

**Use `interface` for object shapes**:
```tsx
interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
}
```

**Use `type` for unions and computed types**:
```tsx
type Status = "idle" | "loading" | "success" | "error"

type UserRole = "admin" | "user" | "guest"

type AuthAction =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "refresh"; payload: User }
```

### Type Organization

**Feature-specific types** in `{module}-types.ts`:
```tsx
// app/modules/auth/auth-types.ts
export interface User {
  id: string
  name: string
}

export interface AuthState {
  user: User | null
}
```

**Shared types** only if used by 2+ features:
```tsx
// app/shared/types/common.ts
export interface ApiResponse<T> {
  data: T
  message: string
}

export type AsyncState<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
}
```

### Type Imports

Always use `type` import for type-only imports:
```tsx
import type { User } from "~/modules/auth"
import type { VariantProps } from "tailwind-variants"
```

## Import Patterns

### Import Order

```tsx
// 1. React and external libraries
import { useState, useEffect } from "react"
import { tv, type VariantProps } from "tailwind-variants"

// 2. Module imports
import { useAuth } from "~/modules/auth"
import { useDashboard } from "~/modules/dashboard"

// 3. Shared imports
import { Button, TextField } from "~/shared/components/ui"
import { cx } from "~/shared/lib/primitive"

// 4. Type imports
import type { User } from "~/modules/auth"
import type { DashboardData } from "~/modules/dashboard"
```

### Barrel Exports

**Always create barrel exports** for modules:

```tsx
// app/modules/auth/index.ts
export * from "./auth-service"
export { useAuthStore } from "./auth-store"
export type {
  AuthCredentials,
  AuthResponse,
  AuthState,
  User,
} from "./auth-types"
export { useAuth } from "./use-auth"
```

**Import from barrel**:
```tsx
// ✅ Correct
import { useAuth, useAuthStore } from "~/modules/auth"
import type { User } from "~/modules/auth"

// ❌ Wrong
import { useAuth } from "~/modules/auth/use-auth"
import { useAuthStore } from "~/modules/auth/auth-store"
```

## State Management with Zustand

### Store Pattern

```tsx
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import authService from "./auth-service"
import type { AuthCredentials, User } from "./auth-types"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(credentials)
          const { user, token } = response.data
          localStorage.setItem("auth_token", token)
          set({ user, token, isLoading: false, error: null })
        } catch (error: any) {
          const errorMessage = error.message || "Login failed"
          set({ isLoading: false, error: errorMessage })
          throw error
        }
      },

      logout: async () => {
        await authService.logout()
        set({ user: null, token: null, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)
```

### Store Usage

```tsx
// Select specific values (recommended)
const user = useAuthStore((s) => s.user)
const login = useAuthStore((s) => s.login)

// Select multiple values
const { user, isLoading } = useAuthStore((s) => ({
  user: s.user,
  isLoading: s.isLoading
}))

// ❌ Avoid selecting entire store
const store = useAuthStore()  // Causes unnecessary re-renders
```

### Store File Naming

```
app/modules/auth/auth-store.ts
app/modules/user/user-store.ts
app/modules/dashboard/dashboard-store.ts
```

## Comments

### General Rules

- **English only**
- **Minimize comments** - Prefer self-documenting code
- Focus on "why" not "what"
- Remove commented-out code

### When to Comment

**Do comment**:
```tsx
// Workaround for React Router v7 SSR bug #1234
const [mounted, setMounted] = useState(false)

// TODO: Replace with native Intl.DateTimeFormat when Safari supports it
function formatDate(date: Date) {
  return dayjs(date).format("YYYY-MM-DD")
}
```

**Don't comment**:
```tsx
// ❌ Unnecessary - code is self-explanatory
// Set user to null
setUser(null)

// ❌ Obvious from code
// Loop through users
users.forEach(user => ...)

// ❌ Better as function name
// Check if user is admin
if (user.role === "admin") // Better: isAdmin(user)
```

### JSDoc for Public APIs

Use JSDoc only for exported functions/components with complex APIs:

```tsx
/**
 * Formats currency value with locale-specific formatting
 * @param value - The numeric value to format
 * @param currency - ISO 4217 currency code (default: "USD")
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}
```

## File Organization

### File Naming

```
kebab-case.tsx          # Components
use-feature.ts          # Hooks
feature-store.ts        # Stores
feature-types.ts        # Types
feature-service.ts      # Services
index.ts                # Barrel exports
```

### Component File Structure

```tsx
// 1. Imports
import { useState } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Button } from "~/shared/components/ui"

// 2. Types/Interfaces
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

## Function Naming

```tsx
// ✅ Correct - Verb-based, descriptive
function fetchUserData() { }
function validateEmail(email: string) { }
function formatCurrency(value: number) { }

// Hooks with 'use' prefix
function useAuth() { }
function useUserProfile() { }

// Event handlers with 'handle' prefix
function handleSubmit() { }
function handleInputChange() { }

// Boolean checks with 'is/has/should'
function isAuthenticated() { }
function hasPermission() { }
function shouldShowModal() { }

// ❌ Wrong - Unclear, not descriptive
function process() { }
function data() { }
function x() { }
```

## React Best Practices

### Functional Components Only

```tsx
// ✅ Correct
export function MyComponent({ title }: Props) {
  return <div>{title}</div>
}

// ❌ Wrong - No class components
export class MyComponent extends React.Component { }
```

### Hooks Rules

```tsx
// ✅ Correct - Top level, unconditional
function MyComponent() {
  const [state, setState] = useState(0)
  const data = useStore((s) => s.data)

  useEffect(() => {
    // effect
  }, [])

  return <div />
}

// ❌ Wrong - Conditional hooks
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0)  // ❌ Conditional
  }

  return <div />
}
```

### Event Handlers

```tsx
// ✅ Correct - Inline for simple handlers
<Button onPress={() => setCount(count + 1)}>Increment</Button>

// ✅ Correct - Named for complex handlers
function handleSubmit(e: FormEvent) {
  e.preventDefault()
  // complex logic
}
<Form onSubmit={handleSubmit} />

// ✅ Correct - useCallback for child component props
const handleClick = useCallback(() => {
  // logic
}, [deps])
<ChildComponent onClick={handleClick} />
```

## Code Quality Checklist

Before committing code:

- [ ] No hardcoded values (use constants/config)
- [ ] No commented-out code
- [ ] Imports are organized (React → Modules → Shared → Types)
- [ ] Types use `interface` for objects, `type` for unions
- [ ] Functions have descriptive, verb-based names
- [ ] Components use functional style only
- [ ] Hooks follow rules (top-level, unconditional)
- [ ] Comments explain "why" not "what"
- [ ] File names follow conventions
- [ ] Barrel exports exist for modules
