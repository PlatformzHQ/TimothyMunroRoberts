"use client";

import { Component, type ReactNode } from "react";

// If WebGL is unavailable or the 3D scene throws, fall back gracefully
// instead of crashing the section. The nav chips below always work.
export default class TreeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
