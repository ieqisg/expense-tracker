import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Auth/AuthContext";


export function Confirm({ setCurrentStep }) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [sourceIncome, setSourceIncome] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const { session } = UserAuth()
  const navigate = useNavigate();

  

  useEffect(() => {
    //saves the data into localstorage
    const savedUsername = localStorage.getItem("username");
    const savedfirstname = localStorage.getItem("firstname");
    const savedlastname = localStorage.getItem("lastname");
    const saveddate = localStorage.getItem("date");
    const savedmonthlyIncome = localStorage.getItem("monthlyIncome");
    const savedsourceIncome = localStorage.getItem("sourceIncome");

    if (savedUsername) {
      setUsername(savedUsername);
    }

    if (savedfirstname) {
      setFirstName(savedfirstname);
    }

    if (savedlastname) {
      setLastName(savedlastname);
    }

    if (saveddate) {
      setDate(saveddate);
    }

    if (savedmonthlyIncome) {
      setMonthlyIncome(savedmonthlyIncome);
    }

    if (savedsourceIncome) {
      setSourceIncome(savedsourceIncome);
    }
  }, []);

  const handleSubmit = async (e) => {
    const formdata = {
      authUserId: session?.user?.id,
      username,
      firstname,
      lastname,
      date,
      monthlyIncome: Number(monthlyIncome),
      sourceIncome,
    };
    try {
      const response = await axios.post(
        "http://localhost:5001/api/details", //pass the data to /api/details in the server and the server saves it to the database
        formdata
      );
      localStorage.removeItem("username");
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("date");
      localStorage.removeItem("monthlyIncome");
      localStorage.removeItem("sourceIncome");
      setPopupSubmitted(true);
      setTimeout(() => setPopupSubmitted(false), 3000);
      setTimeout(() => navigate("/HomePage"), 3200);
      setPopup(false);

    } catch (error) {
      console.log("error:", error)
    }
      
    
  };

  const handleconfirm = (e) => {
    e.preventDefault();
    setPopup(true);
  };

  const handleCancelPopup = () => {
    setPopup(false);
  };

  const handleNext = (e) => {
    e.preventDefault();
   
      
    }
  

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center items-center">
      <div className="text-white absolute top-14 flex inline-block gap-20">
        <h1 className="flex items-center justify-center bg-[#6C48C5] h-10 w-10 rounded-full">
          1
        </h1>
        <h1 className="flex items-center justify-center bg-[#6C48C5] h-10 w-10 rounded-full">
          2
        </h1>
        <h1 className="flex items-center justify-center bg-[#6C48C5] h-10 w-10 rounded-full">
          3
        </h1>
        <h1 className="text-black absolute top-[60px] left-[6rem] text-3xl">
          Summary:
        </h1>
      </div>
      <form
        className="bg-[#273F4F] p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-96 text-white mt-7"
        onSubmit={handleNext}
      >
        <div className="flex flex-col gap-3 text-lg">
          <div className="flex justify-between">
            <span>Username:</span>
            <span className="text-[#F97A00]">{username}</span>
          </div>
          <div className="flex justify-between">
            <span>First Name:</span>
            <span className="text-[#F97A00]">{firstname}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Name:</span>
            <span className="text-[#F97A00]">{lastname}</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Income:</span>
            <span className="text-[#F97A00]">
              ₱{monthlyIncome ? Number(monthlyIncome).toLocaleString() : 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Source of Income:</span>
            <span className="text-[#F97A00]">{sourceIncome}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span className="text-[#F97A00]">{date}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-20">
          <button
            onClick={handlePrev}
            className="bg-red-500 text-white font-semibold py-2 rounded-lg  w-[200px]"
          >
            Previous
          </button>

          <button
            onClick={handleconfirm}
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 rounded-lg  w-[200px]"
          >
            Confirm
          </button>
        </div>
      </form>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Submission?</h2>
            <div className="flex justify-end gap-5">
              <button onClick={handleCancelPopup}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {popupSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Submitted successfully</h2>
          </div>
        </div>
      )}
    </div>
  );
}
