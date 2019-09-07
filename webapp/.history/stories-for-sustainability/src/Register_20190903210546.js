import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
})); 
class Register extends React.Component {
    render () {
        const classes = useStyles();
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

export default Register;