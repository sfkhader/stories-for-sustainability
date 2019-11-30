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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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
        // console.log(error);
      }, 
    () => {
      storage.ref('pdfs').child(pdf.name).getDownloadURL().then(url => {
        // console.log(url);

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
        <TextField required variant = "outlined" type="text" name="title" class="field-divided" value={title} onChange={this.onChange} style={{paddingBottom:'20px'}}/> 
      </li>
      <li>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <FormGroup>
            <FormControlLabel control= {<Checkbox value = {"English"} onChange={this.onChange.bind(this)}/>} label="English"/>
            <FormControlLabel control= {<Checkbox value = {"Spanish"} onChange={this.onChange.bind(this)}/>} label="Spanish"/>
            <FormControlLabel control= {<Checkbox value = {"French"} onChange={this.onChange.bind(this)}/>} label="French"/>
          </FormGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Goals</FormLabel>
          <FormGroup>
            <FormControlLabel control= {<Checkbox value = {"Goal1"} onChange={this.onGoalsChange.bind(this)}/>} label="Goal 1"/>
            <FormControlLabel control= {<Checkbox value = {"Goal2"} onChange={this.onGoalsChange.bind(this)}/>} label="Goal 2"/>
            <FormControlLabel control= {<Checkbox value = {"Goal3"} onChange={this.onGoalsChange.bind(this)}/>} label="Goal 3"/>
          </FormGroup>
        </FormControl>

        <Typography variant="body1">Selected Tags:</Typography>
        <div className="selected-items">
          {this.state.languages.map(lang => 
             <Typography variant = "body2" key={lang}>{lang}</Typography>
          )}
        </div>

        <div className="selected-items">
          {this.state.goals.map(goal => 
             <Typography variant="body2" key={goal}>{goal}</Typography>
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
