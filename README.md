# Project Setup Guide

## Prerequisites
- Node.js v18+
- npm v9+
- Git
- PostgreSQL database
- GitHub/Google OAuth credentials (optional but recommended)

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
1. Create `.env.local` file:
```bash
cp .env.example .env.local
```

2. Populate required values in `.env.local`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXTAUTH_SECRET="your-generated-secret-here"  # Use output from: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# For GitHub OAuth (optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# For Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Initialization
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. OAuth Configuration (Choose Providers)

#### GitHub Setup
1. Create OAuth App: [GitHub Developer Settings](https://github.com/settings/developers)
2. Set callback URL to:
```text
http://localhost:3000/api/auth/callback/github
```

#### Google Setup
1. Create credentials: [Google Cloud Console](https://console.cloud.google.com/)
2. Add authorized redirect URI:
```text
http://localhost:3000/api/auth/callback/google
```

### 6. Start Development Server
```bash
npm run dev
```

## First Run Instructions
1. Access the application:
```text
http://localhost:3000
```

2. Test authentication flow:
```text
http://localhost:3000/api/auth/signin
```

3. Create your first user through:
- Social login buttons (if OAuth configured)
- Direct database entry (if using credentials provider)

## Verifying Installation
1. Check for successful database connection:
```bash
npx prisma studio
```

2. Validate environment variables:
```bash
echo $NEXTAUTH_SECRET  # Should show your 32-character secret
```

## Common Issues

### Environment Variables Not Loading
- Ensure file is named `.env.local` not `.env`
- Restart server after variable changes

### Database Connection Errors
- Verify PostgreSQL is running
- Check `DATABASE_URL` format:
```text
postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
```

### OAuth Redirect Issues
- Confirm exact match in callback URLs
- Wait 5 minutes for DNS changes if using custom domain

### Type Errors
- Run full clean install:
```bash
rm -rf node_modules .next
npm install
```

## Production Deployment
1. Update environment variables:
- Set `NEXTAUTH_URL` to your production domain
- Use proper database credentials
- Add production OAuth credentials

2. Build project:
```bash
npm run build
```

3. Start production server:
```bash
npm start
```

---

# Authentication Configuration

## Required Setup Steps
1. **Generate Authentication Secret**
```bash
openssl rand -base64 32  # Copy output to NEXTAUTH_SECRET
```

2. **Configure Providers** (Choose one or both):

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create New OAuth App:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

## Essential Commands
```bash
# After setting up environment variables
npx prisma generate  # Generate auth-adapted Prisma client
npx prisma migrate dev --name add_auth_schema  # Create auth tables
```

## Authentication Flow
1. Start application:
```bash
npm run dev
```

2. Visit `/api/auth/signin` to test authentication  
3. Use provider buttons in your UI to initiate login

## Troubleshooting NextAuth
- **Missing NEXTAUTH_SECRET**: Add a 32-character secret to `.env.local`
- **Database Schema Mismatch**:
  ```bash
  npx prisma migrate reset
  npx prisma db push
  ```
- **OAuth Errors**: Verify callback URLs match exactly
- **Session Issues**: Clear browser cookies and restart server

## Key Authentication Features
- Pre-configured with Prisma adapter
- Built-in session management
- Type-safe authentication handlers
- Social provider integration
- Secure cookie-based sessions

## Example User Session
```tsx
// In components:
import { useSession } from "next-auth/react";

const { data: session } = useSession();
console.log(session?.user);  // Access user data
```
