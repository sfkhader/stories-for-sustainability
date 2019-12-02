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
class Progress extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      currentlyReading: [],
      finished: [],
      books: [],
      progress: []
      // numAdded: 0,
    };
    this.setState.bind(this);
  }

 onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, tags, url, numPages } = doc.data();
      books.push({
        key: doc.id,
        doc,
        title,
        tags,
        url,
        numPages,
      });
    });
    this.setState({
      books: books
   });
   const currentlyReading = [];
   const finished = [];
   const progress = [];
   var that = this;

   firebase.auth().onIdTokenChanged(function(user) {
    if (user) {
      var currentUser = user.uid;
      const progressRef = firebase.firestore().collection('users').doc(currentUser);
      progressRef.get().then((doc) => {
        if (doc.exists) {
          for (let bookid in doc.data().finished) { 
            // console.log(doc.data().currentlyReading)
            var finishedTitle; 
            var key = bookid;
            // console.log(doc.data().finished[key])
            if (!(doc.data().finished[key] === null)) {
              for (let book in books) {
                if (books[book].key == key) {
                  finishedTitle = books[book].title
                  // console.log(finishedTitle)
                }
              }
              finished.push({ finishedTitle, key})
              // console.log(finished)  
            }
            
            
          }

          for (let bookid in doc.data().currentlyReading) { 
            // console.log(bookid)
            var currentlyReadingTitle; 
            // console.log(doc.data().currentlyReading[key])
            // console.log(doc.data().currentlyReading[bookid])
            var key = bookid;
            if (! (doc.data().currentlyReading[key] == null)) {
              console.log(doc.data().currentlyReading[bookid][0])
              for (let book in books) {
                if (books[book].key == key) {
                  currentlyReadingTitle = books[book].title
                  // console.log(currentlyReadingTitle)
                }
                
              }
              currentlyReading.push({ currentlyReadingTitle, key})
              console.log(currentlyReading)
            }
            
          }
          progress['currentlyReadingList'] = currentlyReading;
          progress['finishedList'] = finished;
          
        } else {
          console.log("No such document!");
        }
        that.setState({
          currentlyReading: currentlyReading,
          finished: finished,
          progress: progress
        });  

        // console.log(currentlyReading)
        // console.log(finished)
        // console.log(progress.currentlyReadingList['currentlyReadingTitle'])
        // console.log(progress['currentlyReadingList'])
      })
      
    }
    
  })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { books, progress, currentlyReading, finished } = this.state;
    return (
      <div>
      <UserWrapper>{{home:false}}</UserWrapper>

      <div className="homepage">

        <Typography variant = "h2" style = {{margin: '20px'}}>Progress</Typography>
        <Typography variant = "h6"></Typography>
        <Wrapper> <Typography variant = "h4"> </Typography>
          <CurrentlyReadingList currentlyReading={currentlyReading} />
          <FinishedList finished={finished} />

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
    minWidth: 400,
    backgroundColor: '#EFEFEF'
  },
}));
const CurrentlyReadingList = ({ currentlyReading}) => (
  <Paper className = {useStyles().root}>
    <Table className = {useStyles().table}>
      <TableHead>
        <TableRow>
          <TableCell style= {{borderColor: "black"}}>Currently Reading</TableCell>
          {/* <TableCell style= {{borderColor: "black"}}>Finished</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {currentlyReading.map(curr => (
          <TableRow style= {{borderStyle: "none"}}>
            <tr>
                <Link to={`/book/${curr.key}`}>
                <TableCell style= {{borderColor: "black"}}>{curr.currentlyReadingTitle}</TableCell>
                </Link>
              </tr>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  </Paper>
);

const FinishedList = ({ finished}) => (
  <Paper className = {useStyles().root}>
    <Table className = {useStyles().table}>
      <TableHead>
        <TableRow>
          {/* <TableCell style= {{borderColor: "black"}}>Currently Reading</TableCell> */}
          <TableCell style= {{borderColor: "black"}}>Finished</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {finished.map(finish => (
          <TableRow style= {{borderStyle: "none"}}>
            <tr>
                <Link to={`/book/${finish.key}`}>
                <TableCell style= {{borderStyle: "none"}}>{finish.finishedTitle}</TableCell>
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
)(Progress);