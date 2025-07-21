# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🏗️ **Feature-First Architecture** - Modern, scalable organization
- 📖 [React Router docs](https://reactrouter.com/)

## 🏗️ Architecture

This project uses **Feature-First Organization** where each feature contains all related code in a single folder:

```
app/modules/
├── auth/login/              ← Login feature (all login code here)
├── dashboard/dashboard-overview/
├── products/product-list/
└── shared/                  ← Shared components, hooks, utils
```

**Benefits:**
- 🎯 High cohesion - related code stays together
- ⚡ Faster development - no folder jumping
- 🗑️ Easy cleanup - delete feature = delete folder
- 📦 Self-contained features

> 📋 See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture guide

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
