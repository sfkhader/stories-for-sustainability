import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    return (
      <form onSubmit={this.onSubmit}>
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