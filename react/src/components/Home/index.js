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
import * as ROUTES from '../../constants/routes';


import { withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
  <div className="Landing-header">
    <h2>Welcome!</h2>
    <Table>
      <TableBody>
        <TableRow className = "row">
          <TableCell><Link to={ROUTES.BOOK}><img src = {cover} className="book-cover"/></Link><p className = "name">Name of Book</p><p className="description">Description of Book</p></TableCell>
          <TableCell><img src = {cover} className="book-cover"/></TableCell>
          <TableCell><img src = {cover} className="book-cover"/></TableCell>
          <TableCell></TableCell>

        </TableRow>
      </TableBody>
    </Table>
    
  </div>
);
const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
