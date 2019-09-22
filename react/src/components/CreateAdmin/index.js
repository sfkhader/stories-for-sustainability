import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
import logo from '../../logo2.png';

import { withFirebase } from '../Firebase';

const CreateAdminPage = () => (
  
  <div className="Landing-header">
    <img src={logo} className="Landing-logo" alt="logo" />
    <h1>Create Admin</h1>
    <FirebaseContext.Consumer>
      {firebase => <CreateAdminForm firebase={firebase} />}
    </FirebaseContext.Consumer>  </div>
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
          })
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
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
        <button disabled={isInvalid} className = "signup-button" type="submit"> Create Admin</button>
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