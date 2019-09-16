import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
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
  username: '',
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
          })
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {  
        this.setState({ ...INITIAL_STATE });
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
        <button disabled={isInvalid} className = "button" type="submit"> Create Admin</button>
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