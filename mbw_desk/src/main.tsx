import React from 'react'
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FrappeProvider } from "frappe-react-sdk";
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BASE_URL } from './routes/path.ts';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs'

import 'dayjs/locale/vi';
dayjs.locale('vi');
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <ConfigProvider theme={{
    token: {
      fontFamily: "'Inter', sans-serif"
    }
  }}>
    <HelmetProvider>
      <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
        <BrowserRouter basename={BASE_URL}>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>

      </FrappeProvider>
    </HelmetProvider>

  </ConfigProvider>
)