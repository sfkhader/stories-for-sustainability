import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CreateAdminPage from '../CreateAdmin';
import PDFUpload from '../PDFUpload';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import Book from '../Book';
import PDFDelete from '../PDFDelete';
import DeleteUser from '../DeleteUser';
import UserWrapper from '../UserWrapper';
import Bookmark from '../Bookmark';
import Favorite from '../Favorite';


const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.CREATE_ADMIN} component={CreateAdminPage} />
      <Route path={ROUTES.FILEUPLOAD} component={PDFUpload} />
      <Route path={ROUTES.BOOK} component={Book} />
      <Route path={ROUTES.FILEDELETE} component={PDFDelete} />
      <Route path={ROUTES.DELETE_USER} component={DeleteUser} />
      <Route path={ROUTES.BOOKMARK} component={Bookmark} />
      <Route path={ROUTES.FAVORITE} component={Favorite} />

    </div>
  </Router>
);
export default withAuthentication(App);