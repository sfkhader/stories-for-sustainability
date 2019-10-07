import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const PasswordForgetPage = () => (
  <div className="Landing-header">
    <h1>Forgot Your Password?</h1>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: '',
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
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
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <ul class="form-style-1">
        <li>
        <label>Email <span class="required">*</span></label>
        <input type="text" name="email" class="field-long" value={email} onChange={this.onChange} />
       </li>
      
        <button disabled={isInvalid} className="button" type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
        </ul>
      </form>
    );
  }
}
const PasswordForgetLink = () => (
  <p className = "forgot-link">
    <Link to={ROUTES.PASSWORD_FORGET} style={{color: 'white'}} activeStyle={{color: 'green'}}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };