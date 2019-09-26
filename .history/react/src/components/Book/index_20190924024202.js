import React from 'react';
import logo from '../../logo2.png';
import { compose } from 'recompose';
import cover from '../../images/cover.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import {Document, pdfjs} from 'react-pdf';
import thing from "./pdf.pdf";
import { withAuthorization, withEmailVerification } from '../Session';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function onErr(error) {
    console.log(error);
}
const Book = () => (
  <div className="Landing-header">
    <h2>Welcome!</h2>
    <Document file = {thing} onLoadError={{onErr}}/>
  </div>
);
export default Book;
