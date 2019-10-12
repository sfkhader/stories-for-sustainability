import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
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


// import classes from '*.module.sass';

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
      <div>
      <AdminWrapper>{{home:true}}</AdminWrapper>

      <div className="homepage">

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