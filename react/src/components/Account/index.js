import React from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import UserWrapper from '../UserWrapper';
import Typography from '@material-ui/core/Typography';


const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      
      <div>
       <UserWrapper>{{home:false}}</UserWrapper>
        <div className="homepage">
          <Typography variant="h4" style={{padding:'20px'}}>Account: {authUser.email}</Typography>
          <Typography variant="h5" style={{padding:'10px'}}>Reset Password:</Typography>
          <PasswordForgetForm />
          <Typography variant="h5" style={{padding:'10px', paddingTop:'30px'}}>Change Password:</Typography>

          <PasswordChangeForm />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);