import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Register from "./Register";
import Container from "./Container";
import * as serviceWorker from './serviceWorker';

const App = () => (
  <Router>
    <div>
      {/* <App /> */}
      {/* <Register /> */}
      <Container />
    </div>
  </Router>
);

render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
