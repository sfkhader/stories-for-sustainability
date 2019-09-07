import logo from '../../logo2.png';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Landing = () => (
  <div className="Landing">

    <h1 className = "Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />

      Stories for Sustainability 
      
      <Link to={ROUTES.SIGN_UP}> 
      <button class="button" >
        Register
      </button>
      </Link>
      

    </h1>

  </div>
);
export default Landing;
