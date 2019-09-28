import app from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://stories-for-sustainability.firebaseio.com'
});


const config = {
    apiKey: "AIzaSyC8Q9QITqvoKM_rqja6HUtgrOtfTDVcVBc",
    authDomain: "stories-for-sustainability.firebaseapp.com",
    databaseURL: "https://stories-for-sustainability.firebaseio.com",
    projectId: "stories-for-sustainability",
    storageBucket: "stories-for-sustainability.appspot.com",
    messagingSenderId: "225361778986",
    appId: "1:225361778986:web:c60e58e013babdd255a653"
  };

  app.initializeApp(config);
  const storage = firebase.storage();
class Firebase {
  constructor() {
    this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    this.db = app.firestore();
  }

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000',
    });

  // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    
  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
         .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

    user = uid => this.db.doc(`users/${uid}`);
    users = () => this.db.collection('users');

    book = uid => this.db.doc(`books/${uid}`);
    books = () => this.db.collection('books');

}

export {
  storage, Firebase as default
}