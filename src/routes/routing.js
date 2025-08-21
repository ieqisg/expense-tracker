import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from "../frontend//Auth/SignUp";
import Login from "../frontend/Auth/Login";
import HomePage from "../frontend/pages/homePage";
import PrivateRoute from "../frontend/Auth/PrivateRoute";
import Form from "../frontend/pages/form";
import { Home } from "lucide-react";


export const router = createBrowserRouter([
    {path: "/", element: <Login />},
    {path: "/Signup", element: <SignUp />},
    
    
    {path: "/homePage", element: (
    <PrivateRoute>
        <HomePage />
        
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