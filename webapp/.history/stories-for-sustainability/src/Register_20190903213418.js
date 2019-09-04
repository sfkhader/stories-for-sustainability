import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';


export default class Register extends React.Component {
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
          <div>
            <header className="App-header">
              <p>
                Register
              </p>
              <div>
                <Button variant="contained" className = {classes.button}>Register</Button>
                <Button variant="contained" className = {classes.button}>Login</Button>
              </div>
      
      
            </header>
          </div>
        );
    }

}

// export default Register;
