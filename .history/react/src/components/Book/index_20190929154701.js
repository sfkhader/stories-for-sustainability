
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Document, Page, pdfjs,} from 'react-pdf';
import React, { Component } from "react";
import ReactDOM from "react-dom";

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
        alignSelf: screenLeft
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
      console.log(urlsplit);
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
  
    render() {
      const { book, key, url, pageNumber, numPages, isLoading } = this.state;
  
      return (
        <div className="Landing-header">
             <button className ="libButton" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))}>
                    Back to Library
            </button>
            &nbsp;
            <h2>{this.state.title}</h2>
            <div>
                <button className ="button" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))}>
                    Previous
                </button>
                &nbsp;

                <button  className = "button" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))}>
                    Next
                </button>

            </div>
            &nbsp;

            <div width = "1000px" className = "book">
                <Document file = {this.state.url}>
                    <Page pageNumber={pageNumber}/>
                </Document>


            </div>
        </div>
    )
    }
  }


export default Book;
