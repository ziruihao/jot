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

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}
export function addNotes(note) {
  const newNoteKey = firebase.database().ref().child('posts').push().key;

  const updates = {};
  updates[`/posts/${newNoteKey}`] = note;

  return firebase.database().ref().update(updates);
}
