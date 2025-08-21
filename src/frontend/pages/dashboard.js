import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../Auth/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {
  const [error, setError] = useState("");
  const { session, signOut } = UserAuth();
  const [user, setUser] = useState(null)

  
  

  useEffect(() => {
    if (!session) return

    const fetchDetails = async () => {
        try {
            const { data } = await axios.get('http://localhost:5001/api/details/me', {
                params: { authUserId: session.user.id}
            }) 
            setUser(data)
        } catch (error) {
            console.error(error)
        }
        
    }
    fetchDetails()
  }, [session])
  


  const handleSignout = async () => {
    try {
      await signOut();
      Navigate("/");
    } catch (err) {
      setError("An unexpeceted error occured.");
    }
  };

  return (
    <div className="min-h-screen  flex-col flex  font-oswald font-bold m-5">
      <div className="flex justify-center text-3xl ">
        <h1>Dashboard</h1>
        <button onClick={handleSignout}>Logout</button>
      </div>

      <div>
        <hr className="border-t-2 border-black my-4 -mx-5" />
      </div>

      <div className="w-full h-96 bg-[#706969] flex flex-wrap">
        <div className="w-full md:w-1/2 h-full bg-red-500 flex justify-center items-center">
          <h1>Welcome{user?.firstname? ' , ' + user.firstname: ''}</h1>
        </div>

        <div className="w-full md:w-1/2 h-full bg-green-900 flex flex-col justify-center items-center">
          <h1>Remaining Balance:</h1>
          <h1>₱{user?.monthlyIncome? + user.monthlyIncome: ''}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
