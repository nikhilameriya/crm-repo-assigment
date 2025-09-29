import React from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.css';

/**
 * Error Boundary component for graceful error handling
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error,
      errorInfo,
      eventId: Math.random().toString(36).substr(2, 9)
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚫 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // Report to error tracking service
    this.reportError(error, errorInfo);

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  reportError = (error, errorInfo) => {
    // In a real app, report to error tracking service like Sentry
    // Sentry.captureException(error, { contexts: { react: errorInfo } });
    
    // For demo, just log
    console.log('Error reported to monitoring service:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      eventId: this.state.eventId
    });
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          retry: this.handleRetry,
          eventId: this.state.eventId
        });
      }

      // Default fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              😵
            </div>
            
            <h2 className="error-boundary__title">
              {this.props.title || 'Oops! Something went wrong'}
            </h2>
            
            <p className="error-boundary__message">
              {this.props.message || 'We\'re sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.'}
            </p>
            
            {this.state.eventId && (
              <p className="error-boundary__event-id">
                Error ID: <code>{this.state.eventId}</code>
              </p>
            )}
            
            <div className="error-boundary__actions">
              <button 
                onClick={this.handleRetry}
                className="btn btn--primary"
                type="button"
              >
                Try Again
              </button>
              
              <button 
                onClick={this.handleReload}
                className="btn btn--secondary"
                type="button"
              >
                Reload Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onError: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
};

export default ErrorBoundary;