# Whiteboard Homepage Setup

## Overview

This document describes the implementation of setting the whiteboard as the homepage and making it publicly accessible.

## Status

⏳ **Pending Implementation**

## Requirements

1. Set whiteboard as the homepage (`/`)
2. Keep it open for public interaction (replies, post-its)
3. Implement spam protection (see [07-spam-protection.md](./07-spam-protection.md))

## Current State

- Whiteboard is accessible at `/whiteboard/[id]`
- Whiteboard functionality is working
- Public access needs to be configured
- Spam protection needs to be implemented

## Planned Implementation

### Step 1: Create Public Whiteboard

Create a dedicated public whiteboard that will be used as the homepage.

**File:** `lib/actions/getOrCreatePublicWhiteboard.ts`

```typescript
export async function getOrCreatePublicWhiteboard() {
  // Get or create a public whiteboard room
  // Return the whiteboard ID
}
```

### Step 2: Update Homepage

Modify `app/page.tsx` to redirect to or render the public whiteboard.

**Option A: Redirect**
```typescript
import { redirect } from "next/navigation";
import { getOrCreatePublicWhiteboard } from "@/lib/actions/getOrCreatePublicWhiteboard";

export default async function Index() {
  const whiteboard = await getOrCreatePublicWhiteboard();
  redirect(`/whiteboard/${whiteboard.id}`);
}
```

**Option B: Direct Render**
```typescript
import { getOrCreatePublicWhiteboard } from "@/lib/actions/getOrCreatePublicWhiteboard";
import { WhiteboardDocumentView } from "@/app/whiteboard/[id]/WhiteboardDocumentView";

export default async function Index() {
  const whiteboard = await getOrCreatePublicWhiteboard();
  return <WhiteboardDocumentView initialDocument={whiteboard} />;
}
```

### Step 3: Configure Public Access

Ensure the public whiteboard has appropriate access settings:

```typescript
const room = await liveblocks.createRoom(roomId, {
  metadata: {
    name: "Public Whiteboard",
    type: "whiteboard",
    public: true,
  },
  defaultAccesses: ["room:read", "room:write"], // Public read/write
});
```

### Step 4: Implement Spam Protection

See [07-spam-protection.md](./07-spam-protection.md) for spam protection implementation.

## Considerations

1. **Room ID**: Use a fixed room ID for the public whiteboard (e.g., "public-whiteboard")
2. **Permissions**: Configure appropriate public permissions
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Content Moderation**: Consider content moderation features
5. **Analytics**: Track usage and abuse patterns

## Files to Modify

- `app/page.tsx` - Homepage redirect/render
- `lib/actions/getOrCreatePublicWhiteboard.ts` - Public whiteboard creation
- `app/whiteboard/[id]/WhiteboardDocumentView.tsx` - Whiteboard view component

## References

- [Liveblocks Public Rooms](https://liveblocks.io/docs/rooms/public-rooms)
- [Liveblocks Permissions](https://liveblocks.io/docs/rooms/permissions)

