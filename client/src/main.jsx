import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('React Error Boundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrap">
          <div className="error-boundary-card">
            <h1 className="error-boundary-title">
              ⚠ RUNTIME ERROR
            </h1>
            <p className="error-boundary-text">The app crashed with:</p>
            <pre className="error-boundary-pre">
              {String(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="error-boundary-btn"
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

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
