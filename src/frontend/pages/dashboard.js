import { Link, Navigate } from "react-router-dom";
import { UserAuth } from '../Auth/AuthContext';
import { useState } from "react";

function Dashboard() {
    const [error, setError] = useState('')
    const { session, signOut } = UserAuth();

    const handleSignout = async() => {
        try {
            await signOut()
            Navigate('/')
        } catch (err) {
            setError('An unexpeceted error occured.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-5 font-oswald">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">Dashboard</h1>
        <button 
            onClick={handleSignout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded cursor-pointer font-semibold transition-colors duration-300">
            Log out
        </button>
        </div>
    )
}

export default Dashboard;