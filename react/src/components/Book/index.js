
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Document, Page, pdfjs,} from 'react-pdf';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserWrapper from '../UserWrapper';
import Typography from '@material-ui/core/Typography';



import * as firebase from 'firebase';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


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
  
    onDocumentLoad = ({ numPages }) => {
      this.setState({ numPages });
    }
    
    setBookmark(pageNumber, key) {
      firebase.auth().onIdTokenChanged(function(user) {
        if (user) {
          var currentUser = user.uid;
          const bookmarksRef = firebase.firestore().collection('users').doc(currentUser);
          bookmarksRef.get().then((doc) => {
            if (doc.exists) {
              if (!['bookmarks.' + key].includes(pageNumber)) {
                bookmarksRef.update({['bookmarks.' + key]: firebase.firestore.FieldValue.arrayUnion(pageNumber)
                })
              }
              console.log(['bookmarks.' + key]);
            }

          })
        }
      })
    }
        
  
    render() {
      const { book, key, url, pageNumber, numPages, isLoading } = this.state;

      return (
        <div>
          <UserWrapper>{{home: false}}</UserWrapper>
        <div className="Landing-header">
            &nbsp;
            <Typography variant = "h2">{this.state.title}</Typography>
            <div>
                <Button variant = "contained" style ={{margin: '20px'}} className ="login-button" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))}>
                    Previous
                </Button>
                &nbsp;
                <Button  variant = "contained" style ={{margin: '20px'}} className = "login-button" onClick={() => this.setBookmark(pageNumber, key)}>
                    Bookmark
                </Button>
                &nbsp;

                <Button  variant = "contained" style ={{margin: '20px'}} className = "login-button" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))}>
                    Next
                </Button>

            </div>
            {/* &nbsp; */}

            <div width = "1000px" className = "book">
                <Document file = {this.state.url}>
                    <Page pageNumber={pageNumber}/>
                </Document>


            </div>
        </div>
        </div>
    )
    }
  }


export default Book;
