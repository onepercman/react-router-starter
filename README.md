# React Router Starter

A modern React application built with React Router, TypeScript, and Zustand for state management.

## Features

- ⚡ **React Router v7** - File-based routing with type safety
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Built-in theme switching
- 🔒 **Authentication** - Complete auth system with Zustand
- 📊 **State Management** - Zustand for predictable state management
- 🛠️ **TypeScript** - Full type safety
- 🎯 **ESLint & Prettier** - Code quality and formatting

## State Management

This project uses **Zustand v5** for state management with the following stores:

### Auth Store (`useAuthStore`)
- User authentication (login/register/logout)
- Token management with automatic refresh
- Persistent storage with localStorage
- Error handling and loading states

### User Store (`useUserStore`)
- User profile management
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
├── modules/           # Feature modules
│   ├── auth/         # Authentication module
│   ├── dashboard/    # Dashboard module
│   ├── home/         # Home module
│   └── products/     # Products module
├── shared/           # Shared utilities
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── stores/       # Zustand stores
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── config/       # Configuration files
├── root.tsx          # Root component
└── routes.ts         # Route definitions
```

## Store Architecture

### Auth Store Features
- **Persistent Authentication**: Auto-saves auth state to localStorage
- **Token Refresh**: Automatic token refresh on expiration
- **Error Handling**: Comprehensive error states and messaging
- **Loading States**: Loading indicators for better UX

### User Store Features
- **Profile Management**: Complete user profile CRUD operations
- **Preferences**: Theme, language, timezone, and notification settings
- **Statistics**: User activity tracking and metrics

### Usage Examples

```tsx
// Using auth store
import { useAuth } from '~/shared/hooks/use-auth';

function LoginComponent() {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect or show success
    } catch (error) {
      // Error is handled by store
    }
  };
}

// Using user store
import { useUserProfile } from '~/shared/hooks/use-user-profile';

function ProfileComponent() {
  const { profile, updateProfile, updateTheme } = useUserProfile();
  
  const handleThemeChange = async (theme) => {
    await updateTheme(theme);
  };
}
```

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Routing**: React Router v7
- **State Management**: Zustand v5
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier
- **UI Components**: Custom components with Tailwind

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and checks: `pnpm check`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
