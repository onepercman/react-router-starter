# Routes & Modules React Router Project Structure

This project uses **Routes & Modules Architecture** - a modern, scalable architecture pattern with clear separation between routes (pages) and modules (business logic).

## 📁 Directory Structure

```
app/
├── routes/                     # Page components
│   ├── dashboard/              # Dashboard route
│   │   ├── index.tsx           # Main page component (default export)
│   │   └── local-banner.tsx    # Route-specific component
│   ├── products/               # Products route
│   │   ├── index.tsx           # Products page
│   │   └── product-filters.tsx # Route-specific component
│   ├── analytics/              # Analytics route
│   │   └── index.tsx           # Analytics page
│   └── settings/               # Settings route
│       └── index.tsx           # Settings page
├── modules/                    # Business logic modules
│   ├── auth/                   # Authentication module
│   │   ├── auth-store.ts       # Auth state management
│   │   ├── auth-types.ts       # Auth-related types
│   │   ├── use-auth.ts         # Auth custom hook
│   │   ├── auth.service.ts     # Auth API service
│   │   └── index.ts            # Module exports
│   ├── analytics/              # Analytics module
│   │   ├── data-widget.tsx     # Reusable component
│   │   ├── metrics-chart.tsx   # Reusable component
│   │   ├── use-analytics.ts    # Custom hook
│   │   ├── analytics-store.ts  # State management
│   │   ├── analytics-types.ts  # Types
│   │   └── index.ts            # Module exports
│   ├── products/               # Products module
│   │   ├── product-card.tsx    # Reusable component
│   │   ├── product-list.tsx    # Reusable component
│   │   ├── use-products.ts     # Custom hook
│   │   ├── products-store.ts   # State management
│   │   └── index.ts            # Module exports
│   └── index.ts                # Main modules exports
├── shared/                     # Shared resources (global only)
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # Design system components (shadcn)
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── card.tsx        # Card component
│   │   │   ├── input.tsx       # Input component
│   │   │   └── index.ts        # Barrel exports
│   │   ├── auth-status.tsx     # Custom component (direct import)
│   │   └── theme-toggle.tsx    # Custom component (direct import)
│   ├── layouts/                # Layout components
│   │   ├── main-layout.tsx     # Main layout
│   │   └── dashboard-layout.tsx # Dashboard layout
│   ├── hooks/                  # Global hooks only
│   │   ├── use-local-storage.ts # Local storage hook
│   │   └── index.ts            # Global hooks exports
│   ├── types/                  # Global types only
│   │   ├── common-types.ts     # Common types
│   │   └── index.ts            # Global types exports
│   ├── utils/                  # Shared utility functions
│   │   ├── cn.ts               # Class name utility
│   │   ├── format-utils.ts     # Formatting utilities
│   │   └── index.ts            # Utils exports
│   ├── api/                    # API layer
│   │   └── base-client.ts      # HTTP client
│   ├── config/                 # Configuration
│   │   ├── environment.ts      # Environment config
│   │   └── react-query-config.ts # React Query config
│   ├── constants/              # Shared constants
│   │   └── app-constants.ts    # App constants
│   └── stores/                 # Global stores only
│       └── index.ts            # Global stores exports
├── routes.ts                   # Central route configuration
├── root.tsx                    # Root component
└── app.css                     # Global styles
```

## 🏗️ Routes & Modules Architecture

### **Key Principle: Separation of Concerns**

Clear separation between presentation (routes) and business logic (modules):

```
Routes (app/routes/)            # ← Page composition and layout
├── dashboard/
│   ├── index.tsx               # Imports from modules, composes UI
│   └── local-banner.tsx        # Route-specific components only

Modules (app/modules/)          # ← Business logic and reusable components  
├── analytics/
│   ├── data-widget.tsx         # Reusable business components
│   ├── use-analytics.ts        # Business logic hooks
│   ├── analytics-store.ts      # State management
│   └── index.ts                # Clean exports
```

### **Route Structure Pattern:**

```
route-name/
├── index.tsx                   # Main page component (default export)
├── route-banner.tsx            # Route-specific components
└── other-sections.tsx          # Components only used by this route
```

### **Module Structure Pattern:**

```
module-name/
├── module-store.ts             # State management (Zustand)
├── module-types.ts             # TypeScript types
├── use-module.ts               # Custom hooks
├── module.service.ts           # API services (if needed)
├── reusable-component.tsx      # Reusable components
├── business-widget.tsx         # Business logic components
└── index.ts                    # Barrel exports
```

### **Benefits of Routes & Modules:**

1. **🎯 Clear Separation**: Pages vs business logic are clearly separated
2. **♻️ Reusability**: Modules can be used across multiple routes
3. **🧠 Simple Mental Model**: Routes compose, modules provide functionality
4. **📦 Self-Contained**: Each module contains all related business logic
5. **🔒 Maintainability**: Easy to locate and modify functionality
6. **⚡ Team Collaboration**: Clear ownership boundaries

### **Routes vs Modules vs Shared Code:**

```typescript
// ✅ Routes (page composition)
routes/dashboard/index.tsx      ← Composes UI from modules
routes/products/index.tsx       ← Imports and layouts components

// ✅ Modules (business logic)
modules/analytics/data-widget.tsx     ← Can be used by multiple routes
modules/products/product-card.tsx     ← Reusable business component
modules/auth/use-auth.ts              ← Business logic hook

// ✅ Shared (global utilities)
shared/components/button.tsx          ← Used across modules
shared/utils/format-date.ts           ← Used across modules
shared/hooks/use-local-storage.ts     ← Used across modules

// ❌ Avoid mixing concerns
routes/dashboard/business-logic.ts    ← Business logic belongs in modules
modules/analytics/page-layout.tsx     ← Page layout belongs in routes
```

## 🎯 Naming Conventions

### **Route Folders**
- Use **kebab-case**: `dashboard/`, `products/`, `user-settings/`
- Each route folder contains `index.tsx` with default export
- Route-specific components use descriptive names

### **Module Folders**
- Use **kebab-case**: `auth/`, `analytics/`, `notifications/`
- Organized by business domain, not by route
- Can be used by multiple routes

### **Files Within Modules**
- **Store files**: `{module}-store.ts` (e.g., `auth-store.ts`, `analytics-store.ts`)
- **Type files**: `{module}-types.ts` (e.g., `auth-types.ts`, `analytics-types.ts`)
- **Hook files**: `use-{feature}.ts` (e.g., `use-auth.ts`, `use-analytics.ts`)
- **Service files**: `{module}.service.ts` (e.g., `auth.service.ts`)
- **Component files**: `{feature}-{type}.tsx` (e.g., `data-widget.tsx`, `metrics-chart.tsx`)

### **Import Patterns**

```typescript
// ✅ Route imports (compose from modules)
import { DataWidget, MetricsChart } from '~/modules/analytics';
import { UserHeader } from '~/modules/auth';
import { Container } from '~/shared/components';

// ✅ Module imports (business logic)
import { useAuth } from '~/modules/auth';
import { useAnalytics } from '~/modules/analytics';

// ✅ Shared imports (design system components)
import { Button, Card } from '~/shared/components/ui';
import { CustomComponent } from '~/shared/components/custom-component';
import { cn, formatDate } from '~/shared/utils';

// ✅ Type imports
import type { AuthCredentials } from '~/modules/auth';
import type { AnalyticsData } from '~/modules/analytics';
```

## 📦 Module Organization

### **Auth Module (`~/modules/auth`)**
```typescript
// State management
export { useAuthStore } from './auth-store';

// Custom hooks
export { useAuth } from './use-auth';

// Components
export { LoginForm, UserHeader } from './auth-components';

// Types
export type { User, AuthCredentials, AuthResponse } from './auth-types';

// Services
export { authService } from './auth.service';
```

### **Analytics Module (`~/modules/analytics`)**
```typescript
// State management
export { useAnalyticsStore } from './analytics-store';

// Custom hooks
export { useAnalytics } from './use-analytics';

// Components
export { DataWidget, MetricsChart } from './analytics-components';

// Types
export type { AnalyticsData, MetricsConfig } from './analytics-types';
```

## 🔄 Import Flow

### **Clear Import Hierarchy**

```
Routes → Modules → Shared
```

- **Routes** import from modules and shared
- **Modules** import from shared
- **Never** import routes into modules

### **Example Page Component**

```typescript
// app/routes/dashboard/index.tsx
import { DataWidget, MetricsChart } from "~/modules/analytics"
import { UserHeader } from "~/modules/auth"
import { Container } from "~/shared/components"
import { LocalBanner } from "./local-banner"

export default function DashboardPage() {
  return (
    <Container className="space-y-6">
      <UserHeader />
      <LocalBanner />
      <MetricsChart />
      <DataWidget />
    </Container>
  )
}
```

## 🚀 Best Practices

### **Creating New Routes:**

1. **Create route folder**: `app/routes/new-route/`
2. **Add main page**: `app/routes/new-route/index.tsx` with default export
3. **Add route-specific components** (if needed): `app/routes/new-route/banner.tsx`
4. **Update routes configuration**: Add route to `app/routes.ts`
5. **Import functionality from modules**: Use existing or create new modules

### **Creating New Modules:**

1. **Create module folder**: `app/modules/feature-name/`
2. **Add core files**:
   - `feature-store.ts` (if state needed)
   - `feature-types.ts` (if types needed)
   - `use-feature.ts` (if hooks needed)
   - `feature.service.ts` (if API needed)
   - `feature-widget.tsx` (reusable components)
3. **Export everything** in `index.ts`
4. **Import in routes**: Use the new module in relevant route components

### **Decision Guide: Route vs Module**

```typescript
// Create a ROUTE when:
- You need a new URL/page in the application
- You need page-specific layout or composition
- You're creating a new user-facing page

// Create a MODULE when:
- You need new business logic that can be reused
- You're building functionality that multiple pages might use
- You're creating domain-specific features (auth, analytics, etc.)

// Create in SHARED when:
- You're building truly global utilities
- You're creating UI components used across modules
- You're adding configuration or constants used everywhere
```

### **Import Organization:**

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. External library imports
import { create } from 'zustand';

// 3. Module imports (~/modules)
import { useAuth } from '~/modules/auth';
import { useAnalytics } from '~/modules/analytics';

// 4. Shared imports (~/shared)
import { Button, Container } from '~/shared/components/ui';
import { CustomComponent } from '~/shared/components/custom-component';
import { cn, formatDate } from '~/shared/utils';

// 5. Type imports
import type { AuthCredentials } from '~/modules/auth';
```

## 🎯 Architecture Benefits

### **1. Clear Separation of Concerns**
- Routes handle page composition and layout
- Modules handle business logic and reusable functionality
- Shared contains truly global utilities

### **2. Reusability**
- Modules can be used across multiple routes
- Business logic is not tied to specific pages
- Easy to extract and move functionality

### **3. Maintainability**
- Clear ownership boundaries between routes and modules
- Easy to locate functionality (business logic in modules, pages in routes)
- Scalable architecture that grows with your application

### **4. Team Collaboration**
- Teams can work on different routes without conflicts
- Module ownership enables parallel development
- Clear patterns for adding new functionality

This architecture provides a clean, scalable, and maintainable codebase where routes focus on page composition and modules contain reusable business logic.