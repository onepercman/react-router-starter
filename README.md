# React Router Starter

A modern React application built with React Router, TypeScript, and Zustand for state management using a **Feature-First Architecture**.

## Features

- ⚡ **React Router v7** - File-based routing with type safety
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach

- 🔒 **Authentication** - Complete auth system with Zustand
- 📊 **State Management** - Zustand for predictable state management
- 🏗️ **Feature-First Architecture** - Self-contained feature modules
- 🛠️ **TypeScript** - Full type safety
- 🎯 **ESLint & Prettier** - Code quality and formatting

## Architecture

This project uses **Feature-First Organization** where each feature is self-contained with all related code (components, hooks, types, stores, services) in a single folder.

### Module Structure

```
app/modules/
├── auth/                   # Authentication module
│   ├── auth-store.ts       # Auth state management
│   ├── auth-types.ts       # Auth-related types
│   ├── use-auth.ts         # Auth custom hook
│   ├── auth.service.ts     # Auth API service
│   ├── login/              # Login sub-feature
│   └── index.ts            # Module exports
├── user/                   # User module
│   ├── user-store.ts       # User state management
│   ├── user-types.ts       # User-related types
│   ├── use-user-profile.ts # User profile hook
│   └── index.ts            # Module exports

└── index.ts                # Main modules exports
```

## State Management

This project uses **Zustand v5** for state management with feature-specific stores:

### Auth Module (`~/modules/auth`)
- **`useAuthStore`** - User authentication (login/register/logout)
- **`useAuth`** - Enhanced auth functionality with auto-refresh
- Token management with automatic refresh
- Persistent storage with localStorage
- Error handling and loading states

### User Module (`~/modules/user`)
- **`useUserStore`** - User profile management
- **`useUserProfile`** - User profile management hook
- Preferences and settings
- Profile updates and customization



### Custom Hooks
- `useAuth()` - Enhanced auth functionality
- `useUserProfile()` - User profile management

## Demo Credentials

For testing the authentication system:
- **Email**: test@example.com
- **Password**: password

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-router-starter

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm typecheck    # Run TypeScript checks
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm check        # Run all checks (typecheck + lint + format)
pnpm fix          # Auto-fix linting and formatting issues
```

## Project Structure

```
app/
├── modules/                    # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── auth-store.ts       # Auth state management
│   │   ├── auth-types.ts       # Auth-related types
│   │   ├── use-auth.ts         # Auth custom hook
│   │   ├── auth.service.ts     # Auth API service
│   │   ├── login/              # Login sub-feature
│   │   └── index.ts            # Module exports
│   ├── user/                   # User module
│   │   ├── user-store.ts       # User state management
│   │   ├── user-types.ts       # User-related types
│   │   ├── use-user-profile.ts # User profile hook
│   │   └── index.ts            # Module exports
│   ├── dashboard/              # Dashboard module
│   ├── products/               # Products module
│   ├── home/                   # Home module
│   └── index.ts                # Main modules exports
├── shared/                     # Shared resources (global only)
│   ├── components/             # Shared UI components
│   ├── layouts/                # Layout components
│   ├── hooks/                  # Global hooks only
│   ├── types/                  # Global types only
│   ├── utils/                  # Utility functions
│   ├── api/                    # API layer
│   ├── config/                 # Configuration
│   ├── constants/              # Shared constants
│   └── stores/                 # Global stores only
├── root.tsx                    # Root component
└── routes.ts                   # Route definitions
```

## Import Patterns

### Feature-Specific Imports
```typescript
// Import from specific modules
import { useAuth } from '~/modules/auth';
import { useUserProfile } from '~/modules/user';

// Import types
import type { AuthCredentials } from '~/modules/auth';
import type { UserProfile } from '~/modules/user';
```

### Shared Imports
```typescript
// Import shared components and utilities
import { Button } from '~/shared/components';
import { useLocalStorage } from '~/shared/hooks';
import { cn } from '~/shared/utils';
```



## Store Architecture

### Auth Store Features
- **Persistent Authentication**: Auto-saves auth state to localStorage
- **Token Refresh**: Automatic token refresh on expiration
- **Error Handling**: Comprehensive error states and messaging
- **API Integration**: Seamless integration with API client

### User Store Features
- **Profile Management**: Complete user profile CRUD operations
- **Preferences**: User preferences and settings
- **Real-time Updates**: Immediate UI updates on profile changes



## Development Guidelines

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

## Contributing

1. Follow the feature-first architecture
2. Keep features self-contained
3. Use TypeScript for all new code
4. Follow the established naming conventions
5. Write descriptive commit messages

## License

MIT License - see LICENSE file for details.
