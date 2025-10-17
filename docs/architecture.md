# Architecture

3-layer system: Routes → Modules → Shared

## Directory Structure

```
app/
├── routes/              # Page composition (flat file-based routing)
│   ├── _index.tsx       # / (root)
│   ├── about.tsx        # /about
│   ├── products._index.tsx   # /products
│   ├── products.$id.tsx      # /products/:id
│   ├── auth.tsx              # Layout for /auth/*
│   └── auth.login.tsx        # /auth/login
│
├── modules/             # Feature modules (NO root index.ts)
│   └── [feature]/
│       ├── index.ts             # Barrel exports (REQUIRED)
│       ├── [feature]-store.ts   # Zustand store (optional)
│       ├── [feature]-service.ts # API/business logic (optional)
│       ├── [feature]-types.ts   # Type definitions
│       └── use-[feature].ts     # Custom hooks (optional)
│
└── shared/              # Global utilities & UI
    ├── components/ui/   # IntentUI (has index.tsx)
    ├── components/      # Shared components (NO index)
    ├── config/          # Environment (NO index)
    ├── hooks/           # Shared hooks (NO index)
    ├── layouts/         # Layouts (NO index)
    ├── lib/             # axios, primitives (NO index)
    ├── providers/       # Context providers (NO index)
    ├── stores/          # Global stores (has index.ts)
    ├── styles/          # Design tokens (NO index)
    ├── types/           # Shared types (has index.ts)
    └── utils/           # Utilities (has index.ts)
```

## Layer Responsibilities

### Routes (`app/routes/`)

**Purpose**: Page composition only

**File-based routing** (React Router v7 with `flatRoutes`):
- Flat file structure with dot notation
- `_index.tsx` → `/`
- `about.tsx` → `/about`
- `products._index.tsx` → `/products`
- `products.$id.tsx` → `/products/:id` (dynamic)
- `auth.tsx` → Layout for `/auth/*` (contains `<Outlet />`)
- `auth.login.tsx` → `/auth/login`

**Do**:
- Import and compose from modules
- Export default page components
- Handle page-level data loading
- Define meta/headers

**Don't**:
- Include business logic
- Define complex components
- Manage state beyond page-level
- Use nested folders (won't work!)

**Example**:
```tsx
// app/routes/dashboard._index.tsx
import { DashboardView } from "~/modules/dashboard"
import { useAuth } from "~/modules/auth"

export default function Dashboard() {
  const { user } = useAuth()
  return <DashboardView user={user} />
}
```

**Layout Example**:
```tsx
// app/routes/auth.tsx
import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
```

### Modules (`app/modules/`)

**Purpose**: Feature-based business logic

**Do**:
- Organize by domain (auth, products, etc.)
- **ALWAYS have index.ts** for barrel exports
- Keep feature logic encapsulated
- Be reusable across routes

**Don't**:
- Access other modules' internals directly
- Mix unrelated features
- Create root `modules/index.ts`

**Structure**:
```
modules/[feature]/
├── index.ts                # Barrel exports (REQUIRED)
├── [feature]-store.ts      # Zustand (optional)
├── [feature]-service.ts    # API (optional)
├── [feature]-types.ts      # Types
└── use-[feature].ts        # Hooks (optional)
```

**Barrel Export Example**:
```tsx
// modules/[feature]/index.ts
export * from "./[feature]-service"
export { use[Feature]Store } from "./[feature]-store"
export type { [Feature]State } from "./[feature]-types"
export { use[Feature] } from "./use-[feature]"
```

**Key Rules**:
- Every module MUST have `index.ts`
- NO `modules/index.ts` at root
- Import: `from "~/modules/[feature]"` (not `from "~/modules"`)

### Shared (`app/shared/`)

**Purpose**: Global utilities and UI components

**Barrel exports**:
- `components/ui/` - IntentUI (has `index.tsx`)
- `stores/` - Global stores (has `index.ts`)
- `types/` - Shared types (has `index.ts`)
- `utils/` - Utilities (has `index.ts`)
- All others: NO index

**Import Examples**:
```tsx
// ✅ With barrel
import { Button } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import type { ApiResponse } from "~/shared/types"

// ✅ Direct (no barrel)
import { axios } from "~/shared/lib/axios"
import { env } from "~/shared/config/environment"
import { ThemeProvider } from "~/shared/providers/theme-provider"
```

**Don't**:
- Include feature-specific logic
- Import from modules
- Create barrel exports where marked "NO index"

## Import Flow

```
Routes → Modules → Shared
```

**Rules**:
- Routes can import modules + shared
- Modules can import other modules + shared
- Shared is self-contained (no module imports)
- Never import routes into modules/shared

**Examples**:
```tsx
// ✅ Correct
// In routes
import { FeatureView } from "~/modules/[feature]"
import { Button } from "~/shared/components/ui"

// In modules
import { useOtherFeatureStore } from "~/modules/[other-feature]"
import { Card } from "~/shared/components/ui"

// In shared
import { Button } from "~/shared/components/ui"
import { cn } from "~/shared/utils"

// ❌ Wrong
// In shared
import { useFeature } from "~/modules/[feature]"  // Shared → module

// In any file
import { something } from "~/modules"  // NO modules/index.ts
```

## File Naming

**Folders**: `kebab-case`

**Files**:
- Components: `kebab-case.tsx` (e.g., `login-form.tsx`)
- Hooks: `use-[feature].ts` (e.g., `use-auth.ts`)
- Stores: `[feature]-store.ts` (e.g., `user-store.ts`)
- Types: `[feature]-types.ts` (e.g., `user-types.ts`)
- Services: `[feature]-service.ts` (e.g., `api-service.ts`)
- Barrel: `index.ts`

**Names**:
- Components: `PascalCase`
- Functions: `camelCase`
- Hooks: `use` prefix

## Module Creation Checklist

1. Create directory: `app/modules/[feature]/`
2. **REQUIRED**: Add `index.ts` for barrel exports
3. Add files as needed:
   - `[feature]-types.ts` (recommended)
   - `[feature]-store.ts` (optional)
   - `[feature]-service.ts` (optional)
   - `use-[feature].ts` (optional)
4. Export public API through `index.ts`
5. Keep internals private

## Migration Pattern

When route grows too large:

1. Identify reusable logic
2. Create module in `app/modules/`
3. Move logic to module
4. Export through `index.ts`
5. Update route to import from module
6. Keep route thin
