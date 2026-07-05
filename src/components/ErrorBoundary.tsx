import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { ServerErrorPanel } from "./ErrorStates";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught sartorial rendering error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6">
          <ServerErrorPanel onRetry={this.handleRetry} />
        </div>
      );
    }

    return this.props.children;
  }
}
