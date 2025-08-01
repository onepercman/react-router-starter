# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production using React Router
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript checks with React Router typegen
- `pnpm lint` - Run ESLint on .ts/.tsx/.js/.jsx files
- `pnpm format` - Format code with Prettier
- `pnpm check` - Run all checks (typecheck + lint + format)
- `pnpm fix` - Auto-fix linting and formatting issues

### Component Development
- `pnpm add-components` - Add new components using codereg

## Technology Stack

### Core Framework
- **React Router v7** with file-based routing
- **React 19** with functional components only (no class components)
- **TypeScript** in strict mode
- **Vite** as build tool
- **pnpm** as package manager

### Key Dependencies
- `@react-router/dev` - React Router v7
- `zustand` - State management
- `tailwindcss@4` - Styling with CSS variables
- `tailwind-variants` - Component styling patterns
- `axios` - HTTP client
- `lucide-react` - Icons
- `@privy-io/react-auth` - Authentication
- `@worldcoin/minikit-js` - WorldCoin integration

## Architecture Overview

### Feature-First Organization

**CRITICAL**: Use Feature-First Architecture where each feature is self-contained in its own folder:
- Structure: `app/modules/{module}/{feature}/`
- Each feature contains ALL related code: components, hooks, types, utils, stores
- Shared code goes to `app/shared/` only when used by 2+ features
- Use barrel exports (`index.ts`) for clean imports

### Module Structure Pattern

```
module-name/
├── module-store.ts             # State management (Zustand)
├── module-types.ts             # TypeScript types
├── use-module.ts               # Custom hooks
├── module.service.ts           # API services (if needed)
├── sub-feature/                # Sub-features (if needed)
│   ├── sub-feature-page.tsx
│   └── index.ts
└── index.ts                    # Barrel exports
```

### Current Modules
- `app/modules/home/` - Home page
- `app/modules/tokens/` - Token management
- `app/modules/rewards/` - Rewards system
- `app/modules/assets/` - Asset management
- `app/modules/user/` - User authentication and profile
- `app/modules/onboarding/` - User onboarding flow

### Shared Resources

`app/shared/` contains truly global code used by multiple features:
- `components/` - Reusable UI components (Button, Card, Input, etc.)
- `layouts/` - Layout components (MainLayout, TabLayout)
- `api/base-client.ts` - Axios HTTP client
- `config/` - Environment and React Query configuration
- `hooks/` - Global hooks (useLocalStorage)
- `utils/` - Utility functions (cn, format-utils)
- `styles/` - Global CSS and design system tokens

## 🎨 DESIGN SYSTEM & COLOR TOKENS

### ⚠️ CRITICAL: Always Use Design System Color Tokens

**NEVER use hardcoded colors or Tailwind's default colors. ALWAYS use the configured color tokens from the design system.**

### How to Find Available Color Tokens

When building UI components, **ALWAYS check the design system files first**:

1. **Check the main design system file**: `app/shared/styles/app.css`
   - Look for `@theme` section to see all available color tokens
   - Each token follows the pattern: `--color-{name}`

2. **Check theme files for actual values**:
   - `app/shared/styles/light.css` - Light theme color values
   - `app/shared/styles/dark.css` - Dark theme color values

3. **Use Tailwind classes** that correspond to the CSS variables:
   - CSS variable: `--color-primary` → Tailwind class: `bg-primary`, `text-primary`
   - CSS variable: `--color-primary-foreground` → Tailwind class: `text-primary-foreground`
   - CSS variable: `--color-primary-muted` → Tailwind class: `bg-primary-muted`

### Color Token Naming Patterns

#### Base Colors
- `background` - Main background color
- `foreground` - Main text color
- `muted` - Muted background color
- `muted-foreground` - Muted text color
- `border` - Border color
- `ring` - Focus ring color

#### Semantic Colors (with variants)
Each semantic color typically has these variants:
- `{color}` - Base color (e.g., `primary`, `success`, `error`)
- `{color}-foreground` - Text color on base background
- `{color}-focus` - Focus/hover state
- `{color}-muted` - Subtle background variant
- `{color}-subtle` - Very subtle background variant

### Color Usage Guidelines

#### ✅ CORRECT - Use Design System Tokens

```tsx
// Text colors - Use semantic tokens from design system
className = "text-foreground"; // Main text
className = "text-muted-foreground"; // Secondary text
className = "text-primary"; // Primary brand color
className = "text-error"; // Error states
className = "text-success"; // Success states

// Background colors - Use semantic tokens from design system
className = "bg-background"; // Main background
className = "bg-muted"; // Muted background
className = "bg-primary"; // Primary background
className = "bg-error-muted"; // Error background (subtle)
className = "bg-success-muted"; // Success background (subtle)

// Border colors - Use semantic tokens from design system
className = "border-border"; // Default borders
className = "border-primary"; // Primary borders
className = "border-error"; // Error borders

// Hover states - Use focus variants from design system
className = "hover:bg-primary-focus"; // Primary hover
className = "hover:text-primary-focus"; // Primary text hover
className = "hover:bg-muted"; // Subtle hover
```

#### ❌ WRONG - Never Use These

```tsx
// Hardcoded colors - NEVER USE
className = "text-gray-900";
className = "text-blue-600";
className = "bg-red-50";
className = "border-gray-200";
className = "text-white";
className = "bg-black";

// Hex colors - NEVER USE
className = "text-[#000000]";
className = "bg-[#ffffff]";
className = "border-[#e5e7eb]";

// RGB colors - NEVER USE
className = "text-[rgb(0,0,0)]";
className = "bg-[rgba(255,255,255,0.8)]";
```

### Color Token Selection Process

When building UI components, follow this process:

1. **Check Design System First**: Look at `app/shared/styles/app.css` to see available tokens
2. **Choose Base vs Semantic**:
   - Use base tokens (`foreground`, `background`, `border`) for fundamental elements
   - Use semantic tokens (`primary`, `success`, `error`) for specific meanings
3. **Select Appropriate Variant**:
   - Base: `text-{token}`, `bg-{token}`, `border-{token}`
   - Foreground: `text-{token}-foreground` for text on colored backgrounds
   - Muted: `bg-{token}-muted` for subtle backgrounds
   - Focus: `hover:bg-{token}-focus` for interactive states
4. **Verify Token Exists**: Ensure the token is actually defined in the design system
5. **Test Theme Support**: Verify it works in both light and dark themes

## State Management

### Zustand Patterns
- Use `create()` with TypeScript generics
- Implement `persist` middleware for auth and user data
- Include loading and error states for async actions
- Use `createJSONStorage(() => localStorage)` for persistence
- Actions should be async/await with proper error handling

### Store Structure
```typescript
interface StoreState {
  // Data
  data: T | null;
  // UI States
  isLoading: boolean;
  error: string | null;
  // Actions
  actionName: (params) => Promise<void>;
  clearError: () => void;
}
```

### Store Location
- **Feature-specific stores** → `app/modules/{module}/{module}-store.ts`
- **Global stores** → `app/shared/stores/` (only if truly global)

## Component Patterns

### React Patterns
- **Functional components only** - no class components
- Use `forwardRef` for reusable components
- Implement proper TypeScript props interfaces
- Use custom hooks for feature-specific logic
- Follow compound component patterns for complex UI

### Component File Structure
```
feature-name/
├── feature-page.tsx        # Main page component
├── feature-component.tsx   # Sub-components
├── use-feature.ts         # Custom hooks
├── feature-types.ts       # Types
├── feature-utils.ts       # Utilities
└── index.ts              # Barrel exports
```

### Props & Types
- Use `interface` for component props
- Extend HTML element props when appropriate
- Use `React.ComponentProps<'element'>` for base element props
- Implement proper `forwardRef` typing

## Styling & UI

### Tailwind CSS v4 Conventions
- Use **Tailwind classes** that correspond to design system tokens
- Prefer **flat colors** over gradients
- All buttons must have **transitions**
- Follow Tailwind v4 naming conventions for all className values
- Use responsive design with mobile-first approach

### Component Styling
- Use `tailwind-variants` (tv) for complex component styling patterns
- Use `cn()` helper function for className concatenation (not react-tvcx)
- Component structure: base styles + variants + compound variants
- Always use design system color tokens in variants

### Design System
- Consistent sizing: `xs`, `sm`, `md`, `lg` variants
- Color system: Use semantic color tokens (primary, success, error, warning, info, accent)
- Shape variants: `normal`, `pill`, `circle`, `square`
- Component variants: `default`, `outlined`, `ghost`, `light`

## File Organization

### Single File Preference

**CRITICAL: Prefer single files over folders for features whenever possible.**

- **Default approach**: Keep features in single files (e.g., `crypto-section.tsx`, `promo-section.tsx`)
- **Only create folders** when the feature becomes complex and truly needs multiple files
- **Avoid premature organization** - don't create folders with just an `index.ts` export file
- **Guidelines for folder creation**:
  - Feature has 3+ substantial components (not just small helper components)
  - Feature has complex business logic that needs separation
  - Feature has multiple distinct responsibilities that warrant separation
  - Total lines of code exceed ~300-400 lines in a single file

### Examples

```
✅ PREFERRED - Single file approach
feature-name.tsx          # Contains all related components, types, and logic

❌ AVOID - Unnecessary folder structure  
feature-name/
├── feature-component.tsx # Small component
├── index.ts             # Just exports
└── types.ts             # Few types

✅ ACCEPTABLE - When truly needed
complex-feature/
├── complex-component.tsx # Substantial component 1
├── another-component.tsx # Substantial component 2  
├── business-logic.ts    # Complex business logic
├── types.ts            # Many types and interfaces
└── index.ts            # Barrel exports
```

This approach reduces cognitive overhead and makes navigation simpler while maintaining clean architecture.

### Naming Conventions
- **Folders**: `kebab-case` (`auth/`, `user-profile/`, `product-list/`)
- **Files**:
  - Store files: `{module}-store.ts` (e.g., `auth-store.ts`, `user-store.ts`)
  - Type files: `{module}-types.ts` (e.g., `auth-types.ts`, `user-types.ts`)
  - Hook files: `use-{feature}.ts` (e.g., `use-auth.ts`, `use-user-profile.ts`)
  - Service files: `{module}.service.ts` (e.g., `auth.service.ts`)
  - Page components: `{feature}-page.tsx` (e.g., `login-page.tsx`)
- **Components**: `PascalCase` (`LoginPage`, `ProductCard`)
- **Functions**: `camelCase` (`useAuth`, `formatPrice`)
- **Constants**: `UPPER_SNAKE_CASE` (`API_ENDPOINTS`)

### Import Order (auto-organized by Prettier)
```typescript
// 1. React imports
import { useState, useEffect } from "react";

// 2. External library imports
import { create } from "zustand";

// 3. Module imports (~/modules)
import { useAuth } from "~/modules/auth";
import { useUserProfile } from "~/modules/user";

// 4. Shared imports (~/shared)
import { Button } from "~/shared/components";
import { cn } from "~/shared/utils";

// 5. Type imports
import type { AuthCredentials } from "~/modules/auth";
```

### Path Aliases
- Use `~/` for all internal imports (`./app/`)
- Avoid relative imports (`../../`)
- Configure in `tsconfig.json` paths

### Export Patterns
- Use **named exports** (avoid default exports except for pages)
- Implement barrel exports via `index.ts`
- Export types separately: `export type { TypeName }`

## Commenting Guidelines

### Comment Rules
- **Use ONLY English comments** - no Vietnamese or other languages
- **Minimize comments** - prefer self-documenting code
- **Only comment when necessary** - when logic is complex or non-obvious
- **Use JSDoc for public APIs** - functions, components, and types that are exported
- **Avoid obvious comments** - don't comment what the code clearly shows

### When to Comment
```typescript
// ✅ Good - complex business logic
const calculateDiscount = (price: number, userType: UserType) => {
  // Apply tiered discount based on user type and purchase history
  const baseDiscount = userType === "premium" ? 0.15 : 0.05;
  const loyaltyBonus = getUserLoyaltyBonus(userId);
  return price * (baseDiscount + loyaltyBonus);
};

// ❌ Bad - obvious comment
const user = getUser(); // Get user

// ✅ Good - JSDoc for public API
/**
 * Authenticates user with provided credentials
 * @param credentials - User login credentials
 * @returns Promise resolving to auth result
 */
export const authenticateUser = async (credentials: AuthCredentials) => {
  // Implementation
};
```

### Comment Style
- Use `//` for single-line comments
- Use `/* */` for multi-line comments only when necessary
- Use JSDoc `/** */` for public APIs and complex functions
- Keep comments concise and focused on the "why" not the "what"

## Development Practices

### Code Quality
- Follow ESLint configuration (relaxed but strict)
- Use Prettier with minimal configuration (only non-default values)
- Implement TypeScript strict mode
- Write descriptive variable and function names

### Error Handling
- Use try-catch blocks for async operations
- Implement proper error states in components
- Use React Error Boundaries for fallbacks
- Show user-friendly error messages

### Performance
- Use React.memo() for expensive components
- Implement proper dependency arrays in hooks
- Use code splitting at route level
- Optimize bundle size with tree shaking

## Routing Patterns

### React Router v7 File-based Routing
```typescript
// app/routes.ts - Central configuration
export default [
  index("modules/home/home-page/home-page.tsx"),
  route("dashboard", "modules/dashboard/dashboard-page.tsx"),
  route("products", "modules/products/product-list-page.tsx"),
] satisfies RouteConfig;
```

### Page Components
- Export as default function
- Use descriptive names: `LoginPage`, `ProductListPage`
- Implement proper meta data and SEO
- Handle loading and error states

## TypeScript Conventions

### Type Organization
- Feature-specific types in feature folders (`app/modules/{module}/{module}-types.ts`)
- Shared types in `app/shared/types/` (only if used by 2+ features)
- Use `interface` for object shapes
- Use `type` for unions and computed types

### Naming
- Interfaces: `PascalCase` (`User`, `AuthCredentials`)
- Types: `PascalCase` with descriptive suffixes (`UserRole`, `ApiResponse`)
- Generics: Single letter or descriptive (`T`, `TData`)

## Security & API

### Authentication Patterns
- JWT tokens with refresh mechanism
- Persistent auth state with Zustand
- Protected routes with proper guards
- Secure token storage in localStorage

### API Integration
- Use Axios with base client configuration (`app/shared/api/base-client.ts`)
- Implement proper error handling
- Use TypeScript for request/response types
- Handle loading states consistently

## Git & Development

### Commit Conventions
- Start commit messages with rocket emoji: 🚀
- Use clear, descriptive commit messages
- Follow conventional commits when possible

### Scripts & Commands
- Use `pnpm` for all package management
- Available scripts: `dev`, `build`, `typecheck`, `lint`, `format`
- Run `pnpm check` before commits

## Module Organization

### When to Use Modules vs Shared
```typescript
// ✅ Module-specific (feature folder)
- State management for the feature
- Custom hooks for the feature
- Types specific to the feature
- API services for the feature
- Components only used by the feature

// ✅ Shared (shared folder)
- UI components used across features
- Utility functions used across features
- Global state management
- Layout components
- API client and configuration
```

### Creating New Features
1. **Create module folder**: `app/modules/new-feature/`
2. **Add core files**:
   - `new-feature-store.ts` (if state needed)
   - `new-feature-types.ts` (if types needed)
   - `use-new-feature.ts` (if hooks needed)
   - `new-feature.service.ts` (if API needed)
3. **Add sub-features** (if needed): `app/modules/new-feature/sub-feature/`
4. **Export everything** in `index.ts`
5. **Update main modules index**: `app/modules/index.ts`

### Import Patterns
```typescript
// ✅ Feature-specific imports
import { useAuth } from "~/modules/auth";
import { useUserProfile } from "~/modules/user";

// ✅ Shared imports
import { Button } from "~/shared/components";
import { useLocalStorage } from "~/shared/hooks";
import { cn } from "~/shared/utils";

// ✅ Type imports
import type { AuthCredentials } from "~/modules/auth";
import type { UserProfile } from "~/modules/user";
```

## 🎯 CRITICAL REMINDERS

### Color Token Priority
**ALWAYS prioritize design system color tokens over any other color approach:**

1. **First choice**: Use semantic color tokens from the design system (check `app/shared/styles/app.css`)
2. **Second choice**: Use base color tokens from the design system (`foreground`, `background`, `border`)
3. **Never use**: Hardcoded colors, hex values, RGB values, or Tailwind's default colors

### Design System Discovery Process
**Before using any colors, always:**

1. **Check the design system file**: `app/shared/styles/app.css`
   - Look for `@theme` section to see all available tokens
   - Understand the naming patterns: `--color-{name}`

2. **Check theme files**:
   - `app/shared/styles/light.css` - Light theme values
   - `app/shared/styles/dark.css` - Dark theme values

3. **Use Tailwind classes** that correspond to CSS variables:
   - `--color-primary` → `bg-primary`, `text-primary`
   - `--color-primary-foreground` → `text-primary-foreground`
   - `--color-primary-muted` → `bg-primary-muted`

Remember: This project prioritizes **developer experience**, **maintainability**, and **scalability** through consistent patterns and conventions. Each feature is self-contained with all its related code, and the shared folder only contains truly global utilities and components. Use minimal, English-only comments and prefer self-documenting code.

**Most importantly: ALWAYS check the design system files first - NEVER use hardcoded colors!**