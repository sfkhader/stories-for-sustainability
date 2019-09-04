import React from 'react';
import logo from './logo2.png';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';
import Register from './Register';
import Landing from './Landing';

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
    
    return (
      <div>
          <Router>
            <Route exact path ="/" component={Landing}/>
            <Route path="/register" component={Register}/>
  
  
          </Router>
      
      </div>
    );
  }

}

