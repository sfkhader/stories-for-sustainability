
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

const INITIAL_STATE = {
  books: [],
  numAdded: 0,
  language :'Select',
  languages : [],
  goals : [],
  goal :'Select',
  filteredBooks: [],
  imageurl: ''
};
class Home extends Component {
  
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      ...INITIAL_STATE
    };
    this.setState.bind(this);
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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  filterBooks() {
    var filteredBooks = [];
    var book;
    var languageFilterValue = this.state.language;
    var goalFilterValue = this.state.goal;

    
    for (let index in this.state.books) {
      book = this.state.books[index];

      // console.log(languageFilterValue);
      // console.log(goalFilterValue);
      if (languageFilterValue != 'Select' && goalFilterValue != 'Select') {
        if (book.languages.includes(languageFilterValue) && book.goals.includes(goalFilterValue)) {
          filteredBooks.push(book)
  
        }
      } else if (languageFilterValue != 'Select') {
        if (book.languages.includes(languageFilterValue)) {
        
          // console.log(languageFilterValue)
          filteredBooks.push(book)
  
        }
      } else if (goalFilterValue != 'Select') {
        if (book.goals.includes(goalFilterValue)) {
          filteredBooks.push(book)
  
        }
      }
      
    }

    this.setState({
      filteredBooks: filteredBooks
    })
    
  }

  clearFilter() {
    this.setState({
      books: this.state.books,
      numAdded: 0,
      language :'Select',
      languages : [],
      goals : [],
      goal :'Select',
      imageurl: '',
      filteredBooks:  this.state.books   })
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
              <MenuItem value = {"Select"}>Select Language</MenuItem>
              <MenuItem value = {"English"}>English</MenuItem>
              <MenuItem value = {"Spanish"}>Spanish</MenuItem>
              <MenuItem value = {"French"}>French</MenuItem>


            </Select>
            <FormHelperText>Language</FormHelperText>
          </TableCell>
          <TableCell style= {{border: 'none'}}>
            <Select value = {this.state.goal} onChange = {handleChange} inputProps ={{name: 'goal'}}>
              <MenuItem value = {"Select"}>Select Goal</MenuItem>
              <MenuItem value = {"Goal1"}>Goal 1: No Poverty</MenuItem>
              <MenuItem value = {"Goal2"}>Goal 2: Zero Hunger</MenuItem>
              <MenuItem value = {"Goal3"}>Goal 3: Good Health and Well-being</MenuItem>
              <MenuItem value = {"Goal4"}>Goal 4: Quality Education</MenuItem>
              <MenuItem value = {"Goal5"}>Goal 5: Gender Equality</MenuItem>
              <MenuItem value = {"Goal6"}>Goal 6: Clean Water and Sanitation</MenuItem>
              <MenuItem value = {"Goal7"}>Goal 7: Affordable and Clean Energy</MenuItem>
              <MenuItem value = {"Goal8"}>Goal 8: Decent Work and Economic Growth</MenuItem>
              <MenuItem value = {"Goal9"}>Goal 9: Industry, Innovation and Infrastructure</MenuItem>
              <MenuItem value = {"Goal10"}>Goal 10: Reduced Inequality</MenuItem>
              <MenuItem value = {"Goal11"}>Goal 11: Sustainable Cities and Communities</MenuItem>
              <MenuItem value = {"Goal12"}>Goal 12: Responsible Comsumption and Production</MenuItem>
              <MenuItem value = {"Goal13"}>Goal 13: Climate Action</MenuItem>
              <MenuItem value = {"Goal14"}>Goal 14: Life Below Water</MenuItem>
              <MenuItem value = {"Goal15"}>Goal 15: Life on Land</MenuItem>
              <MenuItem value = {"Goal16"}>Goal 16: Peace and Justice Strong Institiutions</MenuItem>
              <MenuItem value = {"Goal17"}>Goal 17: Partnerships to achieve the Goal</MenuItem>

            </Select>
            <FormHelperText>Sustainability Goal</FormHelperText>

          </TableCell>
          <TableCell style= {{border: 'none'}}>
            <Button variant = "outlined" color="inherit" onClick={() => this.filterBooks()}>Filter</Button>
          
          </TableCell>
          <TableCell style= {{border: 'none'}}>
            <Button variant = "outlined" color="inherit" onClick={() => this.clearFilter()}>Clear</Button>
          
          </TableCell>
        </TableBody>
      </Table>
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
