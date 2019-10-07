import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
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
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { users, loading } = this.state;

    return (
      <div className="Landing-header">
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>
        {loading && <div>Loading ...</div>}
        <Wrapper> User List:
          <UserList users={users} />
        </Wrapper>
        <Inline>
        <Link to={ROUTES.CREATE_ADMIN}>
          <button class="login-button" >
            Create Admin
          </button>
        </Link>
        &nbsp;
        <Link to={ROUTES.FILEUPLOAD}>
          <button class="login-button" >
            Upload Stories
          </button>
        </Link>
        </Inline>
        <Inline>
        <Link to={ROUTES.FILEDELETE}>
            <button class="admin-delete-button" >
              Delete Stories
            </button>

        </Link>
        &nbsp;
        <Link to={ROUTES.DELETE_USER}>
            <button class="admin-delete-button" >
              Delete Users
            </button>

        </Link>
        </Inline>
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
  box-shadow: inset 0 0 0 1px;
  border-radius: 5px;
  border: none;
  outline: none;
  font: inherit;
  background-color: #8FA2A8;
  color: #2A2D34;
  width: 50%;
  text-align: center;
`;

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid} style = {{listStyle: "none"}}>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <br></br>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);