import app from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyC8Q9QITqvoKM_rqja6HUtgrOtfTDVcVBc",
    authDomain: "stories-for-sustainability.firebaseapp.com",
    databaseURL: "https://stories-for-sustainability.firebaseio.com",
    projectId: "stories-for-sustainability",
    storageBucket: "",
    messagingSenderId: "225361778986",
    appId: "1:225361778986:web:c60e58e013babdd255a653"
  };

  
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();

  }
  // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

}
export default Firebase;