import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from "../frontend//components/SignUp";
import Login from "../frontend/components/Login";
import Dashboard from "../frontend/components/dashboard";
import PrivateRoute from "../frontend/components/PrivateRoute";


export const router = createBrowserRouter([
    {path: "/", element: <SignUp />},
    {path: "/Login", element: <Login />},
    
    {path: "/Dashboard", element: (
    <PrivateRoute>
        <Dashboard />
    </PrivateRoute>
    ) 
    }
])