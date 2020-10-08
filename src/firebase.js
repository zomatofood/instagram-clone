import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQDm3u-Rl3OmCzvrNc-tNl59XUssPcrQo",
    authDomain: "instagram-clone-fd59f.firebaseapp.com",
    databaseURL: "https://instagram-clone-fd59f.firebaseio.com",
    projectId: "instagram-clone-fd59f",
    storageBucket: "instagram-clone-fd59f.appspot.com",
    messagingSenderId: "1025702462613",
    appId: "1:1025702462613:web:88d808b59f739a3235879c",
    measurementId: "G-VDPC71TDZL"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
export {auth,provider,db,storage};