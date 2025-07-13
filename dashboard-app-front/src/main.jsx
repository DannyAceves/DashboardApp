import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </AuthProvider>
);
