# Error Handling & Fixes

## Overview

This document catalogs the major errors encountered during development and their solutions.

## Error 1: React 19 Compatibility - useEffect Hook

### Problem

**Error Message:**
```
TypeError: Cannot read properties of null (reading 'useEffect')
at exports.useEffect
at Providers
```

**Context:** Occurred in `app/Providers.tsx` when using React 19.

**Root Cause:** React 19 has stricter requirements for React imports, especially in server components.

### Solution

Explicitly imported `React` in the Providers component:

```typescript
// Before
import { ReactNode, useEffect } from "react";

// After
import React, { ReactNode, useEffect } from "react";
```

**File Modified:** `app/Providers.tsx`

**Status:** ✅ Fixed

---

## Error 2: Radix UI Tooltip - React 19 Compatibility

### Problem

**Error Message:**
```
TypeError: target?.contains is not a function
at TooltipContentImpl.useEffect.handleScroll
```

**Context:** Occurred in Radix UI Tooltip component with React 19.

**Root Cause:** Compatibility issue between Radix UI Tooltip and React 19.

### Solution

1. **Updated Radix UI Tooltip:**
```bash
npm install @radix-ui/react-tooltip@^1.2.8
```

2. **Added TooltipProvider Configuration:**
```typescript
// app/Providers.tsx
import { TooltipProvider } from "@radix-ui/react-tooltip";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <LiveblocksProvider {...props}>
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
          {children}
        </TooltipProvider>
      </LiveblocksProvider>
    </SessionProvider>
  );
}
```

3. **Cleared Build Cache:**
```bash
rm -rf .next
npm run dev
```

**Files Modified:**
- `app/Providers.tsx`
- `package.json` (dependency update)

**Status:** ✅ Fixed

---

## Error 3: Notification Settings Not Enabled

### Problem

**Error Message:**
```
HttpError: No settings enabled. Please enable at least one channel and kind in the notification page of the Liveblocks dashboard (got status 404 from /v2/c/notification-settings)
```

**Context:** Occurred when trying to access notification settings that weren't enabled in the Liveblocks dashboard.

**Root Cause:** Notification settings must be enabled in the Liveblocks dashboard before the API can be used.

### Solution

1. **Created Error Boundary Component:**
```typescript
// components/Inbox/NotificationSettingsErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class NotificationSettingsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.switchBox}>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Notification settings are not enabled. Please enable at least one channel and kind in the{" "}
            <a
              href="https://liveblocks.io/dashboard/notifications"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4F46E5", textDecoration: "underline" }}
            >
              Liveblocks dashboard
            </a>
            .
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

2. **Added Inline Error Handling:**
```typescript
// components/Inbox/InboxSettingsDialog.tsx
function EmailNotificationSettings() {
  const [notificationSettingsResult, updateSettings] = useNotificationSettings();

  if (notificationSettingsResult.error) {
    return (
      <div className={styles.switchBox}>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Notification settings are not enabled. Please enable at least one channel and kind in the{" "}
          <a
            href="https://liveblocks.io/dashboard/notifications"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4F46E5", textDecoration: "underline" }}
          >
            Liveblocks dashboard
          </a>
          .
        </p>
      </div>
    );
  }

  // ... rest of component
}
```

3. **Wrapped Component with Error Boundary:**
```typescript
<NotificationSettingsErrorBoundary>
  <Suspense fallback={<Spinner />}>
    <EmailNotificationSettings />
  </Suspense>
</NotificationSettingsErrorBoundary>
```

**Files Created:**
- `components/Inbox/NotificationSettingsErrorBoundary.tsx`

**Files Modified:**
- `components/Inbox/InboxSettingsDialog.tsx`

**Status:** ✅ Fixed

---

## Error 4: Liveblocks Authorization API

### Problem

**Error Message:**
```
Export authorize doesn't exist in target module
```

**Context:** Attempted to import `authorize` directly from `@liveblocks/node`.

**Root Cause:** The `authorize` function doesn't exist as a direct export. Must use the `Liveblocks` class.

### Solution

Changed from direct import to using the `Liveblocks` class:

```typescript
// Before (Incorrect)
import { authorize } from "@liveblocks/node";

// After (Correct)
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({ secret });
const session = liveblocks.prepareSession(userId);
session.allow(body.room, session.FULL_ACCESS);
const { status, body: token } = await session.authorize();
```

**File Modified:** `app/api/liveblocks-authorize/route.ts`

**Status:** ✅ Fixed

---

## Error 5: TypeScript Type Mismatches

### Problem

**Error:** Type mismatches when `document` or `error` could be `undefined` instead of `null`.

**Context:** Occurred in `app/dpp/[id]/page.tsx` and other document pages.

### Solution

Added null coalescing operator:

```typescript
// Before
return <DPPDocumentView initialDocument={document} initialError={error} />;

// After
return (
  <DPPDocumentView
    initialDocument={document ?? null}
    initialError={error ?? null}
  />
);
```

**Files Modified:**
- `app/dpp/[id]/page.tsx`
- Other document page components

**Status:** ✅ Fixed

---

## Error 6: Turbopack Build Error

### Problem

**Error Message:**
```
Error: Next.js inferred your workspace root, but it may not be correct.
We couldn't find the Next.js package (next/package.json) from the project directory
```

**Context:** Occurred during development server startup.

**Root Cause:** Corrupted build cache or missing dependencies.

### Solution

1. Clear build cache:
```bash
rm -rf .next
```

2. Reinstall dependencies:
```bash
npm install
```

3. Restart development server:
```bash
npm run dev
```

**Status:** ✅ Fixed

---

## Best Practices for Error Handling

1. **Use Error Boundaries**: Wrap components that might fail with error boundaries
2. **Handle Async Errors**: Always handle errors from async operations
3. **Type Safety**: Use TypeScript null checks and type guards
4. **Clear Cache**: When encountering build errors, clear `.next` directory
5. **Check Dependencies**: Ensure all dependencies are compatible with React version
6. **User-Friendly Messages**: Provide helpful error messages with actionable steps

## Common Error Patterns

### Pattern 1: React 19 Compatibility
- **Symptom**: `Cannot read properties of null` errors
- **Solution**: Explicitly import React, update dependencies

### Pattern 2: Type Mismatches
- **Symptom**: TypeScript errors with `undefined` vs `null`
- **Solution**: Use null coalescing operator (`??`)

### Pattern 3: Build Cache Issues
- **Symptom**: Unexpected build errors
- **Solution**: Clear `.next` directory and rebuild

### Pattern 4: Missing Configuration
- **Symptom**: API errors (404, 401)
- **Solution**: Check environment variables and dashboard settings

## References

- [React 19 Migration Guide](https://react.dev/blog/2024/04/25/react-19)
- [Radix UI Tooltip Documentation](https://www.radix-ui.com/primitives/docs/components/tooltip)
- [Liveblocks Error Handling](https://liveblocks.io/docs/errors)

