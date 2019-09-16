import logo from '../../logo2.png';
import '../../App.css';
import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';



const Landing = () => (
  <div className="Landing">

    <header className = "Landing-header">
      <img src={logo} className="Landing-logo" alt="logo" />

        Stories for Sustainability 
        
        <Link to={ROUTES.SIGN_UP}> 
        <button class="button" >
          Register
        </button>
        </Link>
        
        <Link to={ROUTES.SIGN_IN}> 
        <button class="login-button" >
          Log In
        </button>
        </Link>

      

    </header>

  </div>
);
export default Landing;
