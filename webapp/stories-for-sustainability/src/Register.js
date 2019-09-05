import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';


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
          <React.Fragment>
            {/* <header> */}
              <p>
                Register
              </p>
              <div>
                <Button variant="contained" className = {classes.button}>Register</Button>
                <Button variant="contained" className = {classes.button}>Login</Button>
                <Button variant="contained" className = {classes.button}>Testing</Button>
              </div>
      
      
            {/* </header> */}
          </React.Fragment>
        );
    }

}

// export default Register;
