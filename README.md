# Next.js Multi-Zone Monorepo

<div align="center">
  <h3>🚀 A Turborepo-powered Multi-Zone Next.js Architecture</h3>
  <p>Build scalable applications with independent Next.js zones in a unified monorepo</p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [What is Multi-Zone?](#what-is-multi-zone)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [How It Works](#how-it-works)
- [Configuration](#configuration)
- [Deployment](#deployment)

## 🌟 Overview

This is a production-ready multi-zone Next.js application managed as a monorepo using Turborepo and pnpm. The architecture allows you to split your application into multiple independent Next.js apps (zones) while presenting a seamless, unified experience to users.

### Key Benefits

- **🔄 Independent Development**: Each zone can be developed, tested, and deployed separately
- **👥 Team Scalability**: Different teams can own different zones without conflicts
- **⚡ Performance**: Zones can be optimized independently and deployed to different infrastructure
- **🎯 Domain Separation**: Organize features by business domains or product areas
- **📦 Code Sharing**: Share components, configs, and utilities across zones via shared packages

## 🤔 What is Multi-Zone?

Multi-zone is a Next.js deployment strategy where multiple Next.js applications are merged into a single application from the user's perspective. A main application acts as an orchestrator, routing requests to different zones based on URL patterns.

### Use Cases

- Large-scale applications with multiple feature domains
- Gradual migration from legacy systems
- Microservices architecture with independent frontend apps
- Multi-team organizations requiring code isolation
- Applications requiring different deployment strategies per feature

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│          User (localhost:3000)              │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         Main App (Port 3000)                │
│     - Orchestrates routing                  │
│     - Acts as reverse proxy                 │
│     - Rewrites URLs to zones                │
└─────────────┬───────────────────────────────┘
              │
              ├──────────────┬─────────────────┐
              ▼              ▼                 ▼
     ┌────────────┐  ┌──────────────┐  ┌──────────┐
     │  Zone One  │  │   Zone Two   │  │  Future  │
     │ (Port 3001)│  │ (Port 3002)  │  │  Zones   │
     │            │  │              │  │          │
     └────────────┘  └──────────────┘  └──────────┘
```

## 📁 Project Structure

```
next-multi-zone/
├── apps/
│   ├── main-app/          # Main orchestrator app (port 3000)
│   │   ├── app/
│   │   ├── next.config.ts # Rewrites configuration
│   │   ├── .env           # Environment variables
│   │   └── package.json
│   │
│   └── zone-one/          # Zone One app (port 3001)
│       ├── app/
│       ├── next.config.ts # Zone configuration
│       └── package.json
│
├── packages/
│   ├── ui/                # Shared UI components
│   ├── eslint-config/     # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
│
├── turbo.json             # Turborepo pipeline configuration
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── package.json           # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm 8+ installed

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd next-multi-zone
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

The main-app requires an environment variable pointing to zone-one:

```bash
# apps/main-app/.env
ZONE_ONE_DOMAIN=http://localhost:3001
```

## 💻 Development

### Option 1: Run All Apps (Recommended)

Run both apps simultaneously using Turborepo:

```bash
pnpm dev
```

This starts:
- Main App on http://localhost:3000
- Zone One on http://localhost:3001

### Option 2: Run Apps Individually

**Terminal 1 - Main App:**
```bash
cd apps/main-app
pnpm dev
```

**Terminal 2 - Zone One:**
```bash
cd apps/zone-one
pnpm dev -p 3001
```

### Accessing the Application

- **Main App**: http://localhost:3000
- **Zone One (via Main App)**: http://localhost:3000/zone-one
- **Zone One (Direct)**: http://localhost:3001

## 🔧 How It Works

### 1. Request Flow

```
User visits /zone-one
    ↓
Main App intercepts request
    ↓
Next.js rewrites match the pattern
    ↓
Request proxied to http://localhost:3001/
    ↓
Zone One renders the page
    ↓
Response sent back to user
```

### 2. Main App Rewrites

The main app uses Next.js rewrites to route traffic:

```typescript
// apps/main-app/next.config.ts
async rewrites() {
  return [
    {
      source: '/zone-one',
      destination: `${process.env.ZONE_ONE_DOMAIN}/`,
    },
    {
      source: '/zone-one/:path+',
      destination: `${process.env.ZONE_ONE_DOMAIN}/:path+`,
    },
  ];
}
```

### 3. Asset Handling

Zone One uses an `assetPrefix` to properly serve static assets:

```typescript
// apps/zone-one/next.config.ts
const nextConfig = {
  assetPrefix: '/zone-one-static',
  // ...
}
```

## ⚙️ Configuration

### Adding a New Zone

1. **Create the zone app**

```bash
cd apps
npx create-next-app zone-two
```

2. **Configure the zone** (apps/zone-two/next.config.ts)

```typescript
const nextConfig = {
  assetPrefix: '/zone-two-static',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/zone-two-static/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
};
```

3. **Add rewrites to main app** (apps/main-app/next.config.ts)

```typescript
async rewrites() {
  return [
    // ... existing rewrites
    {
      source: '/zone-two',
      destination: `${process.env.ZONE_TWO_DOMAIN}/`,
    },
    {
      source: '/zone-two/:path+',
      destination: `${process.env.ZONE_TWO_DOMAIN}/:path+`,
    },
  ];
}
```

4. **Add environment variable** (apps/main-app/.env)

```
ZONE_TWO_DOMAIN=http://localhost:3002
```

### Turborepo Configuration

The `turbo.json` defines the build pipeline:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 🚢 Deployment

### Vercel (Recommended)

Each zone should be deployed as a separate Vercel project:

1. **Deploy Zone One**
   - Import `apps/zone-one` as a new project
   - Deploy to production

2. **Deploy Main App**
   - Import `apps/main-app` as a new project
   - Add environment variable: `ZONE_ONE_DOMAIN=https://zone-one.vercel.app`
   - Deploy to production

### Other Platforms

1. Build all apps: `pnpm build`
2. Deploy each app independently
3. Configure environment variables to point to production URLs

### Environment Variables for Production

```bash
# Main App Production .env
ZONE_ONE_DOMAIN=https://zone-one.your-domain.com
```

## 📚 Learn More

- [Next.js Multi-Zones Documentation](https://nextjs.org/docs/app/building-your-application/deploying/multi-zones)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
