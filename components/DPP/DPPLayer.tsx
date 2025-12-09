"use client";

import { LiveObject } from "@liveblocks/client";
import { useStorage } from "@liveblocks/react/suspense";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  canEdit?: boolean;
}

/**
 * DPP Layer - Digital Product Passport layer that runs on top of marketing layer
 * This layer displays and allows editing of DPP data (EU compliance information,
 * product lifecycle data, sustainability metrics, etc.)
 *
 * Uses Liveblocks LiveObject for collaborative editing of DPP data.
 */
export function DPPLayer({ canEdit = false, className, ...props }: Props) {
  // Get DPP layer data from Liveblocks storage
  const dppLayer = useStorage(
    (root) => root.dppLayer
  ) as LiveObject<any> | null;

  // Show placeholder if DPP layer doesn't exist in storage
  if (!dppLayer) {
    return (
      <div className={className} {...props}>
        <div className="dpp-layer-placeholder">
          DPP Layer - Digital Product Passport data will appear here
        </div>
      </div>
    );
  }

  // Convert LiveObject to plain JavaScript object for rendering
  const dppData = dppLayer.toObject();

  return (
    <div className={`dpp-layer ${className || ""}`} {...props}>
      <div className="dpp-content">
        {dppData && Object.keys(dppData).length > 0 ? (
          <div className="dpp-data">
            <h3>Digital Product Passport</h3>
            <pre>{JSON.stringify(dppData, null, 2)}</pre>
          </div>
        ) : (
          <div className="dpp-layer-placeholder">
            DPP Layer - Load or create DPP data
          </div>
        )}
      </div>
      {canEdit && (
        <div className="dpp-editor">
          {/* DPP editing UI can be added here */}
        </div>
      )}
    </div>
  );
}
