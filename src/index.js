import React from 'react';
import ReactDOM from 'react-dom/client';
import { router }  from './routes/routing.js';
import { RouterProvider, Router } from 'react-router-dom';
import { AuthContextProvider } from './frontend/Auth/AuthContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
    

  </React.StrictMode>
);


