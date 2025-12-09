"use client";

import { LiveMap } from "@liveblocks/client";
import { useStorage } from "@liveblocks/react/suspense";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  canEdit?: boolean;
}

/**
 * Marketing Layer - Background layer that marketing team can edit
 * This layer sits behind the DPP layer
 */
export function MarketingLayer({
  canEdit = false,
  className,
  ...props
}: Props) {
  const marketingLayer = useStorage((root) => root.marketingLayer);

  if (!marketingLayer || !(marketingLayer instanceof LiveMap)) {
    return (
      <div className={className} {...props}>
        <div className="marketing-layer-placeholder">
          Marketing layer - Marketing team can add content here
        </div>
      </div>
    );
  }

  // Render marketing content from storage
  const marketingContent = Array.from(marketingLayer.entries()).map(
    ([key, value]) => (
      <div key={key} className="marketing-item">
        {JSON.stringify(value)}
      </div>
    )
  );

  return (
    <div className={`marketing-layer ${className || ""}`} {...props}>
      <div className="marketing-content">
        {marketingContent.length > 0 ? (
          marketingContent
        ) : (
          <div className="marketing-layer-placeholder">
            Marketing layer - Add content here
          </div>
        )}
      </div>
      {canEdit && (
        <div className="marketing-editor">
          {/* Marketing editing UI can be added here */}
        </div>
      )}
    </div>
  );
}
