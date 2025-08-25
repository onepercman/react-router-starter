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

### Routes & Modules Separation

**CRITICAL**: This project uses a clear separation between routes (pages) and modules (business logic):

#### Routes Structure (`app/routes/`)
- **Purpose**: Contains page components that define UI layouts and composition
- **Organization**: Follows React Router v7 file-based routing structure
- **Structure**: `app/routes/{route-name}/index.tsx`
- **Responsibility**: Import and compose functionality from modules, handle page-level concerns

#### Modules Structure (`app/modules/`)
- **Purpose**: Contains business logic, components, and feature-specific code
- **Organization**: Feature-based, not route-based (one module can serve multiple routes)
- **Structure**: `app/modules/{feature-name}/`
- **Responsibility**: Provide reusable business logic, components, hooks, stores, and services

### Module Structure Pattern

```
module-name/
├── module-store.ts             # State management (Zustand)
├── module-types.ts             # TypeScript types
├── use-module.ts               # Custom hooks
├── module.service.ts           # API services (if needed)
├── feature-component.tsx       # Feature-specific components
├── feature-section.tsx         # Reusable sections
└── index.ts                    # Barrel exports
```

### Route Structure Pattern

```
route-name/
├── index.tsx                   # Main page component (default export)
├── route-specific-component.tsx # Components only used by this route
└── other-route-sections.tsx    # Route-specific sections if needed
```

### Current Architecture

#### Routes (`app/routes/`)
- `app/routes/dashboard/` - Main dashboard page layout and composition
- `app/routes/products/` - Product listing and management pages
- `app/routes/analytics/` - Analytics and reporting pages  
- `app/routes/profile/` - User profile and account pages
- `app/routes/settings/` - Application settings pages

#### Modules (`app/modules/`)
- `app/modules/auth/` - Authentication and authorization logic
- `app/modules/user/` - User management and profile functionality
- `app/modules/products/` - Product-related business logic and components
- `app/modules/analytics/` - Data analysis and reporting features
- `app/modules/notifications/` - Notification system and management

### Key Principles

1. **Pages import from modules**: Routes compose UI by importing from feature modules
2. **Modules are feature-based**: Organized by business domain, not by route
3. **Reusability**: Modules can be used by multiple routes
4. **Clear separation**: Pages handle layout, modules handle business logic

### Shared Resources

`app/shared/` contains truly global code used by multiple features:
- `components/` - Reusable UI components
  - `ui/` - Design system components (shadcn) with barrel exports
  - Root level - Custom shared components (direct imports)
- `layouts/` - Layout components
- `api/` - HTTP client and API configuration
- `config/` - Environment and app configuration
- `hooks/` - Global custom hooks
- `utils/` - Utility functions
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

### Available Color Tokens

**Current design system tokens available:**

#### Base Colors
- `background` - Main background color
- `foreground` - Main text color
- `muted` - Muted background color
- `muted-foreground` - Muted text color
- `border` - Border color
- `input` - Input border color
- `ring` - Focus ring color

#### Card & Popover Colors
- `card` - Card background
- `card-foreground` - Card text color
- `popover` - Popover background
- `popover-foreground` - Popover text color

#### Semantic Colors
- `primary` - Primary brand color
- `primary-foreground` - Text on primary background
- `secondary` - Secondary background
- `secondary-foreground` - Text on secondary background
- `accent` - Accent background
- `accent-foreground` - Text on accent background
- `destructive` - Error/danger color
- `destructive-foreground` - Text on destructive background
- `success` - Success/positive states
- `success-foreground` - Text on success background
- `warning` - Warning/caution states
- `warning-foreground` - Text on warning background
- `info` - Informational states
- `info-foreground` - Text on info background

#### Chart Colors (for data visualization)
- `chart-1` through `chart-5` - Chart color palette

#### Sidebar Colors (for navigation)
- `sidebar` - Sidebar background
- `sidebar-foreground` - Sidebar text
- `sidebar-primary` - Sidebar primary elements
- `sidebar-primary-foreground` - Text on sidebar primary
- `sidebar-accent` - Sidebar accent elements
- `sidebar-accent-foreground` - Text on sidebar accent
- `sidebar-border` - Sidebar borders
- `sidebar-ring` - Sidebar focus rings

### Color Usage Guidelines

#### ✅ CORRECT - Use Design System Tokens

```tsx
// Text colors - Use available design system tokens
className = "text-foreground"; // Main text
className = "text-muted-foreground"; // Secondary text
className = "text-primary"; // Primary brand color
className = "text-destructive"; // Error states
className = "text-success"; // Success states
className = "text-warning"; // Warning states
className = "text-info"; // Info states

// Background colors - Use available design system tokens
className = "bg-background"; // Main background
className = "bg-muted"; // Muted background
className = "bg-primary"; // Primary background
className = "bg-accent"; // Accent background
className = "bg-card"; // Card background
className = "bg-success"; // Success background
className = "bg-warning"; // Warning background
className = "bg-info"; // Info background

// Border colors - Use available design system tokens
className = "border-border"; // Default borders
className = "border-input"; // Input borders
className = "border-primary"; // Primary borders

// Hover states - Use available tokens
className = "hover:bg-accent"; // Subtle hover
className = "hover:text-foreground"; // Text hover
className = "hover:border-border"; // Border hover
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
2. **Choose Appropriate Token Type**:
   - **Base tokens** (`foreground`, `background`, `border`) for fundamental elements
   - **Semantic tokens** (`primary`, `accent`, `destructive`) for specific meanings
   - **Chart tokens** (`chart-1` to `chart-5`) for data visualization
   - **Card tokens** (`card`, `card-foreground`) for card components
3. **Use Correct Variants**:
   - Primary colors: `bg-primary`, `text-primary-foreground`
   - Muted elements: `text-muted-foreground`, `bg-muted`
   - Interactive states: `hover:bg-accent`, `hover:text-foreground`
   - Borders: `border-border`, `border-input`
4. **Common Patterns**:
   - Success indicators: Use `text-success` or `bg-success` 
   - Warning states: Use `text-warning` or `bg-warning`
   - Error states: Use `text-destructive` or `bg-destructive`  
   - Info states: Use `text-info` or `bg-info`
   - Secondary text: Use `text-muted-foreground`
   - Hover states: Use `hover:bg-accent`
5. **Verify Token Exists**: Ensure the token is actually defined in the design system
6. **Test Theme Support**: Verify it works in both light and dark themes

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

### Component Reuse Priority

**CRITICAL: Always prioritize using existing components from the shared library before creating custom ones.**

- **First priority**: Check `~/shared/components/ui` for design system components
- **Second priority**: Check `~/shared/components` for custom shared components  
- **Only create custom** when existing components don't meet the specific need
- **Extend existing** components using their props and variants system

### Component Discovery Process

Before creating any UI element, follow this process:

1. **Check design system components**: Look in `ui/` folder for available components with barrel exports
2. **Check custom shared components**: Look in components root for project-specific components
3. **Review component API**: Read the component's props, variants, and examples
4. **Use existing variants**: Leverage size, variant, color, and shape props
5. **Extend with className**: Use className prop for custom styling when needed
6. **Create custom only if necessary**: When no existing component fits the use case

### Examples

```tsx
// ✅ PREFERRED - Use design system components (barrel imports)
import { Button, Input, Card } from "~/shared/components/ui";

// ✅ PREFERRED - Use custom shared components (direct imports)
import { ComponentName } from "~/shared/components/component-name";

// Use components with their variant system
<Button variant="ghost" size="sm">
  Action
</Button>

<Input placeholder="Search..." />

// ❌ AVOID - Manual HTML when components exist
<button className="custom-styles">Action</button>
<input className="custom-styles" />
```

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

### Routes vs Modules Organization

**CRITICAL: Understand the distinction between routes (pages) and modules (business logic).**

#### Routes Organization (`app/routes/`)
- **Route folders**: Each route gets its own folder (e.g., `home/`, `tokens/`, `setting/`)
- **Main page file**: `index.tsx` with default export
- **Route-specific components**: Components only used by this specific route
- **Keep routes focused**: Routes should primarily compose and layout, not contain complex business logic

#### Modules Organization (`app/modules/`)
- **Feature-based folders**: Organized by business domain (e.g., `user/`, `tokens/`, `onboarding/`)
- **Single file preference**: Keep related code in single files when possible
- **Folder when needed**: Create subfolders only when feature becomes complex (3+ substantial components, 300+ lines)

### File Structure Examples

```
✅ PREFERRED - Route structure
app/routes/dashboard/
├── index.tsx                    # Main DashboardPage component (default export)
└── dashboard-banner.tsx        # Route-specific component

✅ PREFERRED - Module structure  
app/modules/analytics/
├── metrics-widget.tsx          # Reusable component
├── data-table.tsx             # Reusable component
├── use-analytics.ts           # Custom hook
├── analytics-store.ts         # State management
├── analytics-types.ts         # Types
└── index.ts                   # Barrel exports

❌ AVOID - Mixing concerns
app/routes/dashboard/
├── index.tsx
├── metrics-calculation.ts      # Business logic belongs in modules/
└── data-processing.ts         # Business logic belongs in modules/
```

### Guidelines for Organization

#### When to create route-specific components:
- Component is only used by one specific route
- Component handles route-specific layout or composition
- Component doesn't contain reusable business logic

#### When to create module components:
- Component contains business logic
- Component could be reused by multiple routes
- Component manages its own state or data fetching
- Component represents a distinct business feature

### Naming Conventions
- **Folders**: `kebab-case` (`auth/`, `user-profile/`, `product-list/`)
- **Files**:
  - Store files: `{module}-store.ts` (e.g., `auth-store.ts`, `analytics-store.ts`)
  - Type files: `{module}-types.ts` (e.g., `auth-types.ts`, `analytics-types.ts`)
  - Hook files: `use-{feature}.ts` (e.g., `use-auth.ts`, `use-analytics.ts`)
  - Service files: `{module}.service.ts` (e.g., `auth.service.ts`)
  - Page components: `{feature}-page.tsx` (e.g., `login-page.tsx`)
- **Components**: `PascalCase` (`LoginPage`, `ProductCard`)
- **Functions**: `camelCase` (`useAuth`, `formatDate`, `calculateTotal`)
- **Constants**: `UPPER_SNAKE_CASE` (`API_ENDPOINTS`)

### Import Order (auto-organized by Prettier)
```typescript
// 1. React imports
import { useState, useEffect } from "react";

// 2. External library imports
import { create } from "zustand";

// 3. Module imports (~/modules)
import { useAuth } from "~/modules/auth";
import { useAnalytics } from "~/modules/analytics";

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
const calculateTotal = (amount: number, userTier: UserTier) => {
  // Apply pricing based on user tier and business rules
  const baseFee = userTier === "premium" ? 0.02 : 0.05;
  const volumeDiscount = getVolumeDiscount(amount);
  return amount * (1 + baseFee - volumeDiscount);
};

// ❌ Bad - obvious comment
const user = getUser(); // Get user

// ✅ Good - JSDoc for public API
/**
 * Process data with provided configuration
 * @param config - Processing configuration
 * @returns Promise resolving to processed result
 */
export const processData = async (config: ProcessingConfig) => {
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
  layout("shared/layouts/main-layout.tsx", [
    layout("shared/layouts/dashboard-layout.tsx", [
      index("routes/dashboard/index.tsx"),
      route("/products", "routes/products/index.tsx"),
      route("/analytics", "routes/analytics/index.tsx"),
      route("/reports", "routes/reports/index.tsx"),
    ]),
    
    route("/settings", "routes/settings/index.tsx"),
    route("/profile", "routes/profile/index.tsx"),
  ]),
] satisfies RouteConfig;
```

### Page Components (`app/routes/`)
- **Export as default function**: Each page must export default
- **Import from modules**: Compose functionality by importing from `~/modules/`
- **Page naming**: Use descriptive names like `DashboardPage`, `ProductsPage`, `SettingsPage`
- **File structure**: Each route in its own folder with `index.tsx`
- **Responsibilities**: Layout composition, data fetching coordination, page-level state

### Example Page Component
```typescript
// app/routes/dashboard/index.tsx
import { DataSection, MetricsWidget } from "~/modules/analytics"
import { UserHeader } from "~/modules/user"
import { Container } from "~/shared/components"
import { LocalBanner } from "./local-banner"

export default function DashboardPage() {
  return (
    <Container className="space-y-6">
      <UserHeader />
      <LocalBanner />
      <MetricsWidget />
      <DataSection />
    </Container>
  )
}
```

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

#### For New Routes (Pages)
1. **Create route folder**: `app/routes/new-route/`
2. **Add main page**: `app/routes/new-route/index.tsx` with default export
3. **Add route-specific components** (if needed): `app/routes/new-route/page-banner.tsx`
4. **Update routes configuration**: Add route to `app/routes.ts`
5. **Import functionality from modules**: Use existing or create new modules

#### For New Business Logic (Modules)
1. **Create module folder**: `app/modules/feature-name/`
2. **Add core files**:
   - `feature-store.ts` (if state needed)
   - `feature-types.ts` (if types needed)
   - `use-feature.ts` (if hooks needed)
   - `feature.service.ts` (if API needed)
   - `feature-widget.tsx` (reusable components)
3. **Export everything** in `index.ts`
4. **Import in routes**: Use the new module in relevant route components

#### Decision Guide: Route vs Module
- **Create a route** when you need a new URL/page in the application
- **Create a module** when you need new business logic that can be reused
- **Route components** import and compose from modules
- **Modules** contain the actual business logic and reusable components

### Import Patterns
```typescript
// ✅ Module imports
import { useAuth } from "~/modules/auth";
import { useNotifications } from "~/modules/notifications";
import { useAnalytics } from "~/modules/analytics";

// ✅ Shared UI imports (design system components)
import { Button, Card, Input } from "~/shared/components/ui";

// ✅ Shared custom component imports
import { CustomComponent } from "~/shared/components/custom-component";

// ✅ Shared utilities and hooks
import { useHook } from "~/shared/hooks";
import { cn, utilityFunction } from "~/shared/utils";

// ✅ Type imports
import type { AuthCredentials } from "~/modules/auth";
import type { NotificationSettings } from "~/modules/notifications";
import type { AnalyticsData } from "~/modules/analytics";
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

Remember: This project prioritizes **developer experience**, **maintainability**, and **scalability** through consistent patterns and conventions. The clear separation between routes (pages) and modules (business logic) ensures reusability and maintainability. Use minimal, English-only comments and prefer self-documenting code.

**Most importantly: ALWAYS check the design system files first - NEVER use hardcoded colors!**

## 🎯 ARCHITECTURE REMINDERS

### Routes vs Modules Separation
**ALWAYS maintain clear separation:**

1. **Routes (`app/routes/`)**: Page composition and layout only
   - Import functionality from modules
   - Handle page-level concerns
   - Export default page components
   - Keep business logic minimal

2. **Modules (`app/modules/`)**: Business logic and reusable components
   - Feature-based organization (not route-based)
   - Can be used by multiple routes
   - Contain stores, hooks, services, and components
   - Export everything via barrel exports

3. **Shared (`app/shared/`)**: Truly global utilities and components
   - Used across multiple modules
   - Design system components
   - Global utilities and configuration

### Import Flow
```
Routes → Modules → Shared
```
- Routes import from modules and shared
- Modules import from shared
- Never import routes into modules