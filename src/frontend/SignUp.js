import React from 'react';
import './styles/SignUp.css'
import { Link } from 'react-router-dom'


function SignUp() {



  return (
    <div className='header'>
      
      <div className= "sign-up-container">
        <div className='sign-up'>     
          <h1>Expense Tracker</h1>
          <h4>Sign up</h4>
          <form>
            <div className='form'> 
              <div className='form-group'>
                <label htmlFor="email" required>Email</label>
                <input className="form-input" type="text" id="email" name="email" placeholder="example@gmail.com" required />
              </div>
              <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input className="form-input" type="text" id="password" name="password" placeholder="Enter your password" required/>
              </div>
              <button className='button' type='submit'>Sign Up</button>
              <p style={{fontSize:'15px', marginTop:'30px'}}>Already have an account? <Link style={{color:'red'}} to="/Login">Log In Here</Link></p>
            </div>
          </form>
        </div> 
      </div>
      <div className='left'>
          
      </div>
      
    </div>
  );
}

export default SignUp;