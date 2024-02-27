// main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import AppRoutes from './Routes'; // Import AppRoutes

// Use createRoot instead of ReactDOM.render for React 18
const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

// Wrap your application with BrowserRouter and render it
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <AppRoutes /> {/* Use AppRoutes */}
    </BrowserRouter>
  </React.StrictMode>
);
