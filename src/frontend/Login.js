import React from 'react';
import './styles/Login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login-page'>
      
      <div className="auth-container">
        <div className='auth-form-wrapper'>     
          <h1>Expense Tracker</h1>
          <h4>Log In</h4>
          <form>
            <div className='login-form'> 
              <div className='input-group'>
                <label htmlFor="email" required>Email</label>
                <input className="auth-input" type="email" id="email" name="email" placeholder="example@gmail.com" required />
              </div>
              <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input className="auth-input" type="password" id="password" name="password" placeholder="Enter your password" required/>
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