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
        <div>
        <h1>Tite</h1>
        <button onClick={handleSignout}>Log out</button>
        </div>
    )
}

export default Dashboard;