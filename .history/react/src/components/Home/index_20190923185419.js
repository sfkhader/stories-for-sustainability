import React from 'react';
import logo from '../../logo2.png';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
  <div className="Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />
    <h1>Welcome!</h1>
  </div>
);
const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);