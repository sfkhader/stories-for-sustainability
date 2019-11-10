import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import logo from '../../logo2.png';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



const SignUpPage = () => (
  
  <div className="Landing-header">
    <Typography variant = "h2" className = "resitration">Register</Typography>
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
       <ul style = {{listStyle: "none"}}>
      <li>
      <Typography style = {{marginTop: '20px'}}>Full Name</Typography>
        <TextField  required variant= "outlined" label = "First Name" name="firstname" value={firstname} onChange={this.onChange} /> 
        <TextField required variant= "outlined"  label = "Last Name" name="lastname"  value={lastname} onChange={this.onChange} />
      </li>
      <li>
        <Typography  style = {{marginTop: '20px'}}>Username</Typography>
        <TextField required variant= "outlined"  label = "Username" name="username" value={username} onChange={this.onChange} />
      </li>
      <li>
        <Typography style = {{marginTop: '20px'}}>Email </Typography>
        <TextField required variant= "outlined"  label = "Email" name="email" value={email} onChange={this.onChange}/>
      </li>
      <li>
        <Typography style = {{marginTop: '20px'}}>Password </Typography>
        <TextField required variant= "outlined"  label = "Password" type="password" name="passwordOne" value={passwordOne} onChange={this.onChange}/>
      </li>
      <li>
        <Typography style = {{marginTop: '20px'}}>Confirm Password </Typography>
        <TextField required variant= "outlined" label = "Confirm Password" type="password" name="passwordTwo" value={passwordTwo} onChange={this.onChange}/>
      </li>
        <Button variant = "contained" style = {{margin: '20px'}} className = "cancel-button" ><Link to = {ROUTES.LANDING} className = "link">Cancel</Link></Button> 

        <Button variant = "contained" style = {{margin: '20px', backgroundColor: '#60B2E5'}} disabled={isInvalid} className = "signup-button" type="submit">Register</Button>
        {error && <Typography>{error.message}</Typography>}

        </ul>


      </form>
    );
  }
}
const SignUpLink = () => (
  <Typography>
    Don't have an account? <Link to={ROUTES.SIGN_UP} style= {{color: "#2A2D34"}}>Sign Up</Link>
    </Typography>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };