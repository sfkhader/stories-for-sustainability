// import React from 'react';
// import logo from '../../logo2.png';
// import { compose } from 'recompose';
import cover from '../../images/cover.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import { firebase } from '@firebase/app';
// import 'firebase/firestore';
// import { withFirebase } from '../Firebase';
// import { withAuthorization, withEmailVerification } from '../Session';

// var db = firebase.firestore();


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './App.css';
import { firebase } from '@firebase/app';
import {Document, Page, pdfjs,} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      books: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, tags, url } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        tags,
        url,
      });
    });
    this.setState({
      books
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  render() {
    return (
      <div className="Landing-header">
      <Table>
      <TableBody>
        <TableRow className = "row">
            {this.state.books.map(books =>
                <th align="center">
                    <th>{books.title}</th>
                    <tr>
                      <Link to={`/book/${books.key}`}>
                      <img src = {cover} className="book-cover"></img>
                      </Link>
                    </tr>
                    <p align="center" className="description">Book Description</p>
                    </th>
                )}
          {/* <TableCell></TableCell> */}
        </TableRow>
      </TableBody>
    </Table>
    </div>
      // <div class="Landing-header">
      //   <div class="panel panel-default">
      //     <div class="panel-heading">
      //       <h3 class="panel-title">
      //         BOARD LIST
      //       </h3>
      //     </div>
      //     <div class="panel-body">
      //       <table class="table table-stripe">
      //         <thead>
      //           <tr>
      //             <th>Title</th>
      //             <th>Description</th>
      //             <th>Author</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {this.state.books.map(books =>
      //             <tr>
      //               <td><Link to={`/show/${books.key}`}>{books.title}</Link></td>
      //               <td>{books.tags}</td>
      //               <td>{books.url}</td>
      //             </tr>
      //           )}
      //         </tbody>
      //       </table>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Home;
// db.collection('books').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     renderCafe(doc);
//   })
// }
// )
// const bookList = () => (
//   <div class="content">
//     <ul id="book-list"></ul>
//   </div>
//   document.querySelector('#book-list');
//   console.log(bookList);
  
//   function renderCafe(doc){
//     let li = document.createElement('li');
//     let title = document.createElement('span');
//     let tag = document.createElement('span');
  
//     li.setAttribute('data-id', doc.id);
//     console.log(li);
//     title.textContent = doc.data().title;
//     tag.textContent = doc.data().tag;
  
//     li.appendChild(title);
//     li.appendChild(tag);
  
//     bookList.appendChild(li);
//   }
// );

// db.collection("books")
// .get()
// .then(querySnapshot => {
//   const data = querySnapshot.docs.map(doc => doc.data());
//   console.log(data); // array of cities objects
// });

// const HomePage = () => (
  
  // <div className="Landing-header">
  //   <h2>Welcome!</h2>
  //   <Table>
  //     <TableBody>
  //       <TableRow className = "row">
  //         <TableCell><Link to={ROUTES.BOOK}><img src = {cover} className="book-cover"/></Link><p className = "name">Name of Book</p><p className="description">Description of Book</p></TableCell>
  //         <TableCell><img src = {cover} className="book-cover"/></TableCell>
  //         <TableCell><img src = {cover} className="book-cover"/></TableCell>
  //         <TableCell></TableCell>
  //       </TableRow>
  //     </TableBody>
  //   </Table>
    
  // </div>
// );
// const condition = authUser => !!authUser;
// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(HomePage);
