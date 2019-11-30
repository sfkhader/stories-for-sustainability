import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const INITIAL_STATE = {
  oldPassword:'',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.oldPassword = props.props.authUser.passwordOne;
    console.log(props.props.authUser.passwordOne);
  }
  onSubmit = event => {
    const { passwordOne } = this.state;
    if (this.state.oldPassword === this.oldPassword) {
      this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    } else {
      this.setState({error: "incorrect old password"})
    }

    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { oldPassword, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || oldPassword === passwordOne || oldPassword === passwordTwo;
    return (
      <form onSubmit={this.onSubmit}>
        <Typography>Old Password</Typography>
        <TextField required variant = "outlined"  type="password" name="oldPassword" class="field-long" value={oldPassword} onChange={this.onChange} />
        <Typography>New Password</Typography>
        <TextField required variant = "outlined"  type="password" name="passwordOne" class="field-long" value={passwordOne} onChange={this.onChange} />
        <Typography>Confirm New Password</Typography>

        <TextField required variant = "outlined"  type="password" name="passwordTwo" class="field-long" value={passwordTwo} onChange={this.onChange} style={{paddingBottom:'10px'}}/>
        <Button variant="contained" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
export default withFirebase(PasswordChangeForm);