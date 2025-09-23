# React Router Starter

A modern React application built with **React Router v7**, **IntentUI components**, and **feature-first architecture**.

## Features

- ⚡ **React Router v7** - File-based routing with SSR support
- 🎨 **Tailwind CSS v4** - Design system with CSS variables
- 🧩 **IntentUI Components** - Accessible React Aria Components
- 🔒 **Authentication System** - Complete auth with Zustand
- 🏗️ **Routes & Modules Architecture** - Clear separation of concerns
- 🛠️ **TypeScript** - Full type safety with strict mode
- 📱 **Responsive Design** - Mobile-first approach

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Demo Credentials
- **Email**: test@example.com
- **Password**: password

## Architecture

### Routes & Modules Separation

**Routes (`app/routes/`)**: Page composition only
- Import functionality from modules
- Handle page-level layout and concerns

**Modules (`app/modules/`)**: Business logic and reusable components
- Feature-based organization (auth, products, analytics)
- State management, hooks, services, components

**Shared (`app/shared/`)**: Global utilities and UI components
- Design system components in `components/ui/`
- Utility functions and shared resources

### Project Structure

```
app/
├── routes/                 # Page components
│   ├── dashboard/index.tsx # Dashboard page
│   ├── products/index.tsx  # Products page
│   └── auth/login/index.tsx # Login page
├── modules/                # Business logic
│   ├── auth/               # Authentication module
│   │   ├── auth-store.ts   # Zustand store
│   │   ├── use-auth.ts     # Custom hook
│   │   └── index.ts        # Exports
│   ├── products/           # Products module
│   └── analytics/          # Analytics module
└── shared/                 # Global resources
    ├── components/ui/      # IntentUI components
    ├── utils/              # Utility functions
    └── styles/             # Design system tokens
```

## Technology Stack

- **React 19** - Latest React with functional components
- **React Router v7** - Modern routing with type safety
- **TypeScript** - Strict mode for type safety
- **Tailwind CSS v4** - Utility-first CSS with design tokens
- **React Aria Components** - Accessible component primitives
- **IntentUI** - Component registry with shadcn CLI compatibility
- **tailwind-variants** - Component variant system
- **Zustand** - Lightweight state management
- **Vite** - Fast build tool

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm typecheck    # Run TypeScript checks
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm check        # Run all checks
pnpm fix          # Auto-fix issues
pnpm add-ui       # Add UI components from IntentUI
```

## Key Patterns

### Import Hierarchy
```tsx
// React and external libraries
import { useState } from "react"
import { tv } from "tailwind-variants"

// Modules (business logic)
import { useAuth } from "~/modules/auth"

// Shared (UI components and utils)
import { Button } from "~/shared/components/ui"
import { cx } from "~/shared/lib/primitive"

// Types
import type { User } from "~/modules/auth"
```

### Component Development
```tsx
import { tv, type VariantProps } from "tailwind-variants"

const variants = tv({
  base: "inline-flex items-center gap-2 rounded-md transition-all",
  variants: {
    variant: {
      default: "bg-primary text-primary-fg",
      outline: "border bg-bg hover:bg-accent",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function Component({ variant, size, className, ...props }) {
  return (
    <div className={variants({ variant, size, className })} {...props} />
  )
}
```

### State Management
```tsx
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginData) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (credentials) => {
        set({ isLoading: true })
        // Implementation
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-store" }
  )
)
```

## Design System

All colors use design system tokens - never hardcoded values:

```tsx
// ✅ Correct - using design tokens
className="bg-primary text-primary-fg"
className="text-muted-fg"
className="border-border"

// ❌ Wrong - hardcoded colors
className="bg-blue-500 text-white"
className="text-gray-600"
```

Available tokens: `primary`, `secondary`, `accent`, `success`, `danger`, `warning`, `muted`, with `-fg` variants for foreground colors.

## Contributing

1. Follow **Routes & Modules architecture**
2. Use **design system tokens** for all colors
3. Leverage **IntentUI components** before creating custom ones
4. Write **TypeScript** with proper types
5. Follow **feature-first organization**

## License

MIT