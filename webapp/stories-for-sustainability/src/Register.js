import React, {Component} from 'react';
import logo from './logo2.png';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Route from 'react-router-dom/Route';


export default class Register extends Component {
    // let useStyles = 
    constructor(props) {
        super();
    }
    render () {
        const classes = makeStyles(theme => ({
            button: {
              margin: theme.spacing(1),
            },
            input: {
              display: 'none',
            },
        }));

        return (
          <div classname = "Register">
            <header className="register-header">
              <img src={logo} className="App-logo" alt="logo" />
          {/* <React.Fragment> */}
            {/* <header> */}
              <p>
                Register
              </p>
              <Route render={({ history}) => (
              <Button
                className={classes.button}
                onClick={() => { history.push('/register') }}
                variant="contained"
              >
              Register
              </Button>
            )} />
              <div>
                {/* <Button variant="contained" className = {classes.button}>Register</Button> */}
                <Button variant="contained" className = {classes.button}>Testing</Button>
              </div>
                
            {/* </header> */}
          {/* </React.Fragment> */}
          </header>
          </div>
          
        );
    }

}

// export default Register;
