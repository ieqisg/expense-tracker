import { useEffect, useState } from "react"



export function Expenses({setCurrentStep}) {

  const handlePrev = (e) => {
    e.preventDefault()
    setCurrentStep((prev) => prev-1)
  }


    return (
        <div className="min-h-screen bg-red-500 flex justify-center items-center">
      <form className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-auto">
        
        <div className="flex items-center justify-center gap-20"  > 
          
            <button 
            onClick={handlePrev}
            className="bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 w-[200px]">
            Previous
            </button>
            
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