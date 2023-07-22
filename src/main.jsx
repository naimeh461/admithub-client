import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Router/Router'
import {RouterProvider} from "react-router-dom";
import AuthProvider from './Authentication/AuthProvider';
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
