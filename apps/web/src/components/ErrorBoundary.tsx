import type { ErrorInfo, ReactNode } from "react";
import React from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(error, errorInfo);
    }
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-center">
          <div className="max-w-lg rounded-3xl border border-secondary/30 bg-primary p-8 text-primary-foreground shadow-2xl">
            <p className="text-3xl font-bold text-secondary">Something went wrong.</p>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">Please refresh or call us at +977 980-4833357</p>
            <button type="button" onClick={this.handleRefresh} className="mt-8 inline-flex items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-foreground transition-transform hover:scale-[1.02]">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
