
import { compose } from 'recompose';
import cover from '../../images/cover.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as ROUTES from '../../constants/routes';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '@firebase/app';
import {Document, Page, pdfjs,} from 'react-pdf';
import {PDFtoIMG} from 'react-pdf-to-image';
import { withAuthorization, withEmailVerification } from '../Session';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      books: [],
      numAdded: 0
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
  addBook(start) {
    return (
      <div>
      <th align="center">
          <th>{this.state.books[start].title}</th>
          <tr>
            <Link to={`/book/${this.state.books[start].key}`}>
            <img src = {cover} className="book-cover"></img>
            </Link>
          </tr>
          <p align="center" className="description">Book Description</p>
      </th>
      <th align="center">
        <th>{this.state.books[start + 1].title}</th>
        <tr>
          <Link to={`/book/${this.state.books[start + 1].key}`}>
            <img src = {cover} className="book-cover"></img>
          </Link>
         </tr>
        <p align="center" className="description">Book Description</p>
      </th>

      <th align="center">
        <th>{this.state.books[start + 2].title}</th>
        <tr>
          <Link to={`/book/${this.state.books[start + 2].key}`}>
            <img src = {cover} className="book-cover"></img>
          </Link>
         </tr>
        <p align="center" className="description">Book Description</p>
      </th>

      <th align="center">
        <th>{this.state.books[start + 3].title}</th>
        <tr>
          <Link to={`/book/${this.state.books[start + 3].key}`}>
            <img src = {cover} className="book-cover"></img>
          </Link>
         </tr>
        <p align="center" className="description">Book Description</p>
      </th>
      </div>
    )
  }
  addSingleBook(booksToAdd) {


    return (
      <TableRow>
        {this.addBook(booksToAdd)}
      </TableRow>
    )
    // this.state.books.map(books =>

    //   <th align="center">
    //       <th>{books.title}</th>
    //       <tr>
    //         <Link to={`/book/${books.key}`}>
    //         <img src = {cover} className="book-cover"></img>
    //         </Link>
    //       </tr>
    //       <p align="center" className="description">Book Description</p>
    //   </th>
    // )
  }
  addSingleRow(numToAdd) {
    var numToStartAt = 0;
    for (var i = 0; i < numToAdd; i ++ ) {
      this.addSingleBook(numToStartAt);
      numToStartAt += 4;
    }
  }
  addRows() {
    var booksLength = this.state.books.length;
    var rowsToAdd = (booksLength % 4) + 1;
    for (var i = 0; i < rowsToAdd; i++) {
      this.addSingleRow(rowsToAdd);
    }
    

  }
  render() {
    return (
      <div className="Landing-header">
        <h1>Library</h1>
      <Table>
      <TableBody>
        {this.addRows()}
      </TableBody>
    </Table>

    </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Home);
