
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
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFDelete extends Component {
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
  
  delete(id){
    firebase.firestore().collection('books').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
      window.location.href = "/admin"
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="Landing-header">
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
                    <Link to={ROUTES.ADMIN}> 
                        <button onClick={this.delete.bind(this, books.key)} class="login-button">
                            Delete Story
                        </button>
                    </Link>
                    </th>

                     
                )}
        </TableRow>
      </TableBody>
    </Table>
    </div>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(PDFDelete);
