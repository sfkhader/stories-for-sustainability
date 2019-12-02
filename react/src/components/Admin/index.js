import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { firebase } from '@firebase/app';
import cover from '../../images/cover.jpg';

import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SignOutButton from '../SignOut';
import AdminWrapper from '../AdminWrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// import classes from '*.module.sass';
const INITIAL_STATE = {
  loading:false,
  users:[],
  books: [],
  numAdded: 0,
  language :'Select',
  languages : [],
  goals : [],
  goal :'Select',
  filteredBooks: [],
  open:false,
  imageurl: ''
};

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.unsubscribeBooks = null;
    this.state = {
      ...INITIAL_STATE
    };
  }
  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, tags , url, languages, goals, imageurl } = doc.data();
      books.push({
        key: doc.id,
        doc,
        title,
        tags,
        url,
        languages,
        goals,
        imageurl
      });
    });
    this.setState({
      books: books,
      filteredBooks: books
   });
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
  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
    .users()
    .onSnapshot(snapshot => {
      let users = [];
      snapshot.forEach(doc =>
        users.push({ ...doc.data(), uid: doc.id }),
      );
      this.setState({
        users,
        loading: false,
      });
    });
    this.unsubscribeBooks = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribeBooks();
  }
  render() {
    const openDialog = () => {
      this.setState({open:true})
    }
    const closeDialog = () => {
      this.setState({open:false})
    }
    const { users, loading } = this.state;

    return (
      <div>
      <AdminWrapper>{{home:true}}</AdminWrapper>

      <div className="homepage">

        <Typography variant = "h2" style = {{margin: '20px'}}>Admin</Typography>
        <Typography variant = "h6" style = {{marginBottom: '20px'}}>
          The Admin Page is accessible by every signed in admin user.
        </Typography>
        {/* {loading && <div>Loading ...</div>} */}
        <Table>

          <TableBody>

            <TableRow className = "row">
            
            {this.state.filteredBooks.map(books =>

              <th align="center">
                  <Typography variant = "h5" style = {{margin: "none"}}>{books.title}</Typography>
                  <tr>
                    <Link to={`/book/${books.key}`}>
                    <img src = {books.imageurl} className="book-cover"></img>
                    </Link>


                  </tr>
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



const Inline = styled.section`
  display:inline-block;
  margin-right:5px;
  margin-bottom: 20px;
`;
const Wrapper = styled.section`
  padding: 10px 10px;
  border: none;
  outline: none;
  font: inherit;
  color: #2A2D34;
  width: 50%;
  text-align: center;
  margin-top: 40px;
`;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
    backgroundColor: '#9AA0A8'
  },
}));
const UserList = ({ users }) => (
  <Paper className = {useStyles().root}>
    <Table className = {useStyles().table}>
      <TableHead>
        <TableRow>
          <TableCell style= {{borderColor: "black"}}>First Name</TableCell>
          <TableCell style= {{borderColor: "black"}}>Last Name</TableCell>
          <TableCell style= {{borderColor: "black"}}>Email</TableCell>
          <TableCell style= {{borderColor: "black"}}>Username</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow style= {{borderColor: "black"}}>
            <TableCell style= {{borderColor: "black"}}>{user.firstname}</TableCell>
            <TableCell style= {{borderColor: "black"}}>{user.lastname}</TableCell>
            <TableCell style= {{borderColor: "black"}}>{user.email}</TableCell>
            <TableCell style= {{borderColor: "black"}}>{user.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  </Paper>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);