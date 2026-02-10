# Zone One - Multi-Zone Application

> An independent Next.js application that's part of a multi-zone architecture.

## 🎯 Purpose

Zone One is a **standalone Next.js application** that runs independently but integrates seamlessly into the multi-zone architecture. It can be developed, tested, and deployed completely separately from other zones.

## 🏗️ Architecture Role

```
Main App (/zone-one/*) → Proxy → Zone One (localhost:3001) → Render Pages
```

Zone One:
- ✅ Runs on its own server (port 3001 in development)
- ✅ Manages its own routes and pages
- ✅ Can use shared packages from the monorepo
- ✅ Deployed independently from main app and other zones
- ✅ Accessible via main app at `/zone-one` or directly at its port

## 🚀 Getting Started

### Development

**Run Zone One only:**
```bash
# From zone-one directory
pnpm dev -p 3001
```

**Or from root:**
```bash
pnpm dev --filter zone-one
```

Zone One will be available at:
- **Direct Access**: http://localhost:3001
- **Via Main App**: http://localhost:3000/zone-one (requires main app running)

### Development Modes

#### 1. Standalone Development
Run zone-one independently for focused feature development:
```bash
cd apps/zone-one
pnpm dev -p 3001
```
Access at http://localhost:3001

#### 2. Integrated Development
Run all apps together to test multi-zone integration:
```bash
# From root
pnpm dev
```
Access via main app at http://localhost:3000/zone-one

## ⚙️ Configuration

### Next.js Configuration

The `next.config.ts` contains zone-specific configuration:

```typescript
const nextConfig = {
  // Asset prefix for proper static file serving via main app
  assetPrefix: '/zone-one-static',
  
  // Rewrite rules to handle asset loading
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/zone-one-static/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
};
```

### Why Asset Prefix?

When accessed via the main app:
- Main App URL: `http://localhost:3000/zone-one`
- Without `assetPrefix`: Assets load from `/_next/...` (main app's assets)
- With `assetPrefix`: Assets load from `/zone-one-static/_next/...` (zone's assets)

The main app proxies these requests back to zone-one's server.

## 📂 Project Structure

```
zone-one/
├── app/
│   ├── layout.tsx      # Zone-specific layout
│   ├── page.tsx        # Zone landing page
│   └── [routes]/       # Additional routes
├── public/             # Static assets
├── next.config.ts      # Zone configuration
├── package.json
└── tsconfig.json
```

## 🎨 Features

### Current Implementation

- **Landing Page**: Beautiful UI showcasing multi-zone architecture
- **Back Navigation**: Link back to main app
- **Responsive Design**: Mobile-friendly with dark mode support
- **Educational Content**: Explains zone architecture to visitors

### Adding New Pages

Create new pages in the `app` directory:

```typescript
// app/dashboard/page.tsx
export default function Dashboard() {
  return <div>Zone One Dashboard</div>;
}
```

Accessible at:
- Direct: `http://localhost:3001/dashboard`
- Via Main App: `http://localhost:3000/zone-one/dashboard`

## 🔗 Routing

### Internal Links

Use Next.js Link for navigation within zone:

```tsx
import Link from 'next/link';

<Link href="/dashboard">Dashboard</Link>
// Becomes: /zone-one/dashboard via main app
```

### Back to Main App

```tsx
import Link from 'next/link';

<Link href="/">Back to Main App</Link>
// Routes to main app's root
```

### Zone-to-Zone Navigation

```tsx
// Navigate to another zone
<Link href="/zone-two">Go to Zone Two</Link>
```

## 📦 Shared Dependencies

Zone One can use shared packages from the monorepo:

```tsx
// Import shared UI components
import { Button, Card } from '@repo/ui';

// Use in your pages
export default function Page() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## 🎨 Styling

Zone One uses Tailwind CSS with custom configuration:

```tsx
// Example: Zone-specific styling
<div className="bg-gradient-to-br from-blue-50 to-indigo-100">
  {/* Zone One uses blue/indigo theme */}
</div>
```

Each zone can have its own design system while maintaining consistency through shared components.

## 🚧 Common Issues

### Assets Not Loading

**Symptom**: CSS/images don't load when accessed via main app

**Solution**: Ensure `assetPrefix` is set in `next.config.ts`:
```typescript
assetPrefix: '/zone-one-static',
```

### Links Breaking

**Symptom**: Links redirect to wrong URLs

**Solution**: Always use relative paths with Next.js Link:
```tsx
// ✅ Correct
<Link href="/dashboard">Dashboard</Link>

// ❌ Incorrect
<Link href="http://localhost:3001/dashboard">Dashboard</Link>
```

### Port Conflicts

**Symptom**: "Port 3001 already in use"

**Solutions**:
```bash
# Option 1: Kill process on port 3001
pkill -f "next-server.*3001"

# Option 2: Use different port
pnpm dev -p 3002
```

## 🚀 Deployment

### Independent Deployment

Zone One can be deployed separately:

#### Vercel
```bash
# Deploy zone-one as its own project
vercel --cwd apps/zone-one
```

#### Other Platforms
```bash
# Build
pnpm build

# Start production server
pnpm start
```

### Environment Variables

No environment variables required for zone-one itself. The main app needs to know zone-one's URL:

```env
# In main-app/.env
ZONE_ONE_DOMAIN=https://zone-one.vercel.app
```

## 🧪 Testing

### Unit Tests
```bash
pnpm test
```

### E2E Testing

Test both standalone and integrated modes:

```bash
# Test standalone
pnpm dev -p 3001
# Visit http://localhost:3001

# Test integrated
pnpm dev  # (runs all apps)
# Visit http://localhost:3000/zone-one
```

## 🔧 Development Tips

### Hot Reload

Fast Refresh works in both standalone and integrated modes. Changes appear instantly.

### Debugging

Use browser DevTools:
- Check Network tab for asset loading
- Verify requests are proxied correctly
- Inspect rewrite behavior

### Performance

Zone One benefits from Next.js optimizations:
- Automatic code splitting
- Image optimization
- Server-side rendering
- Static generation

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Multi-Zones Guide](https://nextjs.org/docs/app/building-your-application/deploying/multi-zones)
- [Asset Prefix Configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix)

## 🤝 Contributing

When working on Zone One:
1. Test in both standalone and integrated modes
2. Ensure asset prefix configuration is correct
3. Use relative paths for all navigation
4. Maintain zone-specific styling (blue/indigo theme)
5. Update this README when adding major features

## 🎯 Roadmap

- [ ] Add authentication
- [ ] Implement dashboard features
- [ ] Add more example pages
- [ ] Create zone-specific API routes
- [ ] Add shared state management
