import React from 'react';
import logo from './logo2.png';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';
// import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';

export default class App extends React.Component {
  constructor(props) {
        super();
  }
    render() {
      const classes = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        input: {
          display: 'none',
        },
      })); 

      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <p>
              Stories for Sustainability
            </p>
            {/* <Button variant="contained"  component={link} className = {classes.button}>Register</Button> */}
            <Route render={({ history}) => (
              <Button
                className={classes.button}
                onClick={() => { history.push('/register') }}
                variant="contained"
              >
              Register
              </Button>
            )} />
            &nbsp;
            <Route render={({ history}) => (
              <Button
                className={classes.button}
                onClick={() => { history.push('/login') }}
                variant="contained"
              >
              Login
              </Button>
            )} />

          </header>
        </div>
      );
    }
}