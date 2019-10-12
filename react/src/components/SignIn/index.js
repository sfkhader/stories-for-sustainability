import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import logo from '../../logo2.png';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';




const SignInPage = () => (
  <div className="Landing-header">
    <Typography variant = "h2">Log In</Typography>
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
        this.listener = this.props.firebase.onAuthUserListener(
          authUser => {
            if (authUser) {
              this.props.firebase
                .user(authUser.uid)
                .get()
                .then(snapshot => {
                  const dbUser = snapshot.data();
                  if (dbUser.roles != null && dbUser.roles.ADMIN == [ROLES.ADMIN]){
                    this.props.history.push(ROUTES.ADMIN);
                  } else {
                    this.props.history.push(ROUTES.HOME);
                  }
 
                })
              }
          })
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
        <ul style = {{listStyle :"none"}}>
          <li>
            <Typography>Email</Typography>
            <TextField required variant = "outlined"  type="text" name="email" class="field-long" value={email} onChange={this.onChange} />
          </li> 
          <li>
        <Typography>Password </Typography>
        <TextField required variant = "outlined"  type="password" name="password" class="field-long" value={password} onChange={this.onChange} />
      </li>
      <Button disabled={isInvalid} variant = "contained" className ="login-button" type="submit" style ={{margin: '20px'}}>Log In</Button>
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