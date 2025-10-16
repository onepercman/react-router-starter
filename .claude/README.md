# React Router Starter

Quick reference for Claude Code when working with this codebase.

## Claude Code Workflow Rules

**CRITICAL - Must follow these rules:**

1. **Package Manager**: ALWAYS use `pnpm` (never npm, yarn, or others)
2. **Planning First**: ALWAYS present a plan and ask for user confirmation before implementing any solution
3. **Documentation Style**:
   - Keep docs generic and rule-based
   - NEVER mention specific module/feature names in examples
   - Use placeholders: `[feature]`, `[component]`, etc.
   - Avoid duplication - consolidate rules under main headings
   - When updating docs, add to existing headings rather than creating new ones

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
├── routes/              # Flat file-based routing
│   └── [routing files]  # See routing.md for conventions
│
├── modules/             # Feature modules (NO index.ts at root)
│   └── [feature]/       # Each module has barrel export
│       ├── index.ts           # Barrel exports (REQUIRED)
│       ├── [feature]-store.ts # Zustand store (optional)
│       ├── [feature]-service.ts # API calls (optional)
│       ├── [feature]-types.ts # Type definitions
│       └── use-[feature].ts   # Custom hook (optional)
│
└── shared/              # Global utilities and UI
    ├── components/ui/   # IntentUI design system (has index.tsx)
    ├── components/      # Shared components (no index)
    ├── config/          # Environment config (no index)
    ├── constants/       # Global constants (no index)
    ├── hooks/           # Shared hooks (no index)
    ├── layouts/         # App layouts (no index)
    ├── lib/             # Core libraries: axios, primitives (no index)
    ├── providers/       # Context providers (no index)
    ├── stores/          # Global stores (has index.ts)
    ├── styles/          # Design tokens (no index)
    ├── types/           # Shared types (has index.ts)
    └── utils/           # Utility functions (has index.ts)
```

**Import hierarchy**: Routes → Modules → Shared

**Routing**: Flat file structure with dot notation (`.`) for nested paths, `$` for dynamic segments

**Key Locations**:
- **Root**: `app/root.tsx` - App shell with providers
- **API**: `shared/lib/axios.ts` - Axios instance
- **Providers**: `shared/providers/` - Query, Theme providers
- **UI**: `shared/components/ui/` - IntentUI components

## Key Principles

1. **Routes compose from modules** - Clear separation of concerns
2. **Always use design system tokens** - Never hardcoded colors
3. **Prioritize UI components over HTML** - Use `<Button>` not `<button>`
4. **className for layout only** - Never override design system properties
5. **Feature-first organization** - Modules by business domain
6. **Minimize comments** - Prefer self-documenting code

## Quick Rules

- **Package Manager**: Use `pnpm` only
- **Workflow**: Plan → Ask user → Implement
- **Colors**: Use design system tokens (e.g., `bg-primary`, `text-fg`)
- **Components**: Check `~/shared/components/ui` first, add from IntentUI if missing
- **Icons**: Check `iconLibrary` field in `components.json`
- **Naming**: `kebab-case` files, `PascalCase` components, `camelCase` functions
- **Types**: `interface` for objects, `type` for unions
- **State**: Zustand with persist middleware
- **Docs**: Generic rules only, use placeholders, consolidate into existing headings

## Documentation

### Essential Reading
- **[workflow-rules.md](workflow-rules.md)** - ⭐ **READ THIS FIRST** - Package manager, workflow, documentation rules

### Development Guidelines
- [architecture.md](architecture.md) - Directory structure, layer responsibilities
- [routing.md](routing.md) - React Router v7 file-based routing conventions
- [implementation.md](implementation.md) - Common patterns (API, providers, hooks, modules)
- [coding-standards.md](coding-standards.md) - TypeScript, imports, Zustand patterns
- [design-system.md](design-system.md) - Color tokens, styling patterns
- [components.md](components.md) - Component rules, variants, React Aria
- [prompts.md](prompts.md) - Common development task prompts

### Project Management
- [project-spec.md](project-spec.md) - Feature specs, data models, API endpoints
- [project-plan.md](project-plan.md) - Development phases, milestones, timeline
