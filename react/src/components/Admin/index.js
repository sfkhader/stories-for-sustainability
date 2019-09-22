import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

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
        <UserList users={users} />
        <Link to={ROUTES.FILEUPLOAD}> 
        <button class="button" >
          Upload Stories
        </button>
    </Link>
      </div>
    );
  }
}


const UserList = ({ users }) => (
  <ul>
    <Link to={ROUTES.CREATE_ADMIN}> 
        <button class="button" >
          Create Admin
        </button>
    </Link>

    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <br></br>
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