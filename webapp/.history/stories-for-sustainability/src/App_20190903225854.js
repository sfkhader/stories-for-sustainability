import React from 'react';
import logo from './logo.png';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';
import Register from './Register';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

// const useStyles = 

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
    const link = props=> <Link to ="/register" {...props}/>
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className={classes.title}>
            Stories for Sustainability
          </p>
          <Router>
            <div>
              <Button variant="contained"  component={link} className = {classes.button}>Register</Button>
              <Button variant="contained" component ={link} className = {classes.button}>Login</Button>
            </div>
            <Route path="/register" component={Register}/>
  
  
          </Router>
        </header>
      </div>
    );
  }

}

// export default App;
