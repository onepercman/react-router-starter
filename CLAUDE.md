# React Router Starter

Quick reference for Claude Code when working with this codebase.

## Technology Stack

- **React Router v7** with file-based routing
- **React 19** functional components only
- **TypeScript** strict mode
- **Tailwind CSS v4** with design system tokens
- **React Aria Components** for accessible primitives
- **IntentUI** component registry
- **tailwind-variants** for component styling
- **Zustand** for state management

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
├── routes/       # Page composition only - import from modules
├── modules/      # Feature-based business logic (stores, hooks, services, components)
└── shared/       # Global utilities and UI components
    ├── components/ui/   # IntentUI design system components
    └── styles/          # Design system tokens
```

**Import hierarchy**: Routes → Modules → Shared

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
- **Naming**: `kebab-case` files, `PascalCase` components, `camelCase` functions
- **Types**: `interface` for objects, `type` for unions
- **State**: Zustand with persist middleware

## Detailed Documentation

### Development Guidelines
- [.claude/architecture.md](.claude/architecture.md) - Routes, modules, file organization
- [.claude/design-system.md](.claude/design-system.md) - Color tokens, styling patterns
- [.claude/components.md](.claude/components.md) - Component rules, variants, React Aria
- [.claude/coding-standards.md](.claude/coding-standards.md) - TypeScript, imports, comments
- [.claude/prompts.md](.claude/prompts.md) - Common development task prompts

### Project Management
- [.claude/project-spec.md](.claude/project-spec.md) - Feature specs, data models, API endpoints
- [.claude/project-plan.md](.claude/project-plan.md) - Development phases, milestones, timeline
