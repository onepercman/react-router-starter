# Architecture

## Directory Structure

```
app/
├── routes/              # Page composition layer (flat file structure)
│   ├── _index.tsx       # / (root)
│   ├── about.tsx        # /about
│   ├── products._index.tsx   # /products
│   ├── products.$id.tsx      # /products/:id
│   ├── auth.tsx              # Layout for /auth/*
│   └── auth.login.tsx        # /auth/login
│
├── modules/             # Feature-based business logic (NO index.ts at root)
│   └── [feature]/
│       ├── index.ts             # Barrel exports (REQUIRED for each module)
│       ├── [feature]-store.ts   # Zustand state (optional)
│       ├── [feature]-service.ts # API/business logic (optional)
│       ├── [feature]-types.ts   # Type definitions
│       ├── [feature]-components.tsx  # Components (optional)
│       └── use-[feature].ts     # Custom hooks (optional)
│
└── shared/              # Global utilities and components
    ├── components/
    │   ├── ui/          # IntentUI design system (has index.tsx)
    │   └── *.tsx        # Shared components (no index)
    ├── config/          # Environment config (no index)
    ├── constants/       # Global constants (no index)
    ├── hooks/           # Shared hooks (no index)
    ├── layouts/         # App layouts (no index)
    ├── lib/             # Core libraries: axios, primitives (no index)
    ├── providers/       # Context providers (no index)
    ├── stores/          # Global stores (has index.ts)
    ├── styles/          # Design tokens (no index)
    ├── types/           # Shared types (has index.ts)
    └── utils/           # Utility functions: cn, formatters (has index.ts)
```

## Layer Responsibilities

### Routes (`app/routes/`)
**Purpose**: Page composition only (React Router v7 with `flatRoutes`)

**Routing Conventions**:
- Uses **flat file structure** with dot delimiters for nested routes
- `_index.tsx` → `/` (root index)
- `about.tsx` → `/about` (static route)
- `products._index.tsx` → `/products` (nested index)
- `products.$id.tsx` → `/products/:id` (dynamic segment)
- `auth.tsx` → Layout for all `/auth/*` routes (contains `<Outlet />`)
- `auth.login.tsx` → `/auth/login` (child route)

**File-based routing powered by**:
```tsx
// app/routes.ts
import { type RouteConfig } from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"
export default flatRoutes() satisfies RouteConfig
```

**Should**:
- Import and compose functionality from modules
- Export default page components
- Handle page-level data loading
- Define meta and headers
- Use flat file structure with dots (`.`) for nested paths
- Use `$param` prefix for dynamic segments

**Should NOT**:
- Contain business logic
- Define complex components
- Manage state beyond page-level
- Include API calls (delegate to modules)
- Use nested folders like `auth/login/index.tsx` (won't work!)

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
// app/routes/auth.tsx - Layout for all /auth/* routes
import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
```

### Modules (`app/modules/`)
**Purpose**: Feature-based business logic and components

**Should**:
- Organize by feature/domain (auth, dashboard, products, etc.)
- Contain stores, hooks, services, components for that feature
- **ALWAYS have index.ts for barrel exports**
- Be reusable across multiple routes
- Encapsulate feature-specific logic

**Should NOT**:
- Directly access other modules' internals (use exports only)
- Contain route-specific code
- Mix multiple unrelated features

**Module Structure (Flat - Recommended)**:
```
modules/feature/
├── index.ts                    # Barrel exports (REQUIRED)
├── feature-store.ts            # Zustand store (optional)
├── feature-service.ts          # API calls (optional)
├── feature-types.ts            # Type definitions
├── feature-components.tsx      # Components (optional)
└── use-feature.ts              # Custom hooks (optional)
```

**Example Barrel Export** (Required for every module):
```tsx
// modules/[feature]/index.ts
export * from "./[feature]-service"
export { use[Feature]Store } from "./[feature]-store"
export type { [Feature]State } from "./[feature]-types"
export { use[Feature] } from "./use-[feature]"
```

**Key Rules**:
- Every module MUST have `index.ts` for barrel exports
- NO `modules/index.ts` at root level
- Import pattern: `from "~/modules/[feature]"` (not `from "~/modules"`)

### Shared (`app/shared/`)
**Purpose**: Global utilities and UI components

**Structure and barrel exports**:
- `components/ui/` - IntentUI design system (has `index.tsx`)
- `components/` - Shared components used by 2+ features (NO index)
- `config/` - Environment configuration (NO index)
- `constants/` - Global constants (NO index)
- `hooks/` - Shared hooks (NO index)
- `layouts/` - App layouts (NO index)
- `lib/` - Core libraries: axios instance, primitives (NO index)
- `providers/` - Context providers: Query, Theme (NO index)
- `stores/` - Global stores (has `index.ts`)
- `styles/` - Design system tokens and global CSS (NO index)
- `types/` - Shared types (has `index.ts`)
- `utils/` - Utility functions: cn, formatters (has `index.ts`)

**Import patterns**:
```tsx
// ✅ With barrel exports
import { Button } from "~/shared/components/ui"
import { cn } from "~/shared/utils"
import type { ApiResponse } from "~/shared/types"

// ✅ Direct imports (no barrel export)
import { axios } from "~/shared/lib/axios"
import { env } from "~/shared/config/environment"
import { ThemeProvider } from "~/shared/providers/theme-provider"
import { PageHeader } from "~/shared/components/page-header"
```

**Should NOT**:
- Contain feature-specific logic
- Create barrel exports for directories marked "NO index"
- Include one-off utilities (keep in feature module)

## Import Flow

```
Routes → Modules → Shared
```

**Rules**:
- Routes can import from modules and shared
- Modules can import from other modules and shared
- Shared should be self-contained (no module imports)
- Never import routes into modules or shared

**Examples**:
```tsx
// ✅ Correct
// In app/routes/[page].tsx
import { FeatureView } from "~/modules/[feature]"
import { Button } from "~/shared/components/ui"

// In app/modules/[feature]/[feature]-components.tsx
import { useOtherFeatureStore } from "~/modules/[other-feature]"
import { Card } from "~/shared/components/ui"

// In app/shared/components/custom-component.tsx
import { Button } from "~/shared/components/ui"
import { cn } from "~/shared/utils"

// ❌ Wrong
// In app/shared/components/something.tsx
import { useFeature } from "~/modules/[feature]"  // Shared importing module

// In app/modules/[feature]/index.ts
import { Page } from "~/routes/page"  // Module importing route

// In any file
import { something } from "~/modules"  // NO modules/index.ts exists
```

## File Naming Conventions

### Folders
- Always `kebab-case`
- Feature-based names (e.g., `user-profile`, `order-management`)

### Files
- Component files: `kebab-case.tsx` (e.g., `login-form.tsx`)
- Hook files: `use-[feature].ts` (e.g., `use-local-storage.ts`)
- Store files: `[feature]-store.ts` (e.g., `user-store.ts`)
- Type files: `[feature]-types.ts` (e.g., `user-types.ts`)
- Service files: `[feature]-service.ts` (e.g., `api-service.ts`)
- Utility files: `kebab-case.ts` (e.g., `format-date.ts`)

### Component Names
- Always `PascalCase`
- Descriptive names (e.g., `UserProfileCard`, `OrderList`)

### Function Names
- Always `camelCase`
- Verb-based for actions (e.g., `fetchData`, `validateEmail`, `formatCurrency`)
- `use` prefix for hooks (e.g., `useLocalStorage`, `useUserProfile`)

## Module Creation Checklist

When creating a new module:

1. Create feature directory: `app/modules/[feature-name]/`
2. **REQUIRED**: Add `index.ts` for barrel exports
3. Create files as needed:
   - `[feature]-types.ts` - Type definitions (recommended)
   - `[feature]-store.ts` - Zustand store (optional)
   - `[feature]-service.ts` - API calls (optional)
   - `[feature]-components.tsx` - Components (optional)
   - `use-[feature].ts` - Custom hooks (optional)
4. Export public API through `index.ts`
5. Keep internal implementation private

**Example**:
```bash
# Creating new module
mkdir app/modules/[feature-name]
touch app/modules/[feature-name]/index.ts
touch app/modules/[feature-name]/[feature-name]-types.ts
touch app/modules/[feature-name]/[feature-name]-store.ts
touch app/modules/[feature-name]/[feature-name]-service.ts
```

## Migration from Routes to Modules

When a route file grows too large:

1. Identify reusable business logic
2. Create appropriate module in `app/modules/`
3. Move logic to module
4. Export public API
5. Update route to import from module
6. Keep route as thin composition layer
