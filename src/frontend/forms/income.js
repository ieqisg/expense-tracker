import { useEffect, useState } from "react"



export function Income({setCurrentStep}) {

  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [sourceIncome, setSourceIncome] = useState("")
  
  useEffect(() => {
    const savedmonthlyIncome = localStorage.getItem("monthlyIncome")
    const savedsourceIncome = localStorage.getItem("sourceIncome")
    

    if (savedmonthlyIncome) {
      setMonthlyIncome(savedmonthlyIncome)
    }

    if (savedsourceIncome) {
      setSourceIncome(savedsourceIncome)
    }

    
  }, [])

  useEffect(() => {
    localStorage.setItem("monthlyIncome", monthlyIncome)
    localStorage.setItem("sourceIncome", sourceIncome)
  }, [monthlyIncome, sourceIncome])


  const handleNext = (e) => {
    e.preventDefault()
    setCurrentStep((prev) => prev+1)
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setCurrentStep((prev) => prev-1)
  }

    return (
        <div className="min-h-screen bg-red-500 flex justify-center items-center">
      <form 
      className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-96"
      onSubmit={handleNext}
       >
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Monthly Income:</label>
          <div className="flex items-center gap-2">
            <input
              
                className="w-12 text-center border rounded-lg p-2 bg-gray-100"
                type="text"
                value="₱"
                readOnly
            />
            <input
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="flex-1 border rounded-lg p-2"
                type="number"
                placeholder="Enter amount"
                required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label  className="mb-1 font-semibold">Source of Income:</label>
          <input
              value={sourceIncome}
              onChange={(e) => setSourceIncome(e.target.value)}
              className="border rounded-lg p-2"
              type="text"
              placeholder="e.g. Salary, Business"
              required
            
          />
        </div>

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