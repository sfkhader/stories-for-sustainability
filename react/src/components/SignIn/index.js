import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import logo from '../../logo2.png';
import app from 'firebase/app';

const SignInPage = () => (
  <div className="Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        var user = this.props.firebase.auth.currentUser;
        const roles = {};
        var email, uid, userInfo;
        if (user != null) {
          email = user.email;
          uid = user.uid;

          userInfo = app.database()
          .ref('/users/')
          .orderByChild('email')
          .equalTo(email)
          .once('value', function(snapshot) {
            var key = Object.keys(snapshot.val())[0];
            roles[ROLES.ADMIN] = (snapshot.val()[key]['roles'])
          });
          if (roles[ROLES.ADMIN] = ROLES.ADMIN){
            this.props.history.push(ROUTES.ADMIN);
          } else {
            this.props.history.push(ROUTES.HOME);
          }
        }
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <ul class="form-style-1">
         <li>
        <label>Email <span class="required">*</span></label>
        <input type="text" name="email" class="field-long" value={email} onChange={this.onChange} />
       </li> 
       <li>
        <label>Password <span class="required">*</span></label>
        <input type="text" name="password" class="field-long" value={password} onChange={this.onChange} />
      </li>
      <button disabled={isInvalid} className ="button" type="submit">Sign In</button>
        {error && <p>{error.message}</p>}
        </ul>
      </form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };