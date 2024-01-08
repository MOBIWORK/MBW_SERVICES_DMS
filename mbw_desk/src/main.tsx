import React from 'react'
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FrappeProvider } from "frappe-react-sdk";
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <HelmetProvider>
    <FrappeProvider>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>

    </FrappeProvider>
  </HelmetProvider>,
)