

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
import styled, { css } from 'styled-components'



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
      const { email, username } = doc.data();
      users.push({
        key: doc.id,
        doc,
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
    firebase.firestore().collection('users').doc(id).delete().then(() => {
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
          <h1>Delete a User</h1>
      <Table>
      <TableBody>
        <TableRow className = "row">
            {this.state.users.map(users =>
                <th align="center">
                <TableCell style = {{border: "10px", borderColor: "white"}}>
                    <th align="center" className="description">Email: {users.email}</th>
                    &nbsp;
                    <th align="center" className="description">Username: {users.username}</th>
                    <button className = "admin-delete-button" onClick={this.delete.bind(this, users.key)}>
                        Delete User
                    </button>
                </TableCell>
                </th>
                )}
        </TableRow>
      </TableBody>
    </Table>
    </div>
    );
  }
}
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

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
