import React from 'react';
import '../styles/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { UserAuth } from '../Auth/AuthContext';

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { session, signUpNewUser } = UserAuth();
  console.log(session)

  const handleSignUp = async(e) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    try {
      const result = await signUpNewUser(email, password)

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
    <div className='header'>
      
      <div className="sign-up-container">
        <div className='sign-up'>     
          <h1>Expense Tracker</h1>
          <h4>Sign up</h4>
          <form onSubmit={handleSignUp} >
            <div className='form'> 
              <div className='form-group'>
                <label htmlFor="email" required>Email</label>
                <input 
                className="form-input" 
                type="text" 
                id="email" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com" 
                required />
              </div>
              
              <div className='form-group'>
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input  
                  className="form-input" 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  name="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"  
                  required/>
                  <button 
                    className='showpass' 
                    type="button"
                    onClick={togglePassword}>
                    {showPassword ? '🫣' : '👁️'}
                  </button>
                </div>
              </div>
              
              <button className='button' type='submit'>{ loading ? "Signing In": "Sign Up"}</button>
            </div>
          </form>
            <p style={{fontSize:'15px', marginTop:'30px'}}>
                Already have an account? <Link style={{color:'red'}} to="/Login">Log In Here</Link>
              </p>
        </div> 
      </div>
      <div className='left'>
          
      </div>
      
    </div>
  );
}

export default SignUp;