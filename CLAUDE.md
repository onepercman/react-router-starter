# React Router Starter

Quick reference for Claude Code. Full docs in [docs/](docs/).

## Tech Stack

- **React 19** + **React Router v7** (file-based routing)
- **TypeScript** (strict) + **Vite** + **pnpm**
- **Tailwind CSS v4** + **shadcn/ui** (registry-based)
- **Zustand** + **React Query** + **Axios**

**⚠️ Check `components.json` for UI registry, icons, rendering mode (CSR/SSR/SSG)**

## Context Management (Token Optimization)

**Project size:** 2803 TS/TSX files (medium-large)
**Strategy:** Targeted reads > broad searches

**Before searching:**
- Check docs first (offline, no tokens)
- Use Glob for file location → Read specific file
- Avoid `find` in Bash (use Glob tool)
- Use `/arch`, `/patterns` shortcuts vs reading full docs

**Multi-step tasks:**
- Use TodoWrite to track (prevents re-explaining context)

## Critical Rules (MUST FOLLOW)

1. **Package Manager**: ALWAYS use `pnpm` - Never npm/yarn/bun
2. **Workflow**: Simple task (<3 steps) → Execute + notify | Complex → Plan + confirm
3. **Design tokens only** - `bg-primary` not `bg-blue-500` (ensures theme consistency)
4. **UI components first** - Check existing → Use → Compose
   - ❌ DON'T: Re-add existing components, override design props, create same-name wrappers
5. **Feature-first** - Group by domain in `modules/`, not file type
6. **Routes compose from modules** - Routes are thin, modules contain logic
7. **No index.ts at module root** - Each module has its own `index.ts`, no barrel at `modules/`

## File Structure

```
app/
├── routes/           # Flat routing (dot notation, $ for params)
├── modules/          # Feature modules (NO root index.ts)
│   └── [feature]/    # Each has index.ts barrel export
└── shared/           # Global utils/UI
    ├── components/ui/  # IntentUI (has index.tsx)
    ├── lib/            # axios, primitives
    ├── stores/         # Global stores (has index.ts)
    ├── types/          # Shared types (has index.ts)
    └── utils/          # Utilities (has index.ts)
```

**Import hierarchy**: Routes → Modules → Shared

## Quick Decision Tree

**New task?**
├─ Simple (<3 steps)? → Execute + notify
└─ Complex (≥3 steps)? → Plan + confirm

**Add UI?**
├─ Exists in `~/shared/components/ui`? → Use it
├─ Exists in module? → Reuse or extract to shared
└─ Missing? → Check `components.json` → Add from registry

**Style component?**
├─ Layout/spacing? → `className` OK
├─ Design props? → Use component props (`intent`, `size`)
└─ Custom styling? → Extend with `tailwind-variants`

## Component System

**Check `components.json` for:**
- UI registries (configured in `registries` field)
- Icon library (configured in `iconLibrary` field)
- Component paths and aliases

**Before adding components:**
1. Check existing: `ls app/shared/components/ui/[component].tsx`
2. If missing, add from registry: `pnpm dlx shadcn@latest add @[registry]/[component]`
   - Replace `[registry]` with key from `components.json` registries

## Documentation

### Quick Access
- `/arch` - Load architecture (3-layer system)
- `/patterns` - Load code patterns (TypeScript, API, stores)
- `/ui` - Load UI guide (components, design system)
- `/router` - Load React Router (routing, rendering modes)
- `/review` - Code review checklist
- [Common Mistakes](docs/common-mistakes.md) - Avoid frequent errors

### Full Docs
- [docs/README.md](docs/README.md) - Documentation index
- [docs/architecture.md](docs/architecture.md) - 3-layer system, module organization
- [docs/patterns.md](docs/patterns.md) - TypeScript, imports, API, stores, hooks
- [docs/ui-guide.md](docs/ui-guide.md) - Components, design tokens, styling
- [docs/react-router.md](docs/react-router.md) - Routing, rendering modes (CSR/SSR/SSG)

## Common Patterns

See [docs/patterns.md](docs/patterns.md) for complete examples:
- Module structure & barrel exports
- Service layer & API integration
- Zustand stores with persistence
- React Query hooks
- Design tokens & component variants

## Quick Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build production
pnpm typecheck    # TypeScript check
pnpm check        # All checks
pnpm fix          # Auto-fix lint/format

# Add UI component (check components.json for registry)
pnpm dlx shadcn@latest add @[registry]/[component]
```
