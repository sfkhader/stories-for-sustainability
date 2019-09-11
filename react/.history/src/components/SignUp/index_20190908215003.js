import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import logo from '../../logo2.png';


import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
  <div className="Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />
    <h1>Sign Up</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  age: '',
  grade: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }
  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);

      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
  onChange = event => {
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      firstname,
      lastname,
      username,
      email,
      age,
      grade,
      passwordOne,
      passwordTwo,
      isAdmin,
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
        <li>
          <label>Full Name <span class="required">*</span></label>
          <input type="text" name="firstname" value={firstname} onChange={this.onChange} class="field-divided" placeholder="First" /> 
          <input type="text" name="lastname"  value={lastname} onChange={this.onChange} class="field-divided" placeholder="Last" />
          </li>
          <li>
        <label>User Name <span class="required">*</span></label>
        <input type="text" name="username" class="field-long" value={username} onChange={this.onChange} placeholder="username" />
       </li>
          <li>
        <label>Email <span class="required">*</span></label>
        <input type="text" name="email" class="field-long" value={email} onChange={this.onChange} placeholder="email" />
       </li> 
        <li>
        <label>Age <span class="required">*</span></label>
        <input type="text" name="age" class="field-long" value={age} onChange={this.onChange} placeholder="age"/>
      </li>
      <li>
        <label>Grade <span class="required">*</span></label>
        <input type="text" name="grade" class="field-long" value={grade} onChange={this.onChange} placeholder="grade" />
      </li>
      <li>
        <label>Password <span class="required">*</span></label>
        <input type="text" name="passwordOne" class="field-long" value={passwordOne} onChange={this.onChange} />
      </li>
      <li>
        <label>Confirm Password <span class="required">*</span></label>
        <input type="text" name="passwordTwo" class="field-long" value={passwordTwo} onChange={this.onChange} />
      </li>

        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
          <button disabled={isInvalid} className ="signup-button" type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
        </ul>
      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP} style={{color: 'green'}}>Sign Up!</Link>
  </p>
);


const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };