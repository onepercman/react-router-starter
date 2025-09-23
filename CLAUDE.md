# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript checks
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm check` - Run all checks
- `pnpm fix` - Auto-fix linting and formatting

### Component Development
- `npx shadcn@latest add @intentui/[component]` - Add components from IntentUI registry
- `pnpm add-ui [component]` - Add components using project script

## Technology Stack

- **React Router v7** with file-based routing
- **React 19** functional components only
- **TypeScript** strict mode
- **Tailwind CSS v4** with design system tokens
- **React Aria Components** for accessible primitives
- **IntentUI** component registry
- **tailwind-variants** for component styling
- **Zustand** for state management

## Architecture

### Routes vs Modules Separation

**Routes (`app/routes/`)**: Page composition only
- Import functionality from modules
- Export default page components
- Handle page-level concerns

**Modules (`app/modules/`)**: Business logic and reusable components
- Feature-based organization
- Can be used by multiple routes
- Contain stores, hooks, services, components

**Shared (`app/shared/`)**: Global utilities and UI components
- `components/ui/` - IntentUI design system components
- `components/` - Custom shared components
- `utils/` - Utility functions
- `styles/` - Design system tokens

### Import Flow
```
Routes → Modules → Shared
```

## Color System

### Available Tokens

**Base**: `bg`, `fg`, `muted`, `muted-fg`, `border`, `input`, `ring`

**Brand**: `primary`, `primary-fg`, `secondary`, `secondary-fg`, `accent`, `accent-fg`

**Status**: `success`, `success-fg`, `danger`, `danger-fg`, `warning`, `warning-fg`

**Subtle variants**: `primary-subtle`, `primary-subtle-fg`, `success-subtle`, `success-subtle-fg`, `danger-subtle`, `danger-subtle-fg`

**Layout**: `sidebar`, `navbar`, `overlay` (with `-fg` variants)

**Charts**: `chart-1` to `chart-5`

### Usage Rules

1. **Always use design system tokens** - Never hardcoded colors
2. **Check `app/shared/styles/app.css`** for available tokens
3. **Pair correctly**: `bg-primary` with `text-primary-fg`
4. **Secondary text**: Use `text-muted-fg` (not `text-secondary`)
5. **Error states**: Use `danger` tokens (not `destructive`)

### Essential Patterns

```tsx
// Main content
className = "text-fg bg-bg"

// Secondary text
className = "text-muted-fg"

// Primary actions
className = "bg-primary text-primary-fg"

// Error states
className = "text-danger bg-danger-subtle"
```

## Component System

### IntentUI with React Aria Components

- **Components**: Built on React Aria Components for accessibility
- **Styling**: `tailwind-variants` for component variants
- **Registry**: IntentUI registry via shadcn CLI
- **Icons**: `@intentui/icons` primary, `lucide-react` fallback

### Component Patterns

```tsx
import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "~/shared/lib/primitive"

const variants = tv({
  base: "base-styles",
  variants: {
    variant: {
      default: "bg-primary text-primary-fg",
      outline: "border bg-bg hover:bg-accent",
    },
    size: {
      sm: "px-3 py-1.5",
      default: "px-4 py-2",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function Component({ variant, size, className, ...props }) {
  return <div className={variants({ variant, size, className })} {...props} />
}
```

### Component Priority

**CRITICAL: Always prioritize UI library components over HTML elements**

1. **First**: Check existing UI components in `~/shared/components/ui`
2. **Second**: Add from IntentUI registry if missing: `npx shadcn@latest add @intentui/[component]`
3. **Third**: Use React Aria Components directly if not in registry
4. **Last resort**: Create custom wrapper around React Aria primitives
5. **Never**: Use raw HTML elements when UI component exists

#### HTML Element Replacements
- `<button>` → `<Button>`
- `<input>` → `<TextField>` or `<Input>`
- `<form>` → `<Form>`
- `<select>` → `<Select>` (create if needed)
- `<textarea>` → `<TextField>` with multiline
- `<label>` → `<Label>`

Always use barrel exports: `import { Button, TextField, Form } from "~/shared/components/ui"`

### UI Component Styling Rules

**CRITICAL: When using `/ui` components, use className only for positioning and layout - never override design system properties.**

#### ✅ Correct Usage
```tsx
// Position and layout only
<Button className="w-full mt-4">Submit</Button>
<TextField className="mb-2" label="Email" />

// Use component props for design system properties
<Button intent="primary" size="lg">Action</Button>
<TextField isRequired isInvalid={hasError} />

// Prefer UI components over HTML
<Button intent="outline">Click</Button>   // Not <button>
<TextField label="Name" />                 // Not <input>
<Form onSubmit={handleSubmit}>            // Not <form>
```

#### ❌ Wrong Usage
```tsx
// Don't override design system properties
<Button className="bg-blue-500 px-8 py-4 text-white">Submit</Button>
<TextField className="h-12 border-gray-300 bg-white" />

// Don't use HTML when UI component exists
<button className="...">Click</button>     // Use <Button>
<input className="..." />                  // Use <TextField>
<form>...</form>                          // Use <Form>
```

## File Organization

### Naming Conventions
- **Folders**: `kebab-case`
- **Files**: `kebab-case.tsx`, `use-feature.ts`, `feature-store.ts`
- **Components**: `PascalCase`
- **Functions**: `camelCase`

### Import Patterns
```tsx
// React and external
import { useState } from "react"
import { tv } from "tailwind-variants"

// Modules
import { useAuth } from "~/modules/auth"

// Shared
import { Button } from "~/shared/components/ui"
import { cx } from "~/shared/lib/primitive"

// Types
import type { User } from "~/modules/auth"
```

## State Management

### Zustand Pattern
```tsx
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Store {
  data: T | null
  isLoading: boolean
  error: string | null
  fetch: () => Promise<void>
  clearError: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      data: null,
      isLoading: false,
      error: null,
      fetch: async () => {
        set({ isLoading: true, error: null })
        try {
          const data = await api.getData()
          set({ data, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
        }
      },
      clearError: () => set({ error: null }),
    }),
    { name: "store-name" }
  )
)
```

## TypeScript

- Use `interface` for object shapes
- Use `type` for unions and computed types
- Feature-specific types in `{module}-types.ts`
- Shared types only if used by 2+ features

## Comments

- **English only**
- **Minimize comments** - prefer self-documenting code
- **JSDoc for public APIs** only
- Focus on "why" not "what"

## Key Principles

1. **Routes compose from modules** - Clear separation of concerns
2. **Always use design system tokens** - Never hardcoded colors
3. **IntentUI + React Aria** - Accessible component foundation
4. **tailwind-variants over cva** - Modern variant system
5. **Feature-first organization** - Modules by business domain
6. **Import hierarchy**: Routes → Modules → Shared
7. **Minimize documentation** - Keep docs concise, avoid verbose examples and edge cases