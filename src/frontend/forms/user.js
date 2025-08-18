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
      
    <div className="min-h-screen bg-[#090040] flex justify-center items-center">
      <div className="text-white absolute top-14 flex inline-block gap-20">
        <h1 className="flex items-center justify-center bg-green-500 h-10 w-10 rounded-full">1</h1>
        <h1 className="flex items-center justify-center bg-red-500 h-10 w-10 rounded-full">2</h1>
        <h1 className="flex items-center justify-center bg-red-500 h-10 w-10 rounded-full">3</h1>
        <h1 className="text-white absolute top-[60px] left-[6.5rem] text-3xl" >Details:</h1>
      </div>
      
      <form 
      className="bg-[#471396] p-6 rounded-2xl shadow-lg flex flex-col gap-5 w-96 text-white"
      onSubmit={handleNext}
       >
        <div className="flex items-center justify-start gap-5">
          
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

        <div className="flex items-center justify-center gap-5">
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
        
       <div className="flex items-center justify-center gap-6">
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