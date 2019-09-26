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
import {Document} from 'react-pdf';

import { withAuthorization, withEmailVerification } from '../Session';

const Book = () => (
  <div className="Landing-header">
    <h2>Welcome!</h2>
    <Document file = {{url: "http://www.pdf995.com/samples/pdf.pdf"}}/>
  </div>
);
export default Book;
