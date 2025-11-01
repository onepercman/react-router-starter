# React Project Conventions

## Quick Reference (Critical Rules)
- **Package Manager:** ALWAYS `pnpm`
- **Type Imports:** `import type { ... }`
- **Barrel Exports:** Every folder has `index.ts` EXCEPT `modules/index.ts`
- **Styling:** ALWAYS `cn()` + tokens only, NEVER hardcode colors
- **State:** Select fields `useStore(s => s.field)` NOT `useStore()`
- **Imports:** `~/modules/[feature]` ✓ NOT `~/modules` ✗

## Package Manager
ALWAYS `pnpm` - Never npm, yarn, bun

## TypeScript
Always: `import type { ... }` for type imports
`interface` for objects, `type` for unions/primitives

## Architecture
```
app/                    # Entry (routes only)
modules/                # Features (NO index.ts here)
  ├─ user/
  │  └─ index.ts ✓      # Barrel export
  └─ auth/
     └─ index.ts ✓
shared/                 # Cross-feature code
  ├─ components/
  │  ├─ ui/
  │  │  └─ index.ts ✓
  │  └─ index.ts ✓
  ├─ utils/index.ts ✓
  └─ stores/index.ts ✓
```

**Barrel export rules:**
- Every feature/folder has `index.ts` ✓
- EXCEPT `modules/index.ts` NEVER exists ✗
- Import: `~/modules/[feature]` ✓ NOT `~/modules` ✗

## File Naming
Files: `kebab-case`
Hooks: `use-[feature].ts`
Stores: `[feature]-store.ts`
Services: `[feature]-service.ts`
Types: `[feature]-types.ts`
Components: `[feature]-components.tsx`

## Components
Check exists FIRST: `ls shared/components/ui/[name].tsx`
If missing: `pnpm dlx shadcn@latest add @[registry]/[name]`
Never re-add existing components

Feature components: `modules/[feature]/components/`
Shared components: `shared/components/` (reused 2+ times)

## Styling
**Tokens:** `bg`, `fg`, `primary`, `secondary`, `success`, `danger`, `muted`, `border`
- ✓ `text-muted-fg` | ✗ `text-secondary`
- ✓ `bg-primary text-primary-fg` (pair bg/fg)
- ✗ NEVER hardcode: `bg-blue-500`

**className:** Layout ONLY (`w-*`, `h-*`, `m-*`, `p-*`, `flex`, `grid`, `gap-*`)
- ✓ Design via props: `intent="primary"` `size="lg"`
- ✗ `className="bg-blue-500 px-8"`

**cn():** `import { cn } from "~/shared/utils"`
- ✓ `cn("base", condition && "extra")`
- ✗ Template literals: `` `${base} ${extra}` ``

## Routing
Keep routes thin - delegate to modules
Flat files with dots: `products._index.tsx` → `/products`
Dynamic: `products.$id.tsx` → `/products/:id`
Layout: `auth.tsx` + `<Outlet />` wraps `auth.login.tsx`

## Forms
Default: Uncontrolled with `name` attributes
Extract: `new FormData(e.currentTarget)`
Controlled only for: complex validation, store sync, dependent fields

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

## SSR Safety
Browser APIs: `typeof window !== "undefined"` check
Hydration: `useState` + `useEffect` pattern for browser-only state
