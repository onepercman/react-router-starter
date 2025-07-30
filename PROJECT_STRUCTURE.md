# Feature-First React Router Project Structure

This project uses **Feature-First Organization** - a modern, scalable architecture pattern where each feature is self-contained with all related code in a single folder.

## 📁 Directory Structure

```
app/
├── modules/                    # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── auth-store.ts       # Auth state management
│   │   ├── auth-types.ts       # Auth-related types
│   │   ├── use-auth.ts         # Auth custom hook
│   │   ├── auth.service.ts     # Auth API service
│   │   ├── login/              # Login feature (self-contained)
│   │   │   ├── login-page.tsx  # Page component
│   │   │   └── index.ts        # Feature exports
│   │   └── index.ts            # Module exports
│   ├── user/                   # User module
│   │   ├── user-store.ts       # User state management
│   │   ├── user-types.ts       # User-related types
│   │   ├── use-user-profile.ts # User profile hook
│   │   └── index.ts            # Module exports
│   ├── dashboard/              # Dashboard module
│   │   ├── dashboard-overview/ # Dashboard overview feature
│   │   │   ├── dashboard-page.tsx
│   │   │   └── index.ts
│   │   └── index.ts            # Module exports
│   ├── products/               # Products module
│   │   ├── product-list/       # Product list feature
│   │   │   ├── product-list-page.tsx
│   │   │   └── index.ts
│   │   └── index.ts            # Module exports
│   ├── home/                   # Home module
│   │   ├── home-page/          # Home page feature
│   │   │   ├── home-page.tsx
│   │   │   └── index.ts
│   │   └── index.ts            # Module exports
│   └── index.ts                # Main modules exports
├── shared/                     # Shared resources (global only)
│   ├── components/             # Shared UI components
│   │   ├── button.tsx          # Button component
│   │   ├── card.tsx            # Card component
│   │   ├── input.tsx           # Input component
│   │   ├── page-header.tsx     # Page header component
│   │   ├── error-boundary.tsx  # Error boundary component
│   │   ├── auth-status.tsx     # Auth status component

│   │   └── index.ts            # Barrel exports
│   ├── layouts/                # Layout components
│   │   └── main-layout.tsx     # Main layout
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
│   └── stores/                 # Global stores only (empty now)
│       └── index.ts            # Global stores exports
├── routes.ts                   # Central route configuration
├── root.tsx                    # Root component
└── app.css                     # Global styles
```

## 🏗️ Feature-First Architecture

### **Key Principle: Feature Cohesion**

Each feature contains **ALL** related code in a single folder:

```
auth/                           # ← One module, all auth-related code
├── auth-store.ts               # Auth state management
├── auth-types.ts               # Auth-related types
├── use-auth.ts                 # Auth custom hook
├── auth.service.ts             # Auth API service
├── login/                      # Login sub-feature
│   ├── login-page.tsx          # Page component
│   └── index.ts                # Sub-feature exports
└── index.ts                    # Module exports
```

### **Module Structure Pattern:**

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

### **Benefits of Feature-First:**

1. **🎯 High Cohesion**: All related code is together
2. **⚡ Easy Development**: No context switching between folders
3. **🗑️ Easy Cleanup**: Delete feature = delete folder
4. **📦 Self-Contained**: Features can be moved/extracted easily
5. **🧠 Simple Mental Model**: 1 feature = 1 folder
6. **🔒 Encapsulation**: Feature logic is isolated and reusable

### **Shared vs Feature-Specific Code:**

```typescript
// ✅ Feature-specific (stays in feature folder)
auth/auth-store.ts              ← Only used by auth
auth/use-auth.ts                ← Only used by auth
auth/auth-types.ts              ← Only used by auth

// ✅ Shared across features (goes to shared/)
shared/hooks/use-local-storage.ts     ← Used by multiple features
shared/components/button.tsx          ← Used by multiple features
shared/utils/cn.ts                    ← Used by multiple features

// ❌ Avoid mixing feature code in shared
shared/stores/auth-store.ts           ← Moved to auth module
shared/hooks/use-auth.ts              ← Moved to auth module
shared/types/auth-types.ts            ← Moved to auth module
```

## 🎯 Naming Conventions

### **Module Folders**
- Use **kebab-case**: `auth/`, `user-profile/`, `product-list/`
- Be specific: `dashboard-overview/` not just `dashboard/`
- Include main action: `product-create/`, `user-edit/`, `order-detail/`

### **Files Within Modules**
- **Store files**: `{module}-store.ts` (e.g., `auth-store.ts`, `user-store.ts`)
- **Type files**: `{module}-types.ts` (e.g., `auth-types.ts`, `user-types.ts`)
- **Hook files**: `use-{feature}.ts` (e.g., `use-auth.ts`, `use-user-profile.ts`)
- **Service files**: `{module}.service.ts` (e.g., `auth.service.ts`)
- **Page components**: `{feature}-page.tsx` (e.g., `login-page.tsx`)

### **Import Patterns**

```typescript
// ✅ Feature-specific imports
import { useAuth } from '~/modules/auth';
import { useUserProfile } from '~/modules/user';

// ✅ Shared imports
import { Button } from '~/shared/components';
import { useLocalStorage } from '~/shared/hooks';
import { cn } from '~/shared/utils';

// ✅ Type imports
import type { AuthCredentials } from '~/modules/auth';
import type { UserProfile } from '~/modules/user';
```

## 📦 Module Organization

### **Auth Module (`~/modules/auth`)**
```typescript
// State management
export { useAuthStore } from './auth-store';

// Custom hooks
export { useAuth } from './use-auth';

// Types
export type { User, AuthCredentials, AuthResponse } from './auth-types';

// Services
export { authService } from './auth.service';
```

### **User Module (`~/modules/user`)**
```typescript
// State management
export { useUserStore } from './user-store';

// Custom hooks
export { useUserProfile } from './use-user-profile';

// Types
export type { UserProfile, UserPreferences } from './user-types';
```





## 🔄 Migration from Shared to Modules

### **What Was Moved:**

1. **Auth-related code** → `~/modules/auth/`
   - `shared/stores/auth-store.ts` → `modules/auth/auth-store.ts`
   - `shared/hooks/use-auth.ts` → `modules/auth/use-auth.ts`
   - `shared/types/auth-types.ts` → `modules/auth/auth-types.ts`

2. **User-related code** → `~/modules/user/`
   - `shared/stores/user-store.ts` → `modules/user/user-store.ts`
   - `shared/hooks/use-user-profile.ts` → `modules/user/use-user-profile.ts`
   - `shared/types/user-types.ts` → `modules/user/user-types.ts`



### **What Remains in Shared:**

- **Components**: UI components used across multiple features
- **Layouts**: Layout components
- **Utils**: Utility functions (formatting, class names, etc.)
- **API**: HTTP client and API configuration
- **Config**: Environment and app configuration
- **Constants**: App-wide constants
- **Global hooks**: `use-local-storage.ts` (used by multiple features)
- **Global types**: `common-types.ts` (used by multiple features)

## 🚀 Best Practices

### **Creating New Features:**

1. **Create module folder**: `app/modules/new-feature/`
2. **Add core files**:
   - `new-feature-store.ts` (if state needed)
   - `new-feature-types.ts` (if types needed)
   - `use-new-feature.ts` (if hooks needed)
   - `new-feature.service.ts` (if API needed)
3. **Add sub-features** (if needed): `app/modules/new-feature/sub-feature/`
4. **Export everything** in `index.ts`
5. **Update main modules index**: `app/modules/index.ts`

### **When to Use Modules vs Shared:**

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

### **Import Organization:**

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. External library imports
import { create } from 'zustand';

// 3. Module imports (~/modules)
import { useAuth } from '~/modules/auth';
import { useUserProfile } from '~/modules/user';

// 4. Shared imports (~/shared)
import { Button } from '~/shared/components';
import { cn } from '~/shared/utils';

// 5. Type imports
import type { AuthCredentials } from '~/modules/auth';
```

This architecture provides a clean, scalable, and maintainable codebase where each feature is self-contained and the shared folder only contains truly global utilities and components.
