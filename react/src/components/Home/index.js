
import { compose } from 'recompose';
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
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Document, Page, pdfjs,} from 'react-pdf';
import { withAuthorization, withEmailVerification } from '../Session';
import SignOutButton from '../SignOut';
import UserWrapper from '../UserWrapper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      books: [],
      numAdded: 0,
      language :'English',
      goal :'goal1'

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
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  filterBooks() {
    var filteredBooks = [];
    var book;
    var bookTags;

    var languageFilterValue = this.state.language;
    var goalFilterValue = this.state.goal;

    // console.log(this.state.books)

    for (let index in this.state.books) {
      book = this.state.books[index];
      bookTags = book.tags;
      if (bookTags.includes(languageFilterValue) && bookTags.includes(goalFilterValue)) {
        filteredBooks.push(book)
      }
    }
  }

  render() {
    var handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    };
    return (
      <div>
        <UserWrapper>{{home: true}}</UserWrapper>

      <div className="homepage">
        <Typography variant = "h2" style = {{margin: '20px'}}>Library</Typography>
      <Table style ={{width: '40%', border: '2px', borderColor: "black"}}>
        <TableBody>
          <TableCell style= {{border: 'none'}}>Filter by:</TableCell>
          <TableCell style= {{border: 'none'}}>
            <Select value = {this.state.language} onChange = {handleChange} inputProps ={{name: 'language'}}>
              <MenuItem value = {"English"}>English</MenuItem>
              <MenuItem value = {"Spanish"}>Spanish</MenuItem>
              <MenuItem value = {"French"}>French</MenuItem>


            </Select>
            <FormHelperText>Language</FormHelperText>
          </TableCell>
          <TableCell style= {{border: 'none'}}>
            <Select value = {this.state.goal} onChange = {handleChange} inputProps ={{name: 'goal'}}>
              <MenuItem value = {"goal1"}>goal1</MenuItem>
              <MenuItem value = {"goal2"}>goal2</MenuItem>
              <MenuItem value = {"goal3"}>goal3</MenuItem>


            </Select>
            <FormHelperText>Sustainability Goal</FormHelperText>

          </TableCell>
          <TableCell style= {{border: 'none'}}>
            <Button variant = "outlined" color="inherit" onClick={() => this.filterBooks()}>Filter</Button>
          
          </TableCell>
        </TableBody>
      </Table>
      <Table>

      <TableBody>

        <TableRow className = "row">
{        this.state.books.map(books =>

          <th align="center">
              <Typography variant = "h5" style = {{margin: "none"}}>{books.title}</Typography>
              <tr>
                <Link to={`/book/${books.key}`}>
                <img src = {cover} className="book-cover"></img>
                </Link>
              </tr>
              <Typography variant = 'body1' align="center" className="description">Book Description</Typography>
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

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Home);
