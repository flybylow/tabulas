# Spam Protection for Public Whiteboard

## Overview

This document describes the implementation of spam protection for the public whiteboard homepage.

## Status

⏳ **Pending Implementation**

## Requirements

1. Prevent spam on the public whiteboard
2. Allow legitimate public interaction (replies, post-its)
3. Implement rate limiting
4. Content validation
5. User behavior tracking

## Spam Protection Strategies

### Strategy 1: Rate Limiting

Limit the number of actions a user can perform within a time window.

**Implementation:**
```typescript
// lib/utils/rateLimiter.ts
interface RateLimitConfig {
  maxActions: number;
  windowMs: number;
}

export function createRateLimiter(config: RateLimitConfig) {
  const userActions = new Map<string, number[]>();

  return (userId: string): boolean => {
    const now = Date.now();
    const userActionTimes = userActions.get(userId) || [];
    
    // Remove old actions outside the window
    const recentActions = userActionTimes.filter(
      time => now - time < config.windowMs
    );

    if (recentActions.length >= config.maxActions) {
      return false; // Rate limit exceeded
    }

    recentActions.push(now);
    userActions.set(userId, recentActions);
    return true; // Action allowed
  };
}
```

### Strategy 2: Content Validation

Validate content before allowing it to be added to the whiteboard.

**Implementation:**
```typescript
// lib/utils/contentValidator.ts
export function validateContent(content: string): {
  isValid: boolean;
  reason?: string;
} {
  // Check for spam patterns
  if (content.length > 10000) {
    return { isValid: false, reason: "Content too long" };
  }

  // Check for repeated characters (e.g., "aaaaaaa")
  if (/(.)\1{20,}/.test(content)) {
    return { isValid: false, reason: "Repeated characters detected" };
  }

  // Check for URLs (optional - might want to allow some)
  const urlCount = (content.match(/https?:\/\//g) || []).length;
  if (urlCount > 5) {
    return { isValid: false, reason: "Too many URLs" };
  }

  return { isValid: true };
}
```

### Strategy 3: User Behavior Tracking

Track user behavior patterns to identify spam accounts.

**Implementation:**
```typescript
// lib/utils/spamDetector.ts
interface UserBehavior {
  actionCount: number;
  lastActionTime: number;
  suspiciousPatterns: string[];
}

export class SpamDetector {
  private userBehaviors = new Map<string, UserBehavior>();

  isSpam(userId: string, action: string): boolean {
    const behavior = this.userBehaviors.get(userId) || {
      actionCount: 0,
      lastActionTime: 0,
      suspiciousPatterns: [],
    };

    const now = Date.now();
    const timeSinceLastAction = now - behavior.lastActionTime;

    // Too many actions too quickly
    if (timeSinceLastAction < 100 && behavior.actionCount > 10) {
      return true;
    }

    // Update behavior
    behavior.actionCount++;
    behavior.lastActionTime = now;
    this.userBehaviors.set(userId, behavior);

    return false;
  }
}
```

### Strategy 4: IP-Based Rate Limiting

Track actions by IP address to prevent abuse from anonymous users.

**Implementation:**
```typescript
// lib/utils/ipRateLimiter.ts
export function createIPRateLimiter() {
  const ipActions = new Map<string, number[]>();

  return (ip: string, maxActions: number = 100, windowMs: number = 60000) => {
    const now = Date.now();
    const actions = ipActions.get(ip) || [];
    const recentActions = actions.filter(time => now - time < windowMs);

    if (recentActions.length >= maxActions) {
      return false;
    }

    recentActions.push(now);
    ipActions.set(ip, recentActions);
    return true;
  };
}
```

### Strategy 5: CAPTCHA Integration

Implement CAPTCHA for suspicious behavior.

**Implementation:**
```typescript
// lib/utils/captcha.ts
export async function verifyCaptcha(token: string): Promise<boolean> {
  // Integrate with reCAPTCHA, hCaptcha, or similar
  // Return true if CAPTCHA is valid
  return true;
}
```

## Integration Points

### 1. Liveblocks Authorization Endpoint

Add spam checks in the authorization endpoint:

```typescript
// app/api/liveblocks-authorize/route.ts
import { getClientIP } from "@/lib/utils/getClientIP";
import { createIPRateLimiter } from "@/lib/utils/ipRateLimiter";

const ipRateLimiter = createIPRateLimiter();

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  
  if (!ipRateLimiter(ip, 50, 60000)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
    });
  }

  // ... rest of authorization
}
```

### 2. Whiteboard Component

Add content validation in the whiteboard component:

```typescript
// components/Whiteboard/Whiteboard.tsx
import { validateContent } from "@/lib/utils/contentValidator";
import { createRateLimiter } from "@/lib/utils/rateLimiter";

const rateLimiter = createRateLimiter({ maxActions: 10, windowMs: 60000 });

function handleAddNote(content: string, userId: string) {
  // Rate limiting
  if (!rateLimiter(userId)) {
    alert("Too many actions. Please wait a moment.");
    return;
  }

  // Content validation
  const validation = validateContent(content);
  if (!validation.isValid) {
    alert(validation.reason);
    return;
  }

  // Add note
  // ...
}
```

## Configuration

Create a configuration file for spam protection settings:

```typescript
// lib/config/spamProtection.ts
export const spamProtectionConfig = {
  rateLimit: {
    maxActions: 10,
    windowMs: 60000, // 1 minute
  },
  contentValidation: {
    maxLength: 10000,
    maxUrls: 5,
    allowRepeatedChars: false,
  },
  ipRateLimit: {
    maxActions: 100,
    windowMs: 60000,
  },
  captcha: {
    enabled: false,
    threshold: 5, // Show CAPTCHA after N suspicious actions
  },
};
```

## Monitoring

Track spam attempts for analysis:

```typescript
// lib/utils/spamLogger.ts
export function logSpamAttempt(
  userId: string,
  ip: string,
  reason: string,
  action: string
) {
  // Log to database or analytics service
  console.log({
    timestamp: new Date().toISOString(),
    userId,
    ip,
    reason,
    action,
  });
}
```

## Files to Create

- `lib/utils/rateLimiter.ts` - Rate limiting utility
- `lib/utils/contentValidator.ts` - Content validation
- `lib/utils/spamDetector.ts` - Spam detection
- `lib/utils/ipRateLimiter.ts` - IP-based rate limiting
- `lib/utils/getClientIP.ts` - Get client IP address
- `lib/config/spamProtection.ts` - Spam protection configuration
- `lib/utils/spamLogger.ts` - Spam attempt logging

## Files to Modify

- `app/api/liveblocks-authorize/route.ts` - Add rate limiting
- `components/Whiteboard/Whiteboard.tsx` - Add content validation
- `app/page.tsx` - Add spam protection for homepage

## Testing

1. **Rate Limiting Test**: Send multiple requests quickly, verify blocking
2. **Content Validation Test**: Submit invalid content, verify rejection
3. **IP Rate Limiting Test**: Test from different IPs, verify limits
4. **Spam Detection Test**: Simulate spam patterns, verify detection

## Future Enhancements

1. **Machine Learning**: Use ML to detect spam patterns
2. **User Reputation**: Build reputation system for users
3. **Moderation Tools**: Admin tools for content moderation
4. **Whitelist/Blacklist**: Allow/block specific users or IPs
5. **Analytics Dashboard**: Dashboard for monitoring spam attempts

## References

- [Liveblocks Rate Limiting](https://liveblocks.io/docs/rate-limiting)
- [OWASP Spam Prevention](https://owasp.org/www-community/attacks/Spam)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha)

