import React, {Component} from 'react'; 
import {storage} from '../Firebase/firebase.js';

class PDFUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf: null,
      url: '',
      progress: 0
    }
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
      const {pdf} = this.state;
      const uploadTask = storage.ref(`pdfs/${pdf.name}`).put(pdf);
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
        // complete function ....
        storage.ref('pdfs').child(pdf.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
    });
  }
  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div className="Landing-header" style={style}>
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" onChange={this.handleChange}/>
        <button className="button" onClick={this.handleUpload}>Upload</button>
        <br/>
      </div>
    )
  }
}

export default PDFUpload;
