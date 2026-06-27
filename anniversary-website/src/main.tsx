import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// ---------------------------------------------------------------------------
// Top-level error boundary (Req 15.4)
// ---------------------------------------------------------------------------
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Something went wrong. Please refresh the page.</p>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Mount
// ---------------------------------------------------------------------------
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
