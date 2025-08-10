import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUp from "../frontend/SignUp";
import Login from "../frontend/Login";


function routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element = {<SignUp />} />
                <Route path="/Login" element = {<Login />} />
            </Routes>
        </Router>
    )
}

export default routing;