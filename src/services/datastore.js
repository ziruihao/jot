import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDD3GOkGJk_aVdx1xl4EOv9EFQ_QzZ0XgQ',
  authDomain: 'cs52-react-notes-43057.firebaseapp.com',
  databaseURL: 'https://cs52-react-notes-43057.firebaseio.com',
  projectId: 'cs52-react-notes-43057',
  storageBucket: 'cs52-react-notes-43057.appspot.com',
  messagingSenderId: '692212143110',
};
firebase.initializeApp(config);

const database = firebase.database();
