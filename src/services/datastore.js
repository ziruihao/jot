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
export function updateNote(id, noteUpdate) {
  database.ref('notes').child(id).update(noteUpdate).then(() => { console.log(`firebase updateNote of ID: ${id} successful`); })
    .catch(() => { console.log(`firebase updateNote of ID:${id} failed`); });
}
export function addNote(newNote) {
  const id = database.ref('notes').push(newNote).key.toString();
  updateNote(id, { id });
}
export function deleteNote(id) {
  database.ref('notes').child(id).remove().then(() => { console.log(`firebase deleteNote of ID:${id} successful`); })
    .catch(() => { console.log(`firebase deleteNote of ID:${id} failed`); });
}
