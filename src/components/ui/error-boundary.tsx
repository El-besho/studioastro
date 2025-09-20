import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="flex flex-col items-center justify-center p-8 text-center"
          role="alert"
          aria-live="polite"
          aria-labelledby="error-heading"
          aria-describedby="error-description"
        >
          <div className="mb-4 rounded-full bg-destructive/10 p-4" aria-hidden="true">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 id="error-heading" className="mb-2 text-lg font-semibold">
            حدث خطأ غير متوقع
          </h2>
          <p id="error-description" className="mb-4 text-sm text-muted-foreground">
            نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.
          </p>
          <Button 
            onClick={this.handleRetry} 
            variant="outline" 
            size="sm"
            className="touch-target"
            aria-label="إعادة المحاولة لحل المشكلة"
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            إعادة المحاولة
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}