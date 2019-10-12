import React from 'react';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
  <Button variant = "outlined" color="inherit"  style = {{marginRight: "20px"}}  onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);
export default withFirebase(SignOutButton);