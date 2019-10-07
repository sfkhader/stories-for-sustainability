import logo from '../../logo2.png';
import '../../App.css';
import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';



const Landing = () => (

  <div className="Landing">
      {/* <Navigation/> */}

    <header className = "Landing-header">

      <img src={logo} className="Landing-logo" alt="logo" />
      
        Stories for Sustainability 
        <Link to={ROUTES.SIGN_UP}> 
        <button className="login-button" >
          Register
        </button>
        </Link>
        
        <Link to={ROUTES.SIGN_IN}> 
        <button className="login-button" >
          Log In
        </button>
        </Link>

      

    </header>

  </div>
);
export default Landing;
