import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
        <Typography>Email</Typography>
        <TextField required variant = "outlined"  type="text" name="email" class="field-long" value={email} onChange={this.onChange} style={{paddingBottom:'10px'}}/>
      
        <Button variant = "contained" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </form>

    );
  }
}
const PasswordForgetLink = () => (
  <p className = "forgot-link">
    <Link to={ROUTES.PASSWORD_FORGET} style={{color: '#2A2D34'}} activeStyle={{color: 'green'}}><Typography>Forgot Password?</Typography></Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };