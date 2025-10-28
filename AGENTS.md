# React Project Conventions

## Package Manager

ALWAYS `pnpm` - Never npm, yarn, bun

## TypeScript

Always: `import type { ... }` for type imports

## Architecture

3-layer: Entry → Modules → Shared

Each module MUST have `index.ts` barrel export
NEVER create root `modules/index.ts`
Import: `from "~/modules/[feature]"` ✓ NOT `from "~/modules"` ✗

Shared organization:
- **With barrel (`index.ts`):** types, utils, stores
- **Direct import (NO barrel):** config, lib, hooks, guards, filters, interceptors

## SSR Safety

Browser APIs: `typeof window !== "undefined"` check
Hydration: `useState` + `useEffect` pattern for browser-only state

## Styling

ALWAYS use tokens - NEVER hardcode colors
Tokens: `bg`, `fg`, `primary`, `secondary`, `success`, `danger`, `muted`, `border`

className for LAYOUT ONLY (`w-*`, `h-*`, `m-*`, `p-*`, `flex`, `grid`, `gap-*`)
Design via props: `intent="primary"`, `size="lg"`
NEVER: `className="bg-blue-500 px-8"`

## Components

Feature components: `modules/[feature]/components/`
Shared components: `shared/components/` (reused 2+ times)

## Routing

Keep routes thin - delegate to modules

## State Management

**Zustand:** `useStore((s) => s.data)` ✓ NOT `useStore()` ✗

**React Query:** `queryClient.invalidateQueries()` after mutations (CRITICAL)

**Service Layer:**
- Pattern: Class with singleton export
- Location: `modules/[feature]/[feature]-service.ts`
