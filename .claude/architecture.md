# Architecture

> **Template Structure** - This is a starter template. Directory structure will evolve based on your features.

## Directory Structure

```
app/
├── routes/              # Page composition layer
│   ├── _index.tsx       # Route files
│   └── [feature]/       # Feature routes
│
├── modules/             # Feature-based business logic
│   ├── [feature]/
│   │   ├── index.ts             # Barrel exports
│   │   ├── [feature]-components.tsx  # Components (flat structure)
│   │   ├── [feature]-store.ts   # Zustand state (optional)
│   │   ├── [feature]-types.ts   # Type definitions
│   │   ├── [feature]-service.ts # API/business logic (optional)
│   │   └── use-[feature].ts     # Custom hooks (optional)
│   └── index.ts         # Central module exports
│
└── shared/              # Global utilities and components
    ├── api/             # Base API client
    ├── components/
    │   ├── ui/          # IntentUI design system
    │   └── *.tsx        # Shared components
    ├── layouts/         # App layouts
    ├── providers/       # Context providers
    ├── config/          # Environment config
    ├── constants/       # Global constants
    ├── hooks/           # Shared hooks
    ├── lib/             # Utility functions
    ├── stores/          # Global stores
    ├── styles/          # Design tokens
    ├── types/           # Shared types
    └── utils/           # Helper functions
```

## Layer Responsibilities

### Routes (`app/routes/`)
**Purpose**: Page composition only

**Should**:
- Import and compose functionality from modules
- Export default page components
- Handle page-level data loading
- Define meta and headers

**Should NOT**:
- Contain business logic
- Define complex components
- Manage state beyond page-level
- Include API calls (delegate to modules)

**Example**:
```tsx
// app/routes/dashboard.tsx
import { DashboardView } from "~/modules/dashboard"
import { useAuth } from "~/modules/auth"

export default function Dashboard() {
  const { user } = useAuth()
  return <DashboardView user={user} />
}
```

### Modules (`app/modules/`)
**Purpose**: Feature-based business logic and components

**Should**:
- Organize by feature/domain (auth, dashboard, products, etc.)
- Contain stores, hooks, services, components for that feature
- Export via barrel exports (index.ts)
- Be reusable across multiple routes
- Encapsulate feature-specific logic

**Should NOT**:
- Directly access other modules' internals (use exports only)
- Contain route-specific code
- Mix multiple unrelated features

**Module Structure Options**:

*Flat (recommended for simple features)*
```
modules/feature/
├── index.ts                    # Barrel exports
├── feature-components.tsx      # All components
├── feature-types.ts            # Types
└── feature-store.ts            # Store (optional)
```

*Nested (for complex features)*
```
modules/feature/
├── components/
├── hooks/
├── index.ts
└── feature-types.ts
```

**Example Barrel Export**:
```tsx
// modules/auth/index.ts
export * from "./auth-service"
export { useAuthStore } from "./auth-store"
export type { User, AuthState } from "./auth-types"
export { useAuth } from "./use-auth"
```

### Shared (`app/shared/`)
**Purpose**: Global utilities and UI components

**Should**:
- `components/ui/` - IntentUI design system components
- `components/` - Custom shared components used by 2+ features
- `lib/` - Utility functions (cx, formatters, etc.)
- `styles/` - Design system tokens and global styles
- `types/` - Types shared across 2+ features

**Should NOT**:
- Contain feature-specific logic
- Have deep nesting (keep flat)
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
// In app/routes/dashboard.tsx
import { DashboardView } from "~/modules/dashboard"
import { Button } from "~/shared/components/ui"

// In app/modules/dashboard/components/dashboard-view.tsx
import { useAuthStore } from "~/modules/auth"
import { Card } from "~/shared/components/ui"

// In app/shared/components/custom-header.tsx
import { Button } from "~/shared/components/ui"
import { cx } from "~/shared/lib/primitive"

// ❌ Wrong
// In app/shared/components/something.tsx
import { useAuth } from "~/modules/auth"  // Shared importing module

// In app/modules/auth/index.ts
import { Dashboard } from "~/routes/dashboard"  // Module importing route
```

## File Naming Conventions

### Folders
- Always `kebab-case`
- Feature-based names (auth, user-profile, order-management)

### Files
- Component files: `kebab-case.tsx` (e.g., `login-form.tsx`)
- Hook files: `use-feature.ts` (e.g., `use-auth.ts`)
- Store files: `feature-store.ts` (e.g., `auth-store.ts`)
- Type files: `feature-types.ts` (e.g., `auth-types.ts`)
- Service files: `feature-service.ts` (e.g., `auth-service.ts`)
- Utility files: `kebab-case.ts` (e.g., `format-date.ts`)

### Component Names
- Always `PascalCase`
- Descriptive names (LoginForm, UserProfileCard, OrderList)

### Function Names
- Always `camelCase`
- Verb-based for actions (fetchUser, validateEmail, formatCurrency)
- `use` prefix for hooks (useAuth, useUserProfile)

## Module Creation Checklist

When creating a new module:

1. Create feature directory: `app/modules/[feature-name]/`
2. Add `index.ts` for barrel exports
3. Create subdirectories as needed:
   - `components/` - Feature-specific components
   - `hooks/` - Custom hooks
   - Optional: `[feature]-store.ts`, `[feature]-types.ts`, `[feature]-service.ts`
4. Export public API through `index.ts`
5. Keep internal implementation private

## Migration from Routes to Modules

When a route file grows too large:

1. Identify reusable business logic
2. Create appropriate module in `app/modules/`
3. Move logic to module
4. Export public API
5. Update route to import from module
6. Keep route as thin composition layer
