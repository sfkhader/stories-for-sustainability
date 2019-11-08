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
// import { connect } from 'react-redux'

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
  languages: [],
  tags:{},
  goals: [],
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
      const {pdf, title, tags, url, languages, goals} = this.state;
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
          languages: this.state.languages,
          goals: this.state.goals,
          url: url
        });
        window.location.href = "/admin"

    })
     
      this.setState({ title, languages, goals, url }); 
      
    },
    
      
  );
  }


  onChange = event => {
    const languages = this.state.languages;
    let index;

    // check if the check box is checked or unchecked
    if (event.target.checked) {
      // add the numerical value of the checkbox to options array
      languages.push(event.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = languages.indexOf(event.target.value)
      languages.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ languages: languages })
    this.setState({ [event.target.name]: event.target.value });


  };

  onGoalsChange = event => {
    const goals = this.state.goals;
    let index;

    // check if the check box is checked or unchecked
    if (event.target.checked) {
      // add the numerical value of the checkbox to options array
      goals.push(event.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = goals.indexOf(event.target.value)
      goals.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ goals: goals })
    this.setState({ [event.target.name]: event.target.value });


  };

  render() {
    const {
      title,
      tags,
      languages
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
        <Typography>Language </Typography>
        <form>
          <div className="input-group">
            <label>English</label>
            <input type="checkbox" value={"English"} onChange={this.onChange.bind(this)} />
          </div>
          <div className="input-group">
            <label>Spanish</label>
            <input type="checkbox" value={"Spanish"} onChange={this.onChange.bind(this)} />
          </div>
          <div className="input-group">
            <label>French</label>
            <input type="checkbox" value={"French"} onChange={this.onChange.bind(this)} />
          </div>
        </form>

        <div className="selected-items">
          {this.state.languages.map(lang => 
             <p key={lang}>item: {lang}</p>
          )}
        </div>
      </li>

      <li>
        <Typography>Goals </Typography>
        <form>
          <div className="input-group">
            <label>Goal1</label>
            <input type="checkbox" value={"goal1"} onChange={this.onGoalsChange.bind(this)} />
          </div>
          <div className="input-group">
            <label>Goal2</label>
            <input type="checkbox" value={"goal2"} onChange={this.onGoalsChange.bind(this)} />
          </div>
          <div className="input-group">
            <label>Goal3</label>
            <input type="checkbox" value={"goal3"} onChange={this.onGoalsChange.bind(this)} />
          </div>
        </form>

        <div className="selected-items">
          {this.state.goals.map(goal => 
             <p key={goal}>item: {goal}</p>
          )}
        </div>


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
