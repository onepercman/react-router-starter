# React Router Starter

Quick reference for Cursor when working with this codebase.

## Technology Stack

- **React Router v7** - File-based routing with SSR support
- **React 19** - Functional components only
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Design system tokens
- **React Aria Components** - Accessible UI primitives
- **IntentUI** - Component registry
- **tailwind-variants** - Component styling variants
- **Zustand** - State management with persist middleware
- **React Query** - Server state management
- **Axios** - HTTP client with interceptors
- **next-themes** - Theme management

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm typecheck    # Run TypeScript checks
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm check        # Run all checks
pnpm fix          # Auto-fix linting and formatting
```

### Component Development
```bash
npx shadcn@latest add @intentui/[component]  # Add from IntentUI registry
pnpm add-ui [component]                       # Add using project script
```

## Architecture Overview

```
app/
├── routes/              # Flat file-based routing (React Router v7)
│   ├── _index.tsx       # /
│   ├── products._index.tsx   # /products
│   ├── products.$id.tsx      # /products/:id
│   ├── auth.tsx              # Layout for /auth/*
│   └── auth.login.tsx        # /auth/login
│
├── modules/             # Feature modules
│   ├── auth/            # Authentication (store, service, hook)
│   ├── products/        # Products (components, types)
│   ├── analytics/       # Analytics (components, types)
│   └── user/            # User profile (store, hook)
│
└── shared/              # Global utilities and UI
    ├── api/             # Axios base client
    ├── components/ui/   # IntentUI design system
    ├── layouts/         # MainLayout
    ├── providers/       # React Query, Theme
    └── styles/          # Design tokens
```

**Import hierarchy**: Routes → Modules → Shared

**Routing**: Flat file structure with dot notation (`.`) for nested paths, `$` for dynamic segments

**Key Implementations**:
- **Root**: `app/root.tsx` - App shell with providers (Theme, Query, Layout)
- **State**: Zustand stores with localStorage persistence
- **API**: Axios client with auth interceptors in `shared/api/base-client.ts`
- **Data Fetching**: React Query config in `shared/providers/query-provider.tsx`
- **Theming**: next-themes in `shared/providers/theme-provider.tsx`

## Key Principles

1. **Routes compose from modules** - Clear separation of concerns
2. **Always use design system tokens** - Never hardcoded colors
3. **Prioritize UI components over HTML** - Use `<Button>` not `<button>`
4. **className for layout only** - Never override design system properties
5. **Feature-first organization** - Modules by business domain
6. **Minimize comments** - Prefer self-documenting code

## Quick Rules

- **Colors**: Use tokens from `app/shared/styles/app.css` (e.g., `bg-primary`, `text-fg`, `text-muted-fg`)
- **Components**: Check `~/shared/components/ui` first, add from IntentUI if missing
- **Icons**: Check `iconLibrary` field in `components.json` to determine which icon package to use
- **Naming**: `kebab-case` files, `PascalCase` components, `camelCase` functions
- **Types**: `interface` for objects, `type` for unions
- **State**: Zustand with persist middleware

## Documentation

### Development Guidelines
- [architecture.md](architecture.md) - Directory structure, layer responsibilities
- [routing.md](routing.md) - React Router v7 file-based routing conventions ⭐
- [implementation.md](implementation.md) - Common patterns (API, providers, hooks, modules)
- [coding-standards.md](coding-standards.md) - TypeScript, imports, Zustand patterns
- [design-system.md](design-system.md) - Color tokens, styling patterns
- [components.md](components.md) - Component rules, variants, React Aria
- [prompts.md](prompts.md) - Common development task prompts

### Project Management
- [project-spec.md](project-spec.md) - Feature specs, data models, API endpoints
- [project-plan.md](project-plan.md) - Development phases, milestones, timeline
