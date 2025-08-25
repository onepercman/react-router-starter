# React Router Starter

A modern React application built with React Router, TypeScript, and Zustand for state management using **Routes & Modules Architecture**.

## Features

- ⚡ **React Router v7** - File-based routing with type safety
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach

- 🔒 **Authentication** - Complete auth system with Zustand
- 📊 **State Management** - Zustand for predictable state management
- 🏗️ **Routes & Modules Architecture** - Clear separation between pages and business logic
- 🛠️ **TypeScript** - Full type safety
- 🎯 **ESLint & Prettier** - Code quality and formatting

## Architecture

This project uses **Routes & Modules Architecture** with clear separation between routes (pages) and modules (business logic). Routes compose UI by importing functionality from feature-based modules.

### Routes & Modules Structure

```
app/
├── routes/                 # Page components
│   ├── dashboard/          # Dashboard route
│   │   ├── index.tsx       # Main page component (default export)
│   │   └── banner.tsx      # Route-specific component
│   ├── products/           # Products route
│   │   └── index.tsx       # Products page
│   └── settings/           # Settings route
│       └── index.tsx       # Settings page
├── modules/                # Business logic modules
│   ├── auth/               # Authentication module
│   │   ├── auth-store.ts   # Auth state management
│   │   ├── auth-types.ts   # Auth-related types
│   │   ├── use-auth.ts     # Auth custom hook
│   │   └── index.ts        # Module exports
│   ├── analytics/          # Analytics module
│   │   ├── data-widget.tsx # Reusable component
│   │   ├── use-analytics.ts # Custom hook
│   │   └── index.ts        # Module exports
│   └── index.ts            # Main modules exports
└── shared/                 # Shared utilities and components
```

## State Management

This project uses **Zustand v5** for state management with feature-specific stores:

### Auth Module (`~/modules/auth`)
- **`useAuthStore`** - User authentication (login/register/logout)
- **`useAuth`** - Enhanced auth functionality with auto-refresh
- Token management with automatic refresh
- Persistent storage with localStorage
- Error handling and loading states

### Analytics Module (`~/modules/analytics`)
- **`useAnalyticsStore`** - Analytics data management
- **`useAnalytics`** - Analytics functionality hook
- Data fetching and caching
- Real-time updates and filtering

### Custom Hooks
- `useAuth()` - Enhanced auth functionality
- `useAnalytics()` - Analytics data management

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
├── routes/                     # Page components
│   ├── dashboard/              # Dashboard route
│   │   ├── index.tsx           # Main page component (default export)
│   │   └── banner.tsx          # Route-specific component
│   ├── products/               # Products route
│   │   └── index.tsx           # Products page
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
│   │   └── index.ts            # Module exports
│   ├── products/               # Products module
│   │   ├── product-card.tsx    # Reusable component
│   │   ├── use-products.ts     # Custom hook
│   │   └── index.ts            # Module exports
│   └── index.ts                # Main modules exports
├── shared/                     # Shared resources (global only)
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # Design system components (shadcn)
│   │   └── custom-components   # Custom shared components
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

### Module Imports
```typescript
// Import from business logic modules
import { useAuth } from '~/modules/auth';
import { useAnalytics } from '~/modules/analytics';
import { DataWidget } from '~/modules/analytics';

// Import types
import type { AuthCredentials } from '~/modules/auth';
import type { AnalyticsData } from '~/modules/analytics';
```

### Shared Imports
```typescript
// Import design system components (barrel exports)
import { Button, Card } from '~/shared/components/ui';

// Import custom shared components (direct imports)
import { CustomComponent } from '~/shared/components/custom-component';

// Import utilities and hooks
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

### When to Use Routes vs Modules vs Shared

```typescript
// ✅ Routes (page components)
- Page layout and composition
- Route-specific components
- Import and compose from modules
- Handle page-level concerns

// ✅ Modules (business logic)
- State management for the feature
- Custom hooks for the feature
- Business logic and data processing
- Reusable components with logic
- API services for the feature

// ✅ Shared (global utilities)
- UI components used across modules
- Utility functions used across modules
- Global state management
- Layout components
- API client and configuration
```

## Contributing

1. Follow the routes & modules architecture
2. Keep business logic in modules, pages in routes
3. Use TypeScript for all new code
4. Follow the established naming conventions
5. Write descriptive commit messages

## License

MIT License - see LICENSE file for details.
