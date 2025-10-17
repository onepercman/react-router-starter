# React Router Starter

Quick reference for Claude Code. Full docs in [docs/](docs/).

## Tech Stack

- **React 19** + **React Router v7** (file-based, SSR off)
- **TypeScript** (strict) + **Vite** + **pnpm**
- **Tailwind CSS v4** + **React Aria** + **IntentUI**
- **Zustand** + **React Query** + **Axios**

## Critical Rules (MUST FOLLOW)

1. **Package Manager**: ALWAYS use `pnpm` - Never npm/yarn/bun
2. **Workflow**: Plan → Present → Confirm → Implement (never skip confirmation)
3. **Design tokens only** - Never hardcoded colors (`bg-primary` not `bg-blue-500`)
4. **UI components first** - Check `~/shared/components/ui`, use IntentUI before custom
   - **CRITICAL**: If component exists, use it - DON'T run add command again
5. **Feature-first** - Group by domain in `modules/`, not file type
6. **Routes compose from modules** - Routes are thin, modules contain logic
7. **No index.ts at module root** - Each module has its own `index.ts`, no barrel at `modules/`
8. **Documentation**: Use generic terms (`[feature]`), consolidate into existing headings

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

## Documentation

### Quick Access
- `/arch` - Load architecture details
- `/standards` - Load coding standards
- `/api` - Load API design patterns
- `/review` - Code review checklist

### Full Docs
- [docs/README.md](docs/README.md) - Documentation index
- [docs/architecture.md](docs/architecture.md) - 3-layer system, module patterns
- [docs/coding-standards.md](docs/coding-standards.md) - TypeScript, naming, imports
- [docs/api-design.md](docs/api-design.md) - HTTP client, stores, hooks
- [docs/design-system.md](docs/design-system.md) - Color tokens, styling patterns
- [docs/components.md](docs/components.md) - IntentUI, variants, composition
- [docs/routing.md](docs/routing.md) - React Router v7 conventions

## Common Patterns

### Module Structure
```ts
// modules/auth/index.ts
export { LoginForm, SignupForm } from './auth-forms'
export { useAuth } from './use-auth'
export type { User, AuthState } from './auth-types'
```

### API Call + Store
```ts
// modules/user/user-service.ts
export const userService = {
  getProfile: () => axios.get<User>('/user/profile')
}

// modules/user/user-store.ts
export const useUserStore = create<UserState>()(
  persist((set) => ({ user: null, setUser: (u) => set({ user: u }) }),
  { name: 'user-storage' })
)
```

### Design Tokens
```tsx
// ✅ Correct
<Button intent="primary" size="lg">Submit</Button>
<div className="bg-primary text-fg">Content</div>

// ❌ Never
<button className="bg-blue-500 text-white">Submit</button>
```

## Quick Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build production
pnpm typecheck    # TypeScript check
pnpm check        # All checks
pnpm fix          # Auto-fix lint/format
pnpm add-ui       # Add IntentUI component
```
