"use client";

import { useSelf } from "@liveblocks/react/suspense";
import { ComponentProps } from "react";
import { DPPLayer } from "./DPPLayer";
import { MarketingLayer } from "./MarketingLayer";
import styles from "./DPP.module.css";

interface Props extends ComponentProps<"div"> {
  marketingCanEdit?: boolean;
  dppCanEdit?: boolean;
}

/**
 * DPP Component - Layered structure:
 * - Marketing Layer (background): Marketing team can edit
 * - DPP Layer (on top): Digital Product Passport data
 */
export function DPP({
  marketingCanEdit = false,
  dppCanEdit = false,
  className,
  ...props
}: Props) {
  const currentUser = useSelf((me) => me?.info);

  // Check if user is in marketing group (you can customize this logic)
  const isMarketing = currentUser?.name?.toLowerCase().includes("marketing");
  const isDPP = currentUser?.name?.toLowerCase().includes("dpp") || true; // Allow all for now

  return (
    <div className={`${styles.dppContainer} ${className || ""}`} {...props}>
      {/* Background Layer - Marketing */}
      <div className={styles.marketingLayerWrapper}>
        <MarketingLayer canEdit={marketingCanEdit || isMarketing} />
      </div>

      {/* Top Layer - DPP */}
      <div className={styles.dppLayerWrapper}>
        <DPPLayer canEdit={dppCanEdit || isDPP} />
      </div>
    </div>
  );
}
