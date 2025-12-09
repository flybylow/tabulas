# API Key Management

## Overview

This document describes the implementation of API key management, including the transition from public keys to secret keys with authorization endpoints.

## Problem

Initially, the project used a hardcoded public API key directly in the client-side code. This approach has limitations:
- Public keys are visible in the client bundle
- Less secure for production applications
- No server-side user validation

## Solution: Authorization Endpoint

Implemented a server-side authorization endpoint for enhanced security and flexibility.

## Implementation Steps

### 1. Environment Variables

Created environment variable configuration:

```env
# Option 1: Public key (simpler, less secure)
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_public_key_here

# Option 2: Secret key with authorization (recommended)
LIVEBLOCKS_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_USE_LIVEBLOCKS_AUTH=true
```

### 2. Room Component Update

Modified `app/Room.tsx` to support both approaches:

```typescript
export function Room({ children }: { children: ReactNode }) {
  const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;
  const useAuth = process.env.NEXT_PUBLIC_USE_LIVEBLOCKS_AUTH === "true";
  const authEndpoint = useAuth ? "/api/liveblocks-authorize" : undefined;

  if (authEndpoint) {
    return (
      <LiveblocksProvider authEndpoint={authEndpoint}>
        <RoomProvider id="my-room">
          <ClientSideSuspense fallback={<div>Loading…</div>}>
            {children}
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    );
  }

  // Fallback to public key
  if (!publicApiKey) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is required");
  }

  return (
    <LiveblocksProvider publicApiKey={publicApiKey}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
```

### 3. Authorization API Route

Created `app/api/liveblocks-authorize/route.ts`:

```typescript
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const secret = process.env.LIVEBLOCKS_SECRET_KEY;

if (!secret) {
  throw new Error("LIVEBLOCKS_SECRET_KEY is not set in environment variables");
}

const liveblocks = new Liveblocks({ secret });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body.userId || "anonymous";

  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      // Add user info here (name, avatar, etc.)
    },
  });

  session.allow(body.room, session.FULL_ACCESS);

  const { status, body: token } = await session.authorize();

  return new Response(token, {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

## Key Differences

### Public Key Approach
- ✅ Simple setup
- ✅ No server-side code needed
- ❌ Key visible in client bundle
- ❌ Limited user validation

### Secret Key + Authorization Approach
- ✅ More secure
- ✅ Server-side user validation
- ✅ Custom user info per session
- ❌ Requires server-side endpoint

## Error Encountered

### Problem: `Export authorize doesn't exist in target module`

**Error Message:**
```
Export authorize doesn't exist in target module
```

**Cause:** Attempted to import `authorize` directly from `@liveblocks/node`, which doesn't export it.

**Solution:** Use the `Liveblocks` class with `prepareSession()` and `session.authorize()` methods instead.

**Before (Incorrect):**
```typescript
import { authorize } from "@liveblocks/node";
```

**After (Correct):**
```typescript
import { Liveblocks } from "@liveblocks/node";
const liveblocks = new Liveblocks({ secret });
const session = liveblocks.prepareSession(userId);
```

## Files Created/Modified

- `app/Room.tsx` - Updated to support both auth methods
- `app/api/liveblocks-authorize/route.ts` - Authorization endpoint
- `.env.local` - Environment variables
- `.env.example` - Example environment variables

## Best Practices

1. **Use Secret Key in Production**: Always use `LIVEBLOCKS_SECRET_KEY` with authorization endpoint for production
2. **Validate Users**: Implement proper user validation in the authorization endpoint
3. **Add User Info**: Include user information (name, avatar) in the session for better UX
4. **Error Handling**: Handle missing environment variables gracefully

## References

- [Liveblocks Authorization Documentation](https://liveblocks.io/docs/authentication/authorization-endpoint)
- [Liveblocks Node SDK](https://liveblocks.io/docs/api-reference/liveblocks-node)

