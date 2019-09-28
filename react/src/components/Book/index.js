
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Document, Page, pdfjs,} from 'react-pdf';
import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as firebase from 'firebase';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const storage = firebase.storage();
const pathReference = storage.ref('pdfs/Anai Friends Story.pdf');
const url = "https://firebasestorage.googleapis.com/v0/b/stories-for-sustainability.appspot.com/o/pdfs%2FAnai%20Friends%20Story.pdf?alt=media&token=725470e5-cb4a-46b0-9a38-9b80a8d64d53"//pathReference.getDownloadURL();

function onErr(error) {
    console.log(error);
}
function onSucc() {
    console.log("SUCCESSSSSSSSSSSSSSSSSS");
}
const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

  class Book extends Component {
    state = {
      numPages: null,
      pageNumber: 1,
    }
  
    onDocumentLoad = ({ numPages }) => {
      this.setState({ numPages });
    }
  
    render() {
      const { pageNumber, numPages } = this.state;
  
      return (
            <div className="Landing-header">
                <h2>Title of Book</h2>
                <div>
                    <button className ="button" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))}>
                        Previous
                    </button>
                    <button  className = "button" onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))}>
                        Next
                    </button>
                </div>
                <div width = "1000px">
                    <Document file = {url} onLoadError={onErr} onLoadSuccess={onSucc}>
                        <Page pageNumber={pageNumber}/>
                    </Document>


                </div>
            </div>
    )
    }
  }


export default Book;
