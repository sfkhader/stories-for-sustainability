import app from 'firebase/app';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import logo from '../../logo2.png';
import { Link } from 'react-router-dom';
import AdminWrapper from '../AdminWrapper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';

const CreateAdminPage = () => (
  <div>
  <AdminWrapper>{{home:false}}</AdminWrapper>
  
  <div className="Landing-header">

    <Typography variant="h2" style = {{marginTop: '20px'}}>Create Admin</Typography>
    <FirebaseContext.Consumer>
      {firebase => <CreateAdminForm firebase={firebase} />}
    </FirebaseContext.Consumer>  </div>
    </div>
);

const INITIAL_STATE = {
  firstname:'',
  lastname:'',
  username:'',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: true,
  error: null,
};

class CreateAdminFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }
  onSubmit = event => {
    const { firstname, lastname, username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    var config = {
      apiKey: "AIzaSyC8Q9QITqvoKM_rqja6HUtgrOtfTDVcVBc",
      authDomain: "stories-for-sustainability.firebaseapp.com",
      databaseURL: "https://stories-for-sustainability.firebaseio.com",};
    var secondaryApp = app.initializeApp(config, "Secondary");

    secondaryApp.auth().createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstname,
            lastname,
            username,
            email,
            passwordOne,
            roles,
          })

          secondaryApp.auth().currentUser.sendEmailVerification({
          url: 'http://localhost:3000',
        });

      })
      .then(function(firebaseUser) {
        console.log("User " + firebaseUser.uid + " created successfully!");
        //I don't know if the next statement is necessary 
        secondaryApp.auth().signOut();
      })
      .then(() => {  
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ADMIN);
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
        <Typography style = {{marginTop: '20px'}}>Username</Typography>
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
        <Button variant = "contained" style = {{margin: '20px'}} className = "cancel-button" ><Link to = {ROUTES.ADMIN} className = "link">Cancel</Link></Button> 

        <Button variant = "contained" style = {{margin: '20px', backgroundColor: '#60B2E5'}} disabled={isInvalid} className = "signup-button" type="submit">Create Admin</Button>

        {error && <p>{error.message}</p>}
        </ul>

      </form>
    );
  }
}

const CreateAdminForm = compose(
  withRouter,
  withFirebase,
)(CreateAdminFormBase);

export default CreateAdminPage;
export { CreateAdminForm };