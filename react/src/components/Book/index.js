
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Document, Page, pdfjs,} from 'react-pdf';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserWrapper from '../UserWrapper';
import AdminWrapper from '../AdminWrapper';
import Typography from '@material-ui/core/Typography';



import * as firebase from 'firebase';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let isAdmin;

function checkAdmin (authUser) {
  if (authUser.roles != null && authUser.roles.ADMIN == [ROLES.ADMIN]) {
    isAdmin = true;
  }
  isAdmin = false;
}

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    libButton: {
        margin: theme.spacing(1),
        alignSelf: 'left'
    }
  }));

 
  class Book extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        book: {},
        key: '',
        url: '',
        numPages: null,
        pageNumber: 1,
      };
    }

    
    componentDidMount() {
      var url = this.props.location.pathname;
      var urlsplit = url.split("/").slice(-1)[0];
      const ref = firebase.firestore().collection('books').doc(urlsplit);
      ref.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            book: doc.data(),
            title: doc.data().title,
            tags: doc.data().tags,
            key: doc.id,
            url: doc.data().url,
            isLoading: false
          });
        } else {
          console.log("No such document!");
        }
      });
      
    }
  
    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
      this.setNumPages(numPages);
      // console.log(numPages);
    }

    setNumPages(numPages) {
      var url = this.props.location.pathname;
      var urlsplit = url.split("/").slice(-1)[0];
      const ref = firebase.firestore().collection('books').doc(urlsplit);
      ref.get().then((doc) => {
        if (doc.exists) {
          ref.update({['numPages']: numPages
          })
        } else {
          console.log("No such document!");
        }
      });
    }
    
    setBookmark(pageNumber, key) {
      var user = firebase.auth().currentUser;
      if (user) {
        var currentUser = user.uid;
        const bookmarksRef = firebase.firestore().collection('users').doc(currentUser);
        bookmarksRef.get().then((doc) => {
          if (doc.exists) {
            if (!['bookmarks.' + key].includes(pageNumber)) {
              bookmarksRef.update({['bookmarks.' + key]: firebase.firestore.FieldValue.arrayUnion(pageNumber)
              })
            }
            // console.log(['bookmarks.' + key]);
          }

        })    
      }
    }
     
    setFavorite(key) {
      var user = firebase.auth().currentUser;
      if (user) {
        var currentUser = user.uid;
        const favoritesRef = firebase.firestore().collection('users').doc(currentUser);
        favoritesRef.get().then((doc) => {
          if (doc.exists) {
            if (!'favorite'.includes(key)) {
              favoritesRef.update({favorite: firebase.firestore.FieldValue.arrayUnion(key)
              })
            }
          }

        })
      }
    }
    
    setCurrentPage(pageNumber, numPages, title, key) {
      firebase.auth().onIdTokenChanged(function(user) {
        if (user) {
          var currentUser = user.uid;
          const currentPageRef = firebase.firestore().collection('users').doc(currentUser);
          currentPageRef.get().then((doc) => {
            if (doc.exists) {
              if (pageNumber == numPages) {
                currentPageRef.update({['finished.' + key]: firebase.firestore.FieldValue.arrayUnion(title)})
                currentPageRef.update({['currentlyReading.' + key]: null})

              } else if (pageNumber > 0 && pageNumber < numPages) {
                currentPageRef.update({['currentlyReading.' + key]: firebase.firestore.FieldValue.arrayUnion(title)})
                currentPageRef.update({['finished.' + key]: null})

              }
              if (!['currentPage.' + key].includes(pageNumber)) {
                currentPageRef.update({['currentPage.' + key]: pageNumber})
                
              }
              // console.log(['currentPage.' + key]);
            }

          })
        }
      })
    }
  
    render() {
      const { book, key, url, pageNumber, numPages, isLoading, title } = this.state;
      const isPrevInvalid = pageNumber - 1 == 0;
      const isNextInvalid = pageNumber  == numPages;


      let wrapper;

      // if (checkAdmin) {
      //   wrapper = <AdminWrapper>{{home: false}}</AdminWrapper>;
      // } else {
      //   wrapper = <UserWrapper>{{home: false}}</UserWrapper>;
      // }

      return (
        <div>
          <UserWrapper>{{home: false}}</UserWrapper>
          <checkAdmin isAdmin = {isAdmin} />;
          {wrapper}
        <div className="Landing-header">
            &nbsp;
            <Typography variant = "h2">{this.state.title}</Typography>
            <div>
                <Button variant = "contained" style ={{margin: '20px'}} disabled={isPrevInvalid} className ="login-button" onClick={() => 
                {
                  this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));
                  this.setCurrentPage(pageNumber - 1, numPages, title, key)}
              }>
                    Previous
                </Button>
                &nbsp;
                <Button  variant = "contained" style ={{margin: '20px'}} className = "login-button" onClick={() => this.setBookmark(pageNumber, key)}>
                    Bookmark
                </Button>
                &nbsp;
                <Button  variant = "contained" style ={{margin: '20px'}} className = "login-button" onClick={() => this.setFavorite(key)}>
                    Favorite
                </Button>
                &nbsp;
                <Button  variant = "contained" style ={{margin: '20px'}} disabled={isNextInvalid} className = "login-button" onClick={() => 
                  {
                    // this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
                    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
                    this.setCurrentPage(pageNumber + 1, numPages, title, key)
                  }
                  }>
                    Next
                </Button>

            </div>
            {/* &nbsp; */}

            <div width = "1000px" className = "book">
                <Document 
                  file = {this.state.url}
                  onLoadSuccess={this.onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber}/>
                </Document> 


            </div>
        </div>
        </div>
    )
    }
  }


export default Book;
