import React from 'react';
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { UserAuth } from '../Auth/AuthContext';

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
    <div className='login-page'>
      
      <div className="auth-container">
        <div className='auth-form-wrapper'>     
          <h1>Expense Tracker</h1>
          <h4>Log In</h4>
          <form onSubmit={handleLogin}>
            <div className='login-form'> 
              <div className='input-group'>
                <label htmlFor="email" required>Email</label>
                <input 
                className="auth-input" 
                type="email" 
                id="email" 
                name="email" 
                value={email}
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
                  value={password}
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
              <button className='login-btn' type='submit'>Log In</button>
              <p style={{fontSize:'15px', marginTop:'30px'}}>Don't have an Account? <Link style={{color:'red'}} to="/">Sign Up Here</Link></p>
            </div>
          </form>
        </div> 
      </div>
      <div className='brand-panel'>
          
      </div>
      
    </div>
  );
}

export default Login;