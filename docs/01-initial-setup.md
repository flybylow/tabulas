# Initial Setup - Next.js and Liveblocks

## Overview

This document describes the initial setup process for installing Next.js and Liveblocks in the project root.

## Steps Taken

### 1. Installation from Starter Kit

Installed the Liveblocks Next.js Starter Kit following the official documentation:
- Reference: https://liveblocks.io/docs/tools/nextjs-starter-kit

### 2. Project Structure

The starter kit provided:
- Next.js 15.2.4 with App Router
- Liveblocks integration
- Authentication setup with NextAuth.js
- Multiple document types (text, whiteboard, canvas, note)
- Dashboard with document management

### 3. Initial Configuration

Created basic setup files:
- `app/page.tsx` - Homepage
- `app/Room.tsx` - Liveblocks Room provider
- `app/CollaborativeApp.tsx` - Main collaborative app component
- `.env.local` - Environment variables
- `.gitignore` - Git ignore patterns

### 4. Basic Liveblocks Integration

Set up the basic Liveblocks structure:

```typescript
// app/Room.tsx
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
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

### 5. User Presence

Implemented basic user presence tracking:

```typescript
// app/CollaborativeApp.tsx
import { useOthers } from "@liveblocks/react/suspense";

export function CollaborativeApp() {
  const others = useOthers();
  const userCount = others.length;
  return <div>There are {userCount} other user(s) online</div>;
}
```

## Files Created/Modified

- `app/page.tsx` - Main entry point
- `app/Room.tsx` - Liveblocks context provider
- `app/CollaborativeApp.tsx` - Collaborative app component
- `.env.local` - Environment variables
- `.gitignore` - Git ignore patterns
- `package.json` - Dependencies

## Dependencies Added

- `next` - Next.js framework
- `@liveblocks/react` - Liveblocks React integration
- `@liveblocks/node` - Liveblocks server-side SDK
- `@liveblocks/client` - Liveblocks client SDK

## Next Steps

After initial setup, the project was configured for:
- API key management (see [02-api-key-management.md](./02-api-key-management.md))
- Multiple document types
- Authentication integration

