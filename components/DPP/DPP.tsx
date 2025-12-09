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
 * DPP Component - Layered structure for Digital Product Passport:
 * - Marketing Layer (background): Marketing team can edit branding/marketing content
 * - DPP Layer (on top): Digital Product Passport data for EU compliance
 *
 * This component implements the layered architecture where marketing content
 * appears as a background and DPP data overlays on top, allowing both layers
 * to be edited independently by different user groups.
 */
export function DPP({
  marketingCanEdit = false,
  dppCanEdit = false,
  className,
  ...props
}: Props) {
  // Get current user info from Liveblocks
  const currentUser = useSelf((me) => me?.info);

  // Determine edit permissions based on user name/group
  // TODO: Replace with proper group-based permission checking
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
