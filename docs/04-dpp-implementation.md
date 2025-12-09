# DPP Implementation - Digital Product Passport

## Overview

This document describes the implementation of the Digital Product Passport (DPP) document type with a layered architecture consisting of a marketing layer and a DPP data layer.

## Requirements

The DPP document type needed:
1. **Marketing Layer**: Background layer for marketing content (editable by marketing team)
2. **DPP Layer**: Data layer for Digital Product Passport information
3. Separate access controls for each layer
4. Visual representation in the document list

## Implementation Steps

### 1. Add DPP Document Type

Updated `types/document.ts`:

```typescript
export type DocumentType = "text" | "whiteboard" | "canvas" | "note" | "dpp";
```

### 2. Update Liveblocks Storage Configuration

Modified `liveblocks.config.ts` to include DPP-specific storage:

```typescript
export function createInitialStorage(): Liveblocks["Storage"] {
  return {
    notes: new LiveMap(), // Whiteboard
    records: new LiveMap(), // Canvas
    cover: null, // Note
    icon: null, // Note
    title: "", // Note
    marketingLayer: new LiveMap(), // DPP: Marketing background layer
    dppLayer: new LiveObject({}), // DPP: Digital Product Passport data layer
  };
}
```

### 3. Create DPP Components

Created component structure in `components/DPP/`:

#### MarketingLayer Component

```typescript
// components/DPP/MarketingLayer.tsx
"use client";

import { useStorage } from "@liveblocks/react/suspense";
import { LiveMap } from "@liveblocks/client";

export function MarketingLayer({ canEdit = false, ...props }) {
  const marketingLayer = useStorage((root) => root.marketingLayer);

  if (!marketingLayer || !(marketingLayer instanceof LiveMap)) {
    return <div>Marketing layer - Marketing team can add content here</div>;
  }

  // Render marketing content
  const marketingContent = Array.from(marketingLayer.entries()).map(([key, value]) => (
    <div key={key}>{JSON.stringify(value)}</div>
  ));

  return (
    <div className="marketing-layer">
      <div className="marketing-content">
        {marketingContent.length > 0 ? marketingContent : (
          <div>Marketing layer - Add content here</div>
        )}
      </div>
      {canEdit && <div className="marketing-editor">{/* Editing UI */}</div>}
    </div>
  );
}
```

#### DPPLayer Component

```typescript
// components/DPP/DPPLayer.tsx
"use client";

import { useStorage } from "@liveblocks/react/suspense";

export function DPPLayer({ ...props }) {
  const dppLayer = useStorage((root) => root.dppLayer);

  return (
    <div className="dpp-layer">
      {/* DPP data layer content */}
    </div>
  );
}
```

#### Main DPP Component

```typescript
// components/DPP/DPP.tsx
"use client";

import { MarketingLayer } from "./MarketingLayer";
import { DPPLayer } from "./DPPLayer";

export function DPP({ canEditMarketing = false }) {
  return (
    <div className="dpp-container">
      <MarketingLayer canEdit={canEditMarketing} />
      <DPPLayer />
    </div>
  );
}
```

### 4. Create DPP Document View

Created `app/dpp/[id]/DPPDocumentView.tsx`:

```typescript
"use client";

import { DPP } from "@/components/DPP";

export function DPPDocumentView({ initialDocument, initialError }) {
  if (initialError) {
    return <div>Error loading document</div>;
  }

  if (!initialDocument) {
    return <div>Document not found</div>;
  }

  return (
    <div>
      <DPP canEditMarketing={/* check if user is in marketing team */} />
    </div>
  );
}
```

### 5. Create DPP Page Route

Created `app/dpp/[id]/page.tsx`:

```typescript
import { getDocument } from "@/lib/actions";
import { DPPDocumentView } from "./DPPDocumentView";

export default async function DPPage({ params }: Props) {
  const { id } = await params;
  const { data: document, error } = await getDocument({ documentId: id });

  return (
    <DPPDocumentView
      initialDocument={document ?? null}
      initialError={error ?? null}
    />
  );
}
```

### 6. Add DPP to Document Creation

Updated `components/Documents/DocumentCreatePopover.tsx`:

```typescript
<Button
  icon={<PlusIcon />}
  onClick={() => {
    createNewDocument("Untitled", "dpp");
  }}
  variant="subtle"
  disabled={disableButtons}
>
  DPP
</Button>
```

### 7. Add DPP Icon

Updated `components/Documents/DocumentIcon.tsx`:

```typescript
export function DocumentIcon({ type, ...props }: Props) {
  switch (type) {
    case "dpp":
      return <DPPDocumentIcon {...props} />;
    // ... other cases
  }
}

function DPPDocumentIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...props}>
      {/* Layered document icon representing DPP with marketing layer */}
    </svg>
  );
}
```

## Architecture

### Layer Structure

```
DPP Document
├── Marketing Layer (Background)
│   └── LiveMap - Marketing content
│       └── Editable by marketing team
└── DPP Layer (Foreground)
    └── LiveObject - DPP data
        └── Editable by authorized users
```

### Storage Structure

- `marketingLayer`: `LiveMap<string, any>` - Marketing content items
- `dppLayer`: `LiveObject<{}>` - DPP data structure

## Error Encountered

### Problem: Type Mismatch in Page Component

**Error:** TypeScript error when `document` or `error` could be `undefined` instead of `null`.

**Solution:** Added null coalescing operator:

```typescript
return (
  <DPPDocumentView
    initialDocument={document ?? null}
    initialError={error ?? null}
  />
);
```

### Problem: MarketingLayer Type Guard

**Error:** `marketingLayer` not being recognized as `LiveMap` type.

**Solution:** Added explicit type guard:

```typescript
if (!marketingLayer || !(marketingLayer instanceof LiveMap)) {
  return <div>Marketing layer placeholder</div>;
}
```

## Files Created

- `components/DPP/DPP.tsx` - Main DPP component
- `components/DPP/MarketingLayer.tsx` - Marketing layer component
- `components/DPP/DPPLayer.tsx` - DPP data layer component
- `components/DPP/DPP.module.css` - DPP styles
- `components/DPP/index.ts` - Component exports
- `app/dpp/[id]/page.tsx` - DPP document page
- `app/dpp/[id]/DPPDocumentView.tsx` - DPP document view component

## Files Modified

- `types/document.ts` - Added "dpp" document type
- `liveblocks.config.ts` - Added DPP storage structure
- `components/Documents/DocumentCreatePopover.tsx` - Added DPP creation button
- `components/Documents/DocumentIcon.tsx` - Added DPP icon

## Future Enhancements

1. **Marketing Layer Editor**: Full-featured editor for marketing content
2. **DPP Data Schema**: Define structured schema for DPP data
3. **Access Control**: Implement separate permissions for marketing layer
4. **Visual Editor**: Rich visual editor for both layers
5. **Export/Import**: Export DPP data in standard formats

## References

- [Liveblocks Storage Documentation](https://liveblocks.io/docs/storage)
- [Liveblocks LiveMap Documentation](https://liveblocks.io/docs/api-reference/liveblocks-client#LiveMap)
- [Liveblocks LiveObject Documentation](https://liveblocks.io/docs/api-reference/liveblocks-client#LiveObject)

