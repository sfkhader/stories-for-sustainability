import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import logo from '../../logo2.png';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';


const SignUpPage = () => (
  
  <div className="Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />
    <h1 className = "resitration">Register</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>  </div>
);

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
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
    const { firstname, lastname, username, email, passwordOne } = this.state;
    const roles = {};

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstname, 
            lastname,
            username,
            email,
            passwordOne,
            roles,
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {  
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
        
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
    const {
      firstname,
      lastname,
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
       <ul className="form-style-1">
      <li>
      <label>Full Name <span class="required">*</span></label>
        <input type="text" name="firstname" class="field-divided" placeholder="First" value={firstname} onChange={this.onChange} /> 
        <input type="text" name="lastname" class="field-divided" placeholder="Last" value={lastname} onChange={this.onChange} />
      </li>
      <li>
        <label>Username <span class="required">*</span></label>
        <input type="text" name="username" class="field-long" value={username} onChange={this.onChange}/>
      </li>
      <li>
        <label>Email <span class="required">*</span></label>
        <input type="email" name="email" class="field-long" value={email} onChange={this.onChange}/>
      </li>
      <li>
        <label>Password <span class="required">*</span></label>
        <input type="password" name="passwordOne" class="field-long" value={passwordOne} onChange={this.onChange}/>
      </li>
      <li>
        <label>Confirm Password <span class="required">*</span></label>
        <input type="password" name="passwordTwo" class="field-long" value={passwordTwo} onChange={this.onChange}/>
      </li>
        <Button variant = "contained" style = {{margin: '20px'}} className = "cancel-button" ><Link to = {ROUTES.LANDING} className = "link">Cancel</Link></Button> 

        <Button variant = "contained" style = {{margin: '20px', backgroundColor: '#60B2E5'}} disabled={isInvalid} className = "signup-button" type="submit">Register</Button>
        {error && <p>{error.message}</p>}

        </ul>


      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP} style= {{color: "#2A2D34"}}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };