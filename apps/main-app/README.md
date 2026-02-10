# Main App - Multi-Zone Orchestrator

> The central hub that routes requests to various zones in the multi-zone architecture.

## 🎯 Purpose

The Main App serves as the **orchestrator** and **reverse proxy** for the entire multi-zone application. It doesn't contain business logic itself, but intelligently routes incoming requests to the appropriate zones based on URL patterns.

## 🏗️ Architecture Role

```
User Request → Main App → Route Matching → Proxy to Zone → Response
```

The Main App:
- ✅ Acts as the single entry point for all users
- ✅ Uses Next.js rewrites to proxy requests to zones
- ✅ Maintains URL consistency across the application
- ✅ Can host shared layouts or navigation (optional)
- ✅ Handles routing logic without tight coupling to zones

## 🚀 Getting Started

### Prerequisites

Before running the main app, ensure:
1. All zone apps are running on their designated ports
2. Environment variables are properly configured

### Development

```bash
# From the main-app directory
pnpm dev

# Or from the root with specific port
pnpm dev --filter main-app
```

The app will start on **http://localhost:3000**

### Environment Variables

Create a `.env` file in this directory:

```env
# Zone One
ZONE_ONE_DOMAIN=http://localhost:3001

# Add more zones as needed
# ZONE_TWO_DOMAIN=http://localhost:3002
```

## ⚙️ Configuration

### Routing Configuration

The `next.config.ts` contains rewrite rules for routing:

```typescript
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
    {
      source: '/zone-one-static/:path+',
      destination: `${process.env.ZONE_ONE_DOMAIN}/zone-one-static/:path+`,
    }
  ];
}
```

### How Rewrites Work

1. **Pattern Matching**: User visits `/zone-one/dashboard`
2. **Rewrite Rule**: Matches `/zone-one/:path+` pattern
3. **Proxy**: Request is proxied to `http://localhost:3001/dashboard`
4. **Transparent**: User still sees `localhost:3000/zone-one/dashboard` in the browser

### Adding New Zones

To add a new zone:

1. **Add environment variable**:
```env
ZONE_TWO_DOMAIN=http://localhost:3002
```

2. **Add rewrite rules**:
```typescript
{
  source: '/zone-two',
  destination: `${process.env.ZONE_TWO_DOMAIN}/`,
},
{
  source: '/zone-two/:path+',
  destination: `${process.env.ZONE_TWO_DOMAIN}/:path+`,
}
```

## 📂 Project Structure

```
main-app/
├── app/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main landing page
├── public/             # Static assets
├── .env                # Environment variables
├── next.config.ts      # Next.js config with rewrites
├── package.json
└── tsconfig.json
```

## 🔗 Routing Table

| User URL | Proxied To | Zone |
|----------|------------|------|
| `/` | Main App | Main |
| `/zone-one` | `localhost:3001/` | Zone One |
| `/zone-one/*` | `localhost:3001/*` | Zone One |
| `/zone-one-static/*` | `localhost:3001/zone-one-static/*` | Zone One Assets |

## 🎨 Customization

### Landing Page

Edit `app/page.tsx` to customize the main landing page:
- Add navigation to all zones
- Display application overview
- Add authentication flows
- Implement shared features

### Shared Layouts

The `app/layout.tsx` can include:
- Global navigation bars
- Shared headers/footers
- Common providers (auth, theme, etc.)
- Analytics or monitoring scripts

## 🚧 Common Issues

### Zone Not Found (404)

**Symptom**: Visiting `/zone-one` returns 404

**Solutions**:
1. Ensure zone app is running: `cd apps/zone-one && pnpm dev -p 3001`
2. Check environment variable is set: `echo $ZONE_ONE_DOMAIN`
3. Verify rewrite rules in `next.config.ts`
4. Check zone is running on correct port

### Assets Not Loading

**Symptom**: CSS/JS from zones not loading

**Solutions**:
1. Ensure `assetPrefix` is configured in zone's next.config
2. Add rewrite rule for `zone-static` paths
3. Check browser console for failed asset requests

### CORS Errors

**Symptom**: Cross-origin request blocked

**Solution**: Rewrites happen server-side, so CORS shouldn't occur. If it does:
1. Ensure requests go through main app, not directly to zones
2. Check zone isn't setting restrictive CORS headers

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x"
  }
}
```

## 🚀 Deployment

### Vercel

1. Deploy as a separate Vercel project
2. Set production environment variables:
   ```
   ZONE_ONE_DOMAIN=https://zone-one.vercel.app
   ```
3. Each zone should be deployed independently
4. Update environment variables to point to production zone URLs

### Other Platforms

```bash
# Build
pnpm build

# Start production server
pnpm start
```

Ensure environment variables are set for production zone URLs.

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## 📚 Learn More

- [Next.js Rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites)
- [Multi-Zones Documentation](https://nextjs.org/docs/app/building-your-application/deploying/multi-zones)
- [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 🤝 Contributing

When modifying the main app:
1. Update rewrite rules carefully to avoid breaking existing zones
2. Document new environment variables
3. Test all zone routes after changes
4. Keep the main app lightweight - business logic belongs in zones
