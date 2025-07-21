# Modular React Router Project Structure

This project is organized using modular architecture, divided by functionality for easy scaling and maintenance.

## 📁 Directory Structure

```
app/
├── modules/                    # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── components/         # Auth-specific components
│   │   ├── pages/              # Auth module pages
│   │   │   └── login-page.tsx  # Login page
│   │   ├── hooks/              # Custom hooks for auth
│   │   ├── types/              # Type definitions for auth
│   │   └── utils/              # Utilities for auth
│   ├── dashboard/              # Dashboard module
│   │   ├── components/         # Dashboard-specific components
│   │   ├── pages/              # Dashboard module pages
│   │   │   └── dashboard-page.tsx # Main dashboard page
│   │   ├── hooks/              # Custom hooks for dashboard
│   │   ├── types/              # Type definitions for dashboard
│   │   └── utils/              # Utilities for dashboard
│   └── products/               # Products module
│       ├── components/         # Product-specific components
│       ├── pages/              # Product module pages
│       │   └── product-list-page.tsx # Product list page
│       ├── hooks/              # Custom hooks for products
│       ├── types/              # Type definitions for products
│       └── utils/              # Utilities for products
├── shared/                     # Shared resources
│   ├── components/             # Shared UI components
│   │   ├── ui-button.tsx       # Button component
│   │   ├── ui-card.tsx         # Card component
│   │   ├── page-header.tsx     # Page header component
│   │   └── index.ts            # Barrel exports
│   ├── layouts/                # Layout components
│   │   └── main-layout.tsx     # Main layout
│   ├── hooks/                  # Shared custom hooks
│   │   └── use-local-storage.ts # Local storage hook
│   ├── types/                  # Shared type definitions
│   │   └── common-types.ts     # Common types
│   ├── utils/                  # Shared utility functions
│   │   └── format-utils.ts     # Formatting utilities
│   └── constants/              # Shared constants
│       └── app-constants.ts    # App constants
├── routes/                     # Route definitions
│   ├── dashboard.tsx           # Dashboard route
│   ├── products.tsx            # Products route
│   └── auth/
│       └── login.tsx           # Login route
├── routes.ts                   # Route configuration
├── root.tsx                    # Root component
└── app.css                     # Global styles
```

## 🏗️ Modular Architecture

### 1. **Modules** - Feature-based Organization

Each module focuses on a specific functionality:

- `auth/` - User authentication
- `dashboard/` - Overview and analytics
- `products/` - Product management

### 2. **Shared** - Common Resources

- `components/` - Reusable UI components
- `layouts/` - Layout templates
- `hooks/` - Shared custom hooks
- `types/` - Common type definitions
- `utils/` - Utility functions
- `constants/` - Constants and configuration

### 3. **Routes** - Route Definitions

- Each route wrapper component connects modules with layouts
- Centralized route configuration in `routes.ts`

## 🎯 Naming Conventions

### Files and Folders

- Use **kebab-case** for file names: `login-page.tsx`, `ui-button.tsx`
- Use **lowercase** for folders: `components/`, `pages/`, `hooks/`

### Components

- **PascalCase** for component names
- Descriptive prefixes for component categories (e.g., `Ui` for shared UI components)

### Functions and Variables

- **camelCase** for functions and variables
- **UPPER_SNAKE_CASE** for constants and configuration objects

## 🚀 Usage Guide

### Adding a New Module

1. Create folder in `app/modules/`
2. Create subfolder structure: `components/`, `pages/`, `hooks/`, `types/`, `utils/`
3. Create pages in `pages/`
4. Create route wrapper in `app/routes/`
5. Update `routes.ts`

### Adding a Shared Component

1. Create component in `app/shared/components/`
2. Export in `app/shared/components/index.ts`
3. Import from `"~/shared/components"` in modules

### Adding a New Page

1. Create page component in corresponding module
2. Create route wrapper using `MainLayout`
3. Update routes configuration

## 📦 Component Categories

### UI Components

Reusable interface elements that provide consistent user interactions:

- Interactive elements (buttons, inputs, forms)
- Display components (cards, modals, tooltips)
- Navigation components (menus, breadcrumbs, pagination)
- Layout helpers (grids, containers, dividers)

### Layout Components

Template components that define page structure and common layouts for consistent user experience across the application.

### Custom Hooks

Reusable logic hooks for common functionality:

- Data persistence and storage
- API calls and state management
- Browser APIs and platform features
- Form handling and validation

### Utility Functions

Helper functions for common operations:

- Data formatting and transformation
- String manipulation and validation
- Date and time operations
- Mathematical calculations

## 🎨 Styling

- Uses **Tailwind CSS** for styling
- Components use className props for customization
- Responsive design with mobile-first approach

## 🔍 Code Quality

The project uses a minimal but effective code quality setup:

- **ESLint**: Configured for TypeScript + React with relaxed rules
- **Prettier**: Consistent code formatting with auto import organization
- **Import Management**: Auto-sort imports and remove unused imports
- **VSCode Integration**: Auto-format on save and auto-fix on save
- **Pre-commit Ready**: All tools work together seamlessly

### ESLint Configuration

- TypeScript-aware linting
- React and React Hooks rules
- Minimal accessibility checks
- Senior-friendly (not overly strict)
- No console warnings (development-friendly)

### Prettier Configuration

- Auto-sort imports by category (React → External → Internal → Types)
- Remove unused imports automatically
- Organize type imports separately
- Minimal formatting rules for clean diffs

## 📝 Best Practices

1. **Separation of Concerns**: Each module focuses only on its functionality
2. **Reusability**: Shared components are reusable across modules
3. **Type Safety**: Uses TypeScript for type safety
4. **Consistent Naming**: Follows naming conventions
5. **Modular Structure**: Easy to add/remove modules without affecting others

## 🛠️ Import Paths

The project uses **path alias** `~/` for clean and maintainable imports:

```typescript
// ✅ Use alias
import { ComponentName } from "~/shared/components";
import { PageComponent } from "~/modules/feature/pages/page-name";

// ❌ Avoid long relative paths
import { ComponentName } from "../../../shared/components/component-name";
```

### Configured Aliases

- `~/` → `./app/` (application root)

## 🔧 Development

This project uses **pnpm** as the package manager for faster installations and better disk space efficiency.

> **Note**: If you don't have pnpm installed, install it globally: `npm install -g pnpm`

### Run the Project

```bash
pnpm install
pnpm run dev
```

### Build for Production

```bash
pnpm run build
```

### Type Check

```bash
pnpm run typecheck
```

### Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
# Edit .env with your specific configuration
```

### Code Quality

```bash
# Run linting
pnpm run lint

# Auto-fix linting issues
pnpm run lint:fix

# Format code
pnpm run format

# Check formatting
pnpm run format:check

# Run all checks (typecheck + lint + format)
pnpm run check

# Auto-fix all issues
pnpm run fix
```

## 🌟 Key Features

- **Modular Architecture**: Clean separation of concerns with feature-based modules
- **TypeScript**: Full type safety with generated route types
- **React Router v7**: SSR-ready with modern data loading patterns
- **Path Aliases**: Clean import paths with `~/` alias
- **Environment Config**: Type-safe environment configuration
- **API Client**: Robust HTTP client with interceptors and error handling
- **Error Boundaries**: Comprehensive error handling at component and route levels
- **Code Quality**: ESLint + Prettier with minimal, senior-friendly configuration
- **Scalable Structure**: Works for small projects, scales to enterprise level
- **Performance**: Code splitting and lazy loading ready
- **Developer Experience**: VSCode integration, scaffolding patterns

## 📋 Example Usage

### Creating a New Feature Module

```bash
# Create module structure
mkdir -p app/modules/{feature-name}/{components,pages,hooks,types,utils}

# Create page component
touch app/modules/{feature-name}/pages/{feature-page}.tsx

# Create route
touch app/routes/{feature-name}.tsx

# Update routes.ts to include new route
```

### Using Shared Components

```typescript
// In any module page
import { SharedComponent1, SharedComponent2 } from "~/shared/components";
import { useCustomHook } from "~/shared/hooks";
import { formatData } from "~/shared/utils";

export function MyPage() {
  const data = useCustomHook();
  const formattedData = formatData(data);

  return (
    <div>
      <SharedComponent1 title="My Page">
        <SharedComponent2>{formattedData}</SharedComponent2>
      </SharedComponent1>
    </div>
  );
}
```
