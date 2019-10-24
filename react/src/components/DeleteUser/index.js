

import cover from '../../images/cover.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

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
import styled, { css } from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import AdminWrapper from '../AdminWrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { email, username, firstname,lastname } = doc.data();
      users.push({
        key: doc.id,
        doc,
        firstname,
        lastname,
        email,
        username,
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  delete(id){
    admin.auth().deleteUser(id)
    console.log(id)
    .then(function() {
      console.log('Successfully deleted user');
    })
    .catch(function(error) {
      console.log('Error deleting user:', error);
    });
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
      window.location.href = "/admin"
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
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
    return (
      <div>
        <AdminWrapper>{{home:false}}</AdminWrapper>

      <div className="Landing-header">
          <Typography variant = "h2" style = {{marginTop: 'none', marginBottom: '20px'}}>Delete a User</Typography>
      <Paper style ={{width: '80%', overflowX: 'auto'}}>
        <Table style = {{minWidth: 650, backgroundColor: "#9AA0A8"}}>
          <TableHead>
            <TableRow>
              <TableCell style= {{borderColor: "black"}}>First Name</TableCell>
              <TableCell style= {{borderColor: "black"}}>Last Name</TableCell>
              <TableCell style= {{borderColor: "black"}}>Email</TableCell>
              <TableCell style= {{borderColor: "black"}}>Username</TableCell>
              <TableCell style= {{borderColor: "black"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(user => (
              <TableRow style= {{borderColor: "black"}}>
                <TableCell style= {{borderColor: "black"}}>{user.firstname}</TableCell>
                <TableCell style= {{borderColor: "black"}}>{user.lastname}</TableCell>
                <TableCell style= {{borderColor: "black"}}>{user.email}</TableCell>
                <TableCell style= {{borderColor: "black"}}>{user.username}</TableCell>
                <TableCell style= {{borderColor: "black"}}>
                  <Button variant = "contained" className = "delete-user" onClick={this.delete.bind(this, user.key)}>
                          Delete User
                      </Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
    </div>

    );
  }
}

const DeleteButton = styled(Button)`
  color: white;
  background-color: tomato;
`;


const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(DeleteUser);
