import { use, useEffect, useState } from "react"
import axios from "axios"



export function User({setCurrentStep}) {

    
    const [username, setUsername] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [date, setDate] = useState("")

    const [usernameError, setUsernameError] = useState(false)
    

    const handleNext = async (e) => {
        e.preventDefault()
        
        try {
          const response = await axios.get('http://localhost:5001/api/details/exist', {params: {username}})
          if (response.data && response.data.exists) {
            console.log("username already exists")
            return
          }
          setCurrentStep((prev) => prev + 1)
        } catch (error) {
          console.error(error)
        }
        
    }

    useEffect(() => {
        const savedfirstname = localStorage.getItem("firstname")
        const savedlastname = localStorage.getItem("lastname")
        const saveddate = localStorage.getItem("date")
        const savedUsername = localStorage.getItem("username")
        if (savedUsername) {
            setUsername(savedUsername)
        }
        if (savedfirstname) {
            setFirstName(savedfirstname)
        }
        if (savedlastname) {
            setLastName(savedlastname)
        }
        if (saveddate) {
            setDate(saveddate)
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("firstname", firstname)
        localStorage.setItem("lastname", lastname)
        localStorage.setItem("date", date)
        localStorage.setItem("username", username)
    }, [firstname, lastname, date, username])


  

    return (
      
    <div className="min-h-screen bg-[#090040] flex justify-center items-center">
      <div className="text-white absolute top-14 flex inline-block gap-20">
        <h1 className="flex items-center justify-center bg-green-500 h-10 w-10 rounded-full">1</h1>
        <h1 className="flex items-center justify-center bg-red-500 h-10 w-10 rounded-full">2</h1>
        <h1 className="flex items-center justify-center bg-red-500 h-10 w-10 rounded-full">3</h1>
        <h1 className="text-white absolute top-[60px] left-[6.5rem] text-3xl" >Details:</h1>
      </div>
      
      <form 
      className="bg-[#471396] p-6 rounded-2xl shadow-lg flex flex-col gap-5 w-96 text-white mt-16"
      onSubmit={handleNext}
       >

        <div className="flex items-center justify-start gap-4">
          
          <label className="mb-1 font-semibold ">Username:</label>
          <div className="flex items-center w-[500px]">
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="flex-1 border rounded-lg p-2 text-black"
                type="text"
                placeholder="Enter your username"
                required
            />

          </div>
        </div>

        <div className="flex items-center justify-start gap-11">
          
          <label className="mb-1 font-semibold ">First name:</label>
          <div className="flex items-center w-[500px]">
            <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                className="flex-1 border rounded-lg p-2 text-black"
                type="text"
                placeholder="Enter First Name"
                required
            />

          </div>
        </div>

        <div className="flex items-center justify-center gap-11">
          <label className="mb-1 font-semibold ">Last name:</label>
          <div className="flex items-center w-[500px]">
            <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                className="flex-1 border rounded-lg p-2 text-black"
                type="text"
                placeholder="Enter Last Name"
                required
            />

          </div>
        </div>
        
       <div className="flex items-center justify-center gap-12">
          <label className="mb-1 font-semibold ">Date:</label>
          <div className="flex items-center w-[500px]">
            <input
                className="flex-1 border rounded-lg p-2 text-black"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
            />

          </div>
        </div>
        
        <div className="flex items-center justify-center gap-20"  > 

            
            <button 
            type="submit"
            className="bg-[#B13BFF] hover:bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 w-[200px]">
            Next
            </button>

            
        </div>
      </form>


      
    </div>
    )
}