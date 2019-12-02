
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '@firebase/app';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import {pdfjs,} from 'react-pdf';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withAuthorization, withEmailVerification } from '../Session';
import SignOut from '../SignOut';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class AdminWrapper extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.home = this.props.home;
    this.state = {
      books: [],
      numAdded: 0,
      home: this.props.children.home
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, tags, url } = doc.data();
      books.push({
        key: doc.id,
        doc,
        title,
        tags,
        url,
      });
    });
    this.setState({
      books: books
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }


  render() {
    var isHome = () => {
        if (this.state.home) {
          return (
              <SignOut color = 'inherit' style = {{marginRight: "20px"}}>Sign Out</SignOut>
          )
        } else {
            return(
              <Link to = {ROUTES.ADMIN} style= {{textDecoration: 'none', color: 'white', marginRight: "20px"}}><Button variant = 'outlined' color= 'inherit'> Back to Home </Button></Link>
            )
        }
    };
    return (
        <div>
            <AppBar position = "static" style= {{sticky: true}}>
                <Toolbar style={{flexGrow: 1}} >
                    {isHome()}
                    <Link to = {ROUTES.CREATE_ADMIN} style= {{textDecoration: 'none', color: 'white', marginRight: "20px"}}><Button variant = 'outlined' color= 'inherit'> Create Admin</Button></Link>
                    <Link to = {ROUTES.FILEUPLOAD} style= {{textDecoration: 'none', color: 'white', marginRight: "20px"}}><Button variant = 'outlined' color= 'inherit'>Upload Story</Button></Link>
                    {/* <Link to = {ROUTES.FILEDELETE} style= {{textDecoration: 'none', color: 'white', marginRight: "20px"}}><Button variant = 'outlined' color= 'inherit'>Delete Story</Button></Link> */}
                    <Link to = {ROUTES.DELETE_USER} style= {{textDecoration: 'none', color: 'white', marginRight: "20px"}}><Button variant = 'outlined' color= 'inherit'>Delete User</Button></Link>

                    <div style = {{flexGrow: 1}}>
                    </div>

                    <Link to = {ROUTES.ADMINACCOUNT} style= {{textDecoration: 'none', color: 'white', marginRight: "20px"}}><IconButton color="inherit" aria-label="menu">
                        <AccountCircle />
                    </IconButton></Link>
                </Toolbar>
            </AppBar>
        </div>

    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminWrapper);
