import firebase from 'firebase'
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxY2mVhKYIc2kjH0iPuPC0NGt3cmG9eD4",
  authDomain: "flatten-the-curve19.firebaseapp.com",
  databaseURL: "https://flatten-the-curve19.firebaseio.com",
  projectId: "flatten-the-curve19",
  storageBucket: "flatten-the-curve19.appspot.com",
  messagingSenderId: "126295086584",
  appId: "1:126295086584:web:e1f22e9a1f8deb897c720d",
  measurementId: "G-WQQQL1KD9B"
};

const fire = firebase.initializeApp(firebaseConfig)
export const fireDB = firebase.firestore(fire);
export const gProvider = new firebase.auth.GoogleAuthProvider();

export default fire