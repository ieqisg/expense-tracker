import { use, useEffect, useState } from "react"



export function User({setCurrentStep}) {

    
    
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [date, setDate] = useState("")

    const handleNext = (e) => {
        e.preventDefault()
        setCurrentStep((prev) => prev+1)
        console.log(setCurrentStep)
    }

    useEffect(() => {
        const savedfirstname = localStorage.getItem("firstname")
        const savedlastname = localStorage.getItem("lastname")
        const saveddate = localStorage.getItem("date")
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
    }, [firstname, lastname, date])


  

    return (
    <div className="min-h-screen bg-red-500 flex justify-center items-center">
      <form 
      className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-96"
      onSubmit={handleNext}
       >
        <div className="flex items-center justify-start gap-5">
          <label className="mb-1 font-semibold ">First name:</label>
          <div className="flex items-center w-[500px]">
            <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                className="flex-1 border rounded-lg p-2"
                type="text"
                placeholder="Enter First Name"
                required
            />

          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <label className="mb-1 font-semibold ">Last name:</label>
          <div className="flex items-center w-[500px]">
            <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                className="flex-1 border rounded-lg p-2"
                type="text"
                placeholder="Enter Last Name"
                required
            />

          </div>
        </div>
        
       <div className="flex items-center justify-center gap-5">
          <label className="mb-1 font-semibold ">Date:</label>
          <div className="flex items-center w-[500px]">
            <input
                className="flex-1 border rounded-lg p-2"
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
            className="bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 w-[200px]">
            Next
            </button>

            
        </div>
      </form>


      
    </div>
    )
}