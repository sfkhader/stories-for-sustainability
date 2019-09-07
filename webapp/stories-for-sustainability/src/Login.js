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
          <div className="App">
            <header className="Login">
              <React.Fragment>
                {/* <header> */}
                  <p>
                  <center>Login</center>
                  </p>
                  <form>
                    <label>
                      Username:
                      <input type="text" name="username" />
                    </label>
                  </form>
                  <form>
                    <label>
                      Password:
                      <input type="text" name="password" />
                    </label>
                  </form>
                  &nbsp;
                  <div>
                    <Button variant="contained" className = {classes.button}>Login</Button>
                  </div>
                  {/* </header> */}
              </React.Fragment>
            </header>
          </div>
        );
    }

}

// export default Register;
