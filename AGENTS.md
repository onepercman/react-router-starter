# React Project Conventions

## Package Manager

ALWAYS `pnpm` - Never npm, yarn, bun

## TypeScript

Always: `import type { ... }` for type imports
`interface` for objects, `type` for unions/primitives

## Architecture

3-layer: Entry → Modules → Shared

Each module MUST have `index.ts` barrel export
NEVER create root `modules/index.ts`
Import: `from "~/modules/[feature]"` ✓ NOT `from "~/modules"` ✗

Shared organization:
- **With barrel (`index.ts`):** types, utils, stores, components/ui
- **Direct import (NO barrel):** config, lib, hooks, layouts, providers

## File Naming

Files: `kebab-case`
Hooks: `use-[feature].ts`
Stores: `[feature]-store.ts`
Services: `[feature]-service.ts`
Types: `[feature]-types.ts`
Components: `[feature]-components.tsx`

## SSR Safety

Browser APIs: `typeof window !== "undefined"` check
Hydration: `useState` + `useEffect` pattern for browser-only state

## Styling

ALWAYS use tokens - NEVER hardcode colors
Tokens: `bg`, `fg`, `primary`, `secondary`, `success`, `danger`, `muted`, `border`
Secondary text: `text-muted-fg` NOT `text-secondary`
Pair bg/fg: `bg-primary text-primary-fg`

className for LAYOUT ONLY (`w-*`, `h-*`, `m-*`, `p-*`, `flex`, `grid`, `gap-*`)
Design via props: `intent="primary"`, `size="lg"`
NEVER: `className="bg-blue-500 px-8"`

**ALWAYS use `cn()`:** `import { cn } from "~/shared/utils"`
Never template literals for className

## Components

Check exists FIRST: `ls shared/components/ui/[name].tsx`
If missing: `pnpm dlx shadcn@latest add @[registry]/[name]`
Never re-add existing components

Feature components: `modules/[feature]/components/`
Shared components: `shared/components/` (reused 2+ times)

## Forms

Default: Uncontrolled with `name` attributes
Extract: `new FormData(e.currentTarget)`
Controlled only for: complex validation, store sync, dependent fields

## Routing

Keep routes thin - delegate to modules
Flat files with dots: `products._index.tsx` → `/products`
Dynamic: `products.$id.tsx` → `/products/:id`
Layout: `auth.tsx` + `<Outlet />` wraps `auth.login.tsx`

## State Management

**Zustand:** 
- Select fields: `useStore((s) => s.data)` ✓ NOT `useStore()` ✗
- Error handling: `error: string | null` in state
- Actions: try-catch with error messages
- Include `clearError` action

**React Query:** 
- `queryClient.invalidateQueries()` after mutations (CRITICAL)
- Wrap in custom hooks: `use[Feature]Data`

**Service Layer:**
- Pattern: Class with singleton export
- Location: `modules/[feature]/[feature]-service.ts`

## API/Config

Axios: `shared/lib/axios.ts` (NOT `shared/api/`)
API types: Define in same axios file
Environment: `shared/config/environment.ts`
Direct imports: `import { axiosInstance } from "~/shared/lib/axios"`
