import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { UserAuth } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { session, loginNewUser } = UserAuth();
  console.log(session)

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    try {
      const result = await loginNewUser(email, password)

      if (result.success) {
        navigate('/Dashboard')
      }
    } catch (err) {
      setError("an error occured")

    } finally {
      setLoading(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="text-center text-white text-2xl max-w-md w-full">     
          <h1 className="text-4xl font-bold mb-3">Expense Tracker</h1>
          <h4 className="text-xl mb-8">Log In</h4>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center space-y-5"> 
              <div className="flex flex-col items-start w-full max-w-lg">
                <label htmlFor="email" required className="mb-2 text-base text-white font-semibold">Email</label>
                <input 
                className="w-full h-12 rounded border-0 px-5 py-3 text-lg font-bold bg-white text-gray-800 placeholder-gray-500" 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com" 
                required />

              </div>
              <div className="flex flex-col items-start w-full max-w-lg">
                <label htmlFor="password" className="mb-2 text-base text-white font-semibold">Password</label>
                <div className="relative w-full">
                  <input  
                  className="w-full h-12 rounded border-0 px-5 py-3 pr-12 text-lg font-bold bg-white text-gray-800 placeholder-gray-500" 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"  
                  required/>
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-0 text-lg cursor-pointer p-0 w-8 h-8 flex items-center justify-center hover:bg-black hover:bg-opacity-10 hover:rounded-full" 
                    type="button"
                    onClick={togglePassword}>
                    {showPassword ? '🫣' : '👁️'}
                  </button>
                </div>
              </div>
              <button className="h-12 w-full max-w-lg rounded-lg border-0 bg-green-500 font-bold text-black cursor-pointer font-oswald mt-3 hover:bg-purple-800 transition-colors duration-500" type="submit">Log In</button>
              <p className="text-sm mt-8">Don't have an Account? <Link className="text-red-500" to="/">Sign Up Here</Link></p>
            </div>
          </form>
        </div> 
      </div>
      <div 
        className="h-screen w-2/5 bg-purple-400 bg-no-repeat bg-center border-r border-black flex-shrink-0 flex items-center justify-center"
        style={{ backgroundImage: "url('/logo.png')", backgroundSize: "600px" }}
      >
          
      </div>
      
    </div>
  );
}

export default Login;