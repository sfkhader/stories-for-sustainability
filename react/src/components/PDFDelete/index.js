
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
import AdminWrapper from '../AdminWrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFDelete extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      open:false,
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
    const openDialog = () => {
      this.setState({open:true})
    }
    const closeDialog = () => {
      this.setState({open:false})
    }
    return (
      <div>
        <AdminWrapper>{{home:false}}</AdminWrapper>

      <div className="Landing-header">
          <Typography variant = 'h2' style = {{marginTop: "none"}}>Delete Stories</Typography>
      <Table>
      <TableBody>
        <TableRow className = "row">
            {this.state.books.map(books =>
                <th align="center">
                    <th><Typography variant = "h5" style = {{margin: 'none'}}>{books.title}</Typography></th>
                    <tr>
                      <Link to={`/book/${books.key}`}>
                      <img src = {cover} className="book-cover"></img>
                      </Link>
                    </tr>
                    <Typography variant = 'body1' align="center" className="description">Book Description</Typography>

                        <Button variant = "contained" onClick={openDialog } style = {{marginTop: "20px"}}>
                            Delete Story
                        </Button>
                        <Dialog open={this.state.open} onClose={closeDialog}>
                          <DialogTitle>{"Are you sure you would like to delete this story?"}</DialogTitle>
                          <DialogActions>
                            <Button onClick={this.delete.bind(this, books.key)}>Yes</Button>
                            <Button onClick={closeDialog}>No</Button>
                          </DialogActions>
                        </Dialog>

                    </th>

                     
                )}
        </TableRow>
      </TableBody>
    </Table>
    </div>
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
