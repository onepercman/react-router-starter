# Feature-First React Router Project Structure

This project uses **Feature-First Organization** - a modern, scalable architecture pattern where each feature is self-contained with all related code in a single folder.

## 📁 Directory Structure

```
app/
├── modules/                    # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── login/              # Login feature (self-contained)
│   │   │   ├── login-page.tsx  # Page component
│   │   │   └── index.ts        # Feature exports
│   │   ├── routes.ts           # Auth routes
│   │   └── index.ts            # Module exports
│   ├── dashboard/              # Dashboard module
│   │   ├── dashboard-overview/ # Dashboard overview feature
│   │   │   ├── dashboard-page.tsx
│   │   │   └── index.ts
│   │   ├── routes.ts           # Dashboard routes
│   │   └── index.ts            # Module exports
│   └── products/               # Products module
│       ├── product-list/       # Product list feature
│       │   ├── product-list-page.tsx
│       │   └── index.ts
│       ├── routes.ts           # Product routes
│       └── index.ts            # Module exports
├── shared/                     # Shared resources
│   ├── components/             # Shared UI components
│   │   ├── ui-button.tsx       # Button component
│   │   ├── ui-card.tsx         # Card component
│   │   ├── page-header.tsx     # Page header component
│   │   ├── error-boundary.tsx  # Error boundary component
│   │   └── index.ts            # Barrel exports
│   ├── layouts/                # Layout components
│   │   └── main-layout.tsx     # Main layout
│   ├── hooks/                  # Shared custom hooks
│   │   └── use-local-storage.ts # Local storage hook
│   ├── types/                  # Shared type definitions
│   │   └── common-types.ts     # Common types
│   ├── utils/                  # Shared utility functions
│   │   └── format-utils.ts     # Formatting utilities
│   ├── api/                    # API layer
│   │   └── base-client.ts      # HTTP client
│   ├── config/                 # Configuration
│   │   └── environment.ts      # Environment config
│   └── constants/              # Shared constants
│       └── app-constants.ts    # App constants
├── routes.ts                   # Central route configuration
├── root.tsx                    # Root component
└── app.css                     # Global styles
```

## 🏗️ Feature-First Architecture

### **Key Principle: Feature Cohesion**

Each feature contains **ALL** related code in a single folder:

```
product-list/                   # ← One feature, one folder
├── product-list-page.tsx       # Main page component
├── product-card.tsx            # Sub-components
├── product-filters.tsx         # Feature-specific components
├── use-product-list.ts         # Feature-specific hooks
├── product-list-utils.ts       # Feature-specific utilities
├── product-list-types.ts       # Feature-specific types
└── index.ts                    # Clean exports
```

### **Benefits of Feature-First:**

1. **🎯 High Cohesion**: All related code is together
2. **⚡ Easy Development**: No context switching between folders
3. **🗑️ Easy Cleanup**: Delete feature = delete folder
4. **📦 Self-Contained**: Features can be moved/extracted easily
5. **🧠 Simple Mental Model**: 1 feature = 1 folder

### **Shared vs Feature-Specific Code:**

```typescript
// ✅ Feature-specific (stays in feature folder)
product-list/use-product-list.ts      ← Only used by product list

// ✅ Shared across features (goes to shared/)
shared/hooks/use-local-storage.ts     ← Used by multiple features

// ✅ Module-specific shared code (optional)
products/_shared/product-api.ts       ← Shared within products module
```

## 🎯 Naming Conventions

### **Feature Folders**
- Use **kebab-case**: `product-list/`, `user-profile/`, `order-history/`
- Be specific: `dashboard-overview/` not just `dashboard/`
- Include main action: `product-create/`, `user-edit/`, `order-detail/`

### **Files Within Features**
- **Prefix with feature name**: `product-list-page.tsx`, `product-list-utils.ts`
- **Clear component hierarchy**: `product-list-card.tsx`, `product-list-filters.tsx`
- **Consistent suffixes**: `-page.tsx`, `-types.ts`, `-utils.ts`, `-hooks.ts`

### **Components and Functions**
- **PascalCase** for components: `ProductListPage`, `ProductCard`
- **camelCase** for functions: `useProductList`, `formatProductPrice`
- **UPPER_SNAKE_CASE** for constants: `DEFAULT_PAGE_SIZE`, `API_ENDPOINTS`

## 🚀 Usage Guide

### **Adding a New Feature**

```bash
# 1. Create feature folder
mkdir app/modules/{module}/{feature-name}/

# 2. Create feature files
touch app/modules/{module}/{feature-name}/{feature-name}-page.tsx
touch app/modules/{module}/{feature-name}/index.ts

# 3. Export from index.ts
echo "export { FeaturePage } from './{feature-name}-page';" > index.ts

# 4. Update module routes if needed
```

### **Adding Sub-Features (Nested)**

```bash
# Example: Product filters as sub-feature
mkdir app/modules/products/product-list/filters/
# filters/price-filter.tsx, filters/category-filter.tsx, etc.
```

### **Feature Development Pattern**

```typescript
// 1. Start with page component
export function ProductListPage() {
  return <div>Product List</div>;
}

// 2. Add feature-specific components
export function ProductCard() { /* ... */ }
export function ProductFilters() { /* ... */ }

// 3. Add feature-specific hooks
export function useProductList() { /* ... */ }

// 4. Add feature-specific utils/types as needed
export function formatProductPrice() { /* ... */ }
export type ProductFilters = { /* ... */ };

// 5. Clean exports via index.ts
// index.ts
export { ProductListPage } from './product-list-page';
export { useProductList } from './use-product-list';
export type { ProductFilters } from './product-list-types';
```

## 🔄 Route Organization

### **Modular Routes Pattern**

```typescript
// app/routes.ts - Central configuration
import { authRoutes } from "./modules/auth/routes";
import { dashboardRoutes } from "./modules/dashboard/routes";
import { productRoutes } from "./modules/products/routes";

export default [
  ...dashboardRoutes,    // / routes
  ...productRoutes,      // /products routes  
  ...authRoutes,         // /auth routes
] satisfies RouteConfig;

// app/modules/auth/routes.ts - Module routes
import { route } from "@react-router/dev/routes";

export const authRoutes = [
  route("/auth/login", "modules/auth/login/login-page.tsx"),
  // Future features:
  // route("/auth/register", "modules/auth/register/register-page.tsx"),
  // route("/auth/forgot-password", "modules/auth/forgot-password/forgot-password-page.tsx"),
];
```

## 📦 Import Patterns

### **Clean Imports with Index Files**

```typescript
// ✅ Feature-level imports
import { ProductListPage } from '~/modules/products/product-list';
import { LoginPage } from '~/modules/auth/login';

// ✅ Module-level imports (via module index.ts)
import { ProductListPage } from '~/modules/products';
import { LoginPage } from '~/modules/auth';

// ✅ Shared imports
import { UiButton, UiCard } from '~/shared/components';
import { useLocalStorage } from '~/shared/hooks';
```

### **Path Aliases**

- `~/` → `./app/` (application root)
- Clean, absolute imports instead of relative paths
- Easy refactoring and moving files

## 🎨 Styling Strategy

- **Tailwind CSS** for utility-first styling
- **Component-level styles** when needed
- **Responsive design** with mobile-first approach
- **Design system** via shared components

## 🔍 Code Quality

### **ESLint + Prettier Configuration**
- TypeScript-aware linting
- Auto-sort imports by category
- Remove unused imports automatically
- Senior-friendly (not overly strict)

### **Import Organization**
```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. External library imports  
import { format } from 'date-fns';

// 3. Internal imports (~/shared, ~/modules)
import { UiButton } from '~/shared/components';
import { useProductList } from './use-product-list';

// 4. Type imports (separate)
import type { Product } from './product-list-types';
```

## 📝 Best Practices

### **Feature Organization**
1. **Start Simple**: Begin with page component, add complexity as needed
2. **Keep Related Code Together**: All feature code in one folder
3. **Use Clear Names**: Feature names should be self-explanatory
4. **Export Cleanly**: Use index.ts for clean imports

### **Shared Code Strategy**
1. **Promote When Needed**: Move to shared/ when used by 2+ features
2. **Module Shared**: Use `_shared/` folder for module-specific shared code
3. **Clear Boundaries**: Shared code should have clear, stable APIs

### **Scaling Strategy**
1. **Small Projects**: Keep flat feature structure
2. **Medium Projects**: Add sub-features as nested folders
3. **Large Projects**: Consider module federation or micro-frontends

## 🛠️ Development Workflow

### **Package Manager**
This project uses **pnpm** for faster installations and better disk space efficiency.

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Code quality
pnpm lint
pnpm format
```

### **Environment Setup**
```bash
# Copy example environment
cp .env.example .env

# Configure your specific settings
# Edit .env with your API URLs, feature flags, etc.
```

## 🌟 Scaling Examples

### **Small Feature** (1-2 files)
```
login/
├── login-page.tsx
└── index.ts
```

### **Medium Feature** (3-5 files)
```
product-list/
├── product-list-page.tsx
├── product-card.tsx
├── use-product-list.ts
├── product-list-types.ts
└── index.ts
```

### **Large Feature** (6+ files with sub-features)
```
e-commerce/
├── shopping-cart/
│   ├── cart-page.tsx
│   ├── cart-item.tsx
│   ├── cart-summary.tsx
│   ├── use-shopping-cart.ts
│   └── index.ts
├── checkout/
│   ├── checkout-page.tsx
│   ├── payment-form.tsx
│   ├── shipping-form.tsx
│   └── index.ts
└── _shared/
    ├── ecommerce-api.ts
    └── ecommerce-types.ts
```

## 🎯 Migration from Type-Based Structure

If migrating from traditional structure:

```bash
# Old structure
modules/auth/
├── components/
├── pages/
├── hooks/
├── types/
└── utils/

# New structure  
modules/auth/
├── login/
│   ├── login-page.tsx
│   ├── login-form.tsx
│   ├── use-login.ts
│   └── index.ts
└── register/
    ├── register-page.tsx
    └── index.ts
```

**Migration Benefits:**
- ✅ Reduced cognitive load
- ✅ Faster feature development  
- ✅ Easier maintenance
- ✅ Better code organization
- ✅ Clear ownership boundaries

---

**🚀 This Feature-First structure scales from small projects to enterprise applications while maintaining simplicity and developer happiness!**
