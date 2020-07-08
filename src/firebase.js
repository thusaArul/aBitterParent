import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBpqlg35893WVbTIvvIrHL3SaFDmxaDFsc",
    authDomain: "abitterparent.firebaseapp.com",
    databaseURL: "https://abitterparent.firebaseio.com",
    projectId: "abitterparent",
    storageBucket: "abitterparent.appspot.com",
    messagingSenderId: "1015830040041",
    appId: "1:1015830040041:web:7edb8b23ec4e7e0e4a8f78"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;