import logo from '../../logo2.png';
import '../../App.css';
import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Button from '@material-ui/core/Button';



const Landing = () => (

  <div className="Landing">
      {/* <Navigation/> */}

    <header className = "Landing-header">

      <img src={logo} className="Landing-logo" alt="logo" />
      
        Stories for Sustainability 
        <Link to={ROUTES.SIGN_UP} style ={{textDecoration: 'none'}}> 
        <Button variant = "contained" className="login-button" style ={{ margin: '20px'}}>
          Register
        </Button>
        </Link>
        
        <Link to={ROUTES.SIGN_IN} style ={{textDecoration: 'none'}}> 
        <Button variant = "contained" className="login-button" style ={{textDecoration: 'none'}}>
          Log In
        </Button>
        </Link>

      

    </header>

  </div>
);
export default Landing;
