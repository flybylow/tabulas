"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class NotificationSettingsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Notification settings error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: "20px", color: "#666", fontSize: "14px" }}>
          <p>
            Notification settings are not enabled. Please enable at least one
            channel and kind in the{" "}
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
