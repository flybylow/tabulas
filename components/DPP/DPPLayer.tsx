"use client";

import { useStorage } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  canEdit?: boolean;
}

/**
 * DPP Layer - Digital Product Passport layer that runs on top of marketing layer
 * This layer displays and allows editing of DPP data
 */
export function DPPLayer({ canEdit = false, className, ...props }: Props) {
  const dppLayer = useStorage((root) => root.dppLayer) as LiveObject<any> | null;

  if (!dppLayer) {
    return (
      <div className={className} {...props}>
        <div className="dpp-layer-placeholder">
          DPP Layer - Digital Product Passport data will appear here
        </div>
      </div>
    );
  }

  // Get DPP data from storage
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

