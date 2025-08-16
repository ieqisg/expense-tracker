



export function Income() {
    return (
        <div className="min-h-screen bg-red-500 flex justify-center items-center">
      <form className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-96">
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
              className="flex-1 border rounded-lg p-2"
              type="number"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Source of Income:</label>
          <input
            className="border rounded-lg p-2"
            type="text"
            placeholder="e.g. Salary, Business"
          />
        </div>

        <button 
          
          type="button"
          className="bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600"
        >
          Next
        </button>
      </form>


      
    </div>
    )
}