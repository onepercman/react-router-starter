# Coding Standards

## TypeScript

### Type Definitions

**Use `interface` for object shapes**:
```tsx
interface DataItem {
  id: string
  name: string
  email: string
}

interface FeatureState {
  data: DataItem | null
  isReady: boolean
  action: (email: string, password: string) => Promise<void>
}
```

**Use `type` for unions and computed types**:
```tsx
type Status = "idle" | "loading" | "success" | "error"

type Role = "admin" | "user" | "guest"

type Action =
  | { type: "update"; payload: DataItem }
  | { type: "delete"; payload: string }
  | { type: "reset" }
```

### Type Organization

**Feature-specific types** in `[feature]-types.ts`:
```tsx
// app/modules/[feature]/[feature]-types.ts
export interface DataItem {
  id: string
  name: string
}

export interface FeatureState {
  data: DataItem | null
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
import type { DataItem } from "~/modules/[feature]"
import type { VariantProps } from "tailwind-variants"
```

## Import Patterns

### Import Order

```tsx
// 1. React and external libraries
import { useState, useEffect } from "react"
import { tv, type VariantProps } from "tailwind-variants"

// 2. Module imports
import { useFeature } from "~/modules/[feature]"
import { useOtherFeature } from "~/modules/[other-feature]"

// 3. Shared imports
import { Button, TextField } from "~/shared/components/ui"
import { cn } from "~/shared/utils"

// 4. Type imports
import type { DataItem } from "~/modules/[feature]"
import type { OtherData } from "~/modules/[other-feature]"
```

### Barrel Exports

**Always create barrel exports** for each module:

```tsx
// app/modules/[feature]/index.ts
export * from "./[feature]-service"
export { useFeatureStore } from "./[feature]-store"
export type {
  FeatureState,
  DataItem,
} from "./[feature]-types"
export { useFeature } from "./use-[feature]"
```

**Import from barrel**:
```tsx
// ✅ Correct
import { useFeature, useFeatureStore } from "~/modules/[feature]"
import type { DataItem } from "~/modules/[feature]"

// ❌ Wrong
import { useFeature } from "~/modules/[feature]/use-[feature]"
import { useFeatureStore } from "~/modules/[feature]/[feature]-store"
import { something } from "~/modules"  // NO modules/index.ts exists
```

## State Management with Zustand

### Store Pattern

```tsx
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import featureService from "./[feature]-service"
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
          const response = await featureService.action(params)
          const { data, token } = response.data
          localStorage.setItem("token", token)
          set({ data, token, isLoading: false, error: null })
        } catch (error: any) {
          const errorMessage = error.message || "Action failed"
          set({ isLoading: false, error: errorMessage })
          throw error
        }
      },

      reset: async () => {
        await featureService.cleanup()
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
// Select specific values (recommended)
const data = useFeatureStore((s) => s.data)
const action = useFeatureStore((s) => s.action)

// Select multiple values
const { data, isLoading } = useFeatureStore((s) => ({
  data: s.data,
  isLoading: s.isLoading
}))

// ❌ Avoid selecting entire store
const store = useFeatureStore()  // Causes unnecessary re-renders
```

### Store File Naming

```
app/modules/[feature]/[feature]-store.ts
```

## Comments

**Rules**:
- English only
- Minimize - prefer self-documenting code
- Explain "why" not "what"
- Remove commented-out code

**When to comment**:
- Complex logic not clear from code
- Workarounds for bugs/browser issues
- Context that cannot be expressed in code
- TODOs with clear actionable items

**Examples**:
```tsx
// ✅ Good - explains why
// Workaround for SSR hydration mismatch
const [mounted, setMounted] = useState(false)

// ❌ Bad - obvious from code
// Set user to null
setUser(null)
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

## Naming Conventions

**Functions**:
```tsx
// ✅ Verb-based, descriptive
function fetchData() { }
function validateInput(value: string) { }

// Hooks: 'use' prefix
function useFeature() { }

// Event handlers: 'handle' prefix
function handleSubmit() { }

// Boolean: 'is/has/should'
function isValid() { }
function hasPermission() { }
```

## React Patterns

**Functional components only** (no class components)

**Hooks rules**:
- Top level only
- Never conditional
- Always in same order

**Event handlers**:
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

**ALWAYS use `cn()` utility** (never template strings)

```tsx
import { cn } from "~/shared/utils"

// ✅ Correct
<div className={cn("flex items-center", className)} />
<div className={cn("px-4", isActive && "bg-primary")} />
<div className={cn("text-base", { "font-bold": isImportant })} />

// ❌ Wrong
<div className={`flex items-center ${className}`} />
```

**Usage**:
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

## Checklist

Before committing:

- [ ] No hardcoded values
- [ ] No commented-out code
- [ ] Imports organized (React → Modules → Shared → Types)
- [ ] Types: `interface` for objects, `type` for unions
- [ ] Functions: verb-based names
- [ ] Components: functional style only
- [ ] Hooks: top-level, unconditional
- [ ] Comments: explain "why" not "what"
- [ ] Files: `kebab-case`
- [ ] Modules: have `index.ts` barrel exports
