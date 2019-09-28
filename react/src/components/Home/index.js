
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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      books: []
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
      books
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  render() {
    return (
      <div className="Landing-header">
        <h1>Library</h1>
      <Table>
      <TableBody>
        <TableRow className = "row">
            {this.state.books.map(books =>
                <th align="center">
                    <th>{books.title}</th>
                    <tr>
                      <Link to={`/book/${books.key}`}>
                      <img src = {cover} className="book-cover"></img>
                      </Link>
                    </tr>
                    <p align="center" className="description">Book Description</p>
                    </th>
                )}
        </TableRow>
      </TableBody>
    </Table>
    </div>
    );
  }
}

export default Home;
