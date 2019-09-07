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
            <header className="Register">
              <React.Fragment>
                {/* <header> */}
                  <p>
                  <center>Register</center>
                  </p>
                  <form>
                    <label>
                      Name:
                      <input type="text" name="name" />
                    </label>
                  </form>
                  <form>
                    <label>
                      Username:
                      <input type="text" name="username" />
                    </label>
                  </form>
                  <form>
                    <label>
                      Age:
                      <input type="text" name="age" />
                    </label>
                  </form>
                  <form>
                    <label>
                      Grade: 
                      <input type="text" name="grade" />
                    </label>
                  </form>
                  <form>
                    <label>
                      Password: 
                      <input type="text" name="password" />
                    </label>
                  </form>
                  <form>
                    <label>
                      Re-enter Password:
                      <input type="text" name="reenter" />
                    </label>
                  </form>
                  &nbsp;
                  <div>
                    <Button variant="contained" className = {classes.button}>Register</Button>
                  </div>
                  {/* </header> */}
              </React.Fragment>
            </header>
          </div>
        );
    }

}

// export default Register;
