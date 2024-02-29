// main.jsx
import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot from react-dom
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Use createRoot instead of ReactDOM.render for React 18
const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom

// Wrap your application with BrowserRouter and render it
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
