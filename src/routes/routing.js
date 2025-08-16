import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from "../frontend//Auth/SignUp";
import Login from "../frontend/Auth/Login";
import Dashboard from "../frontend/pages/dashboard";
import PrivateRoute from "../frontend/Auth/PrivateRoute";
import Form from "../frontend/pages/form";


export const router = createBrowserRouter([
    {path: "/", element: <SignUp />},
    {path: "/Login", element: <Login />},
    
    
    {path: "/Dashboard", element: (
    <PrivateRoute>
        <Dashboard />
        
    </PrivateRoute>
    ) 
    },

    {path: "/Form", element: (
    <PrivateRoute>
        <Form />
        
    </PrivateRoute>
    ) 
    }
    
])