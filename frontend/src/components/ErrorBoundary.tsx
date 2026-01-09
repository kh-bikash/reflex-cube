import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-8">
                    <div className="max-w-2xl w-full space-y-4">
                        <h1 className="text-3xl font-bold text-red-500">Something went wrong.</h1>
                        <div className="bg-black/50 p-4 rounded border border-red-500/20 font-mono text-sm overflow-auto max-h-[60vh] whitespace-pre-wrap">
                            <p className="text-red-300 font-bold mb-2">{this.state.error?.toString()}</p>
                            <p className="text-zinc-500">{this.state.errorInfo?.componentStack}</p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
