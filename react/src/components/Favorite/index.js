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
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { firebase } from '@firebase/app';
import UserWrapper from '../UserWrapper';



// import classes from '*.module.sass';
// var books = [];
class Favorite extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      favorites: [],
      books: [],
    };
    this.setState.bind(this);
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
   const favorites = [];
   var that = this;
   var user = firebase.auth().currentUser;

  //  firebase.auth().onIdTokenChanged(function(user) {
      if (user) {
        var currentUser = user.uid;
        const favoritesRef = firebase.firestore().collection('users').doc(currentUser);
        favoritesRef.get().then((doc) => {
          if (doc.exists) {

            for (let book in doc.data().favorite) { 
                var bookid = doc.data().favorite[book]
                // console.log(bookid)
              var title; 
            //   var pages = doc.data().favorites;
            //   var key = bookid;
            //   var pagenums = []
              for (let book in books) {
                if (books[book].key == bookid) {

                  title = books[book].title;
                  // console.log(title)
                  favorites.push({title, bookid})
                    // console.log(favorites)
                }
                
              }
            }
          } else {
            console.log("No such document!");
          }
          that.setState({
            favorites: favorites,
          });  

        })
        
      }
    // })

    
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { books, favorites } = this.state;
    return (
      <div>
      <UserWrapper>{{home:false}}</UserWrapper>

      <div className="homepage">

        <Typography variant = "h2" style = {{margin: '20px'}}>Favorites</Typography>
        <Typography variant = "h6"></Typography>
        <Wrapper> <Typography variant = "h4"> </Typography>
          <FavoritesList favorites={favorites} />
        </Wrapper>

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
    minWidth: 200,
    backgroundColor: '#9AA0A8'
  },
}));
const FavoritesList = ({ favorites }) => (
  <Paper className = {useStyles().root}>
    <Table className = {useStyles().table}>
      <TableHead>
        <TableRow>
          <TableCell style= {{borderColor: "black"}}>Title</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {favorites.map(favorite => (
          <TableRow style= {{borderColor: "black"}}>
            <tr>
                <Link to={`/book/${favorite.bookid}`}>
                <TableCell style= {{borderColor: "black"}}>{favorite.title}</TableCell>
                </Link>
              </tr>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  </Paper>
);

export default compose(
  withEmailVerification,
  withFirebase,
)(Favorite);