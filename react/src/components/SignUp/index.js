import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import logo from '../../logo2.png';

import { withFirebase } from '../Firebase';

const SignUpPage = () => (
  
  <div className="Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />
    <h1>Sign Up</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);

      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
       <ul class="form-style-1">

       <label>Username <span class="required">*</span></label>
        <input type="text" name="username" class="field-long" value={username} onChange={this.onChange} />
        <label>Email <span class="required">*</span></label>
        <input type="text" name="email" class="field-long" value={email} onChange={this.onChange} />
        <label>Password <span class="required">*</span></label>
        <input type="text" name="passwordOne" class="field-long" value={passwordOne} onChange={this.onChange} />
        <label>Confirm Password <span class="required">*</span></label>
        <input type="text" name="passwordTwo" class="field-long" value={passwordTwo} onChange={this.onChange} />
        <button disabled={isInvalid} className = "button" type="submit"> Sign Up</button>
        {error && <p>{error.message}</p>}
        </ul>

      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };