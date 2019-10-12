import React, {Component} from 'react'; 
import {storage} from '../Firebase/firebase.js';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';
import { FirebaseContext } from '../Firebase';
import { compose } from 'recompose';
// import logo from '../../logo2.png';
import { withFirebase } from '../Firebase';
import * as firebase from 'firebase';
import AdminWrapper from '../AdminWrapper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'firebase/firestore';

const PDFUploadPage = () => (
  <div>
        <AdminWrapper>{{home:false}}</AdminWrapper>

  <div className="Landing-header">
    <Typography variant = "h2" style = {{marginTop: "40px"}}>Upload a PDF</Typography>
    <FirebaseContext.Consumer>
      {firebase => <PDFUploadForm firebase={firebase} />}
    </FirebaseContext.Consumer>  </div>
    </div>
);

const INITIAL_STATE = {
  title:'',
  tag:'',
  pdf: null,
  url: '',
  progress: 0,
  error: null,
};

class PDFUploadFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const pdf = e.target.files[0];
      this.setState(() => ({pdf}));
    }
  }
  handleUpload = () => {
    const db = firebase.firestore();
      const {pdf, title, tag, url} = this.state;
      const uploadTask = storage.ref(`pdfs/${pdf.name}`).put(pdf);
      // const downloadUrl = storage.ref(`pdfs/${pdf.name}`).getDownloadURL();
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
      storage.ref('pdfs').child(pdf.name).getDownloadURL().then(url => {
        console.log(url);

        db.collection('books').add({
          title: this.state.title,
          tag: this.state.tag,
          url: url
        });
        window.location.href = "/admin"

    })
     
      this.setState({ title, tag, url }); 
      
    },
    
      
  );
  }


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      title,
      tag,
    } = this.state;

    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div className="Landing-header" style={style}>
        <form onSubmit={this.onSubmit}>
       <ul style = {{listStyle: 'none'}}>
      <li>
      <Typography>Title</Typography>
        <TextField required variant = "outlined" type="text" name="title" class="field-divided" value={title} onChange={this.onChange} /> 
      </li>
      <li>
        <Typography>Tag </Typography>
        <TextField required variant = "outlined" type="text" name="tag" class="field-long" value={tag} onChange={this.onChange}/>
      </li>
      </ul>
      </form>
      <CircularProgress color = "secondary" variant = "determinate" value={this.state.progress} />
      <br/>
        <input type="file" onChange={this.handleChange}/>
        {/* <Link to={ROUTES.ADMIN}>  */}
        <Button variant = "contained" className="login-button" onClick={this.handleUpload} style = {{margin: '20px'}}>Upload</Button>
        {/* </Link> */}
        <br/>
      </div>
    )
  }
}
const PDFUploadForm = compose(
  withRouter,
  withFirebase,
)(PDFUploadFormBase);

export default PDFUploadPage;
export { PDFUploadForm};
// export default PDFUpload;
