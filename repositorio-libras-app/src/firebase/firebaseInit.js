import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyCc-dF-ZmsPEHl2ePcRb4FZSkZg4IJIYOQ',

  authDomain: 'repositoriolibras-13d90.firebaseapp.com',

  projectId: 'repositoriolibras-13d90',

  storageBucket: 'repositoriolibras-13d90.appspot.com',

  messagingSenderId: '260973606778',

  appId: '1:260973606778:web:de9a47d689a4bfef20c8c3',

  measurementId: 'G-9ZY07X5H04',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
