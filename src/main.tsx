import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Test change: verify the toolchain works correctly

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
