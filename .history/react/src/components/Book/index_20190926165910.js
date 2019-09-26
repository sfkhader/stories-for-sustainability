// Access-Control-Allow-Origin: *
import React from 'react';
import logo from '../../logo2.png';
import { compose } from 'recompose';
import cover from '../../images/cover.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {Document, Page, pdfjs,} from 'react-pdf';

import thing from "./pdf.pdf";
import { withAuthorization, withEmailVerification } from '../Session';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function onErr(error) {
    console.log(error);
}
function onSucc() {
    console.log("SUCCESSSSSSSSSSSSSSSSSS");
}
var pageNumber = 1;
const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

export default class Book extends React.Component{ 

    constructor() {
        super();
    }
    render() {
        // const classes = useStyles();
        return (
            <div className="Landing-header">
                <h2>Title of Book</h2>
                <div>
                    <Button variant="contained" style = {{margin: theme.spacing(1)}}>
                        Previous
                    </Button>
                    <Button variant="contained" className = "button">
                        Next
                    </Button>
                </div>
                <div width = "1000px">
                    {/* <img src={'/pdf.pdf'}></img> */}
                    <Document file = {thing} onLoadError={onErr} onLoadSuccess={onSucc}>
                        <Page pageNumber={1}/>
                    </Document>


                </div>
            </div>
        )
    }
}
// export default Book;
