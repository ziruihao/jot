import firebase from 'firebase';
import 'firebase/auth';

// Initialize Firebase
const config = {
  authDomain: 'cs52-react-notes-43057.firebaseapp.com',
  databaseURL: 'https://cs52-react-notes-43057.firebaseio.com',
  projectId: 'cs52-react-notes-43057',
  storageBucket: 'cs52-react-notes-43057.appspot.com',
  messagingSenderId: '692212143110',
};
firebase.initializeApp(config);

const database = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();

export function fetchNotes(uid, callback) {
  database.ref(`notes/${uid}`).on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function auth(uidCallback, notesCallback) {
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { uid } = result.user;
    const { displayName } = result.user;
    uidCallback(uid, displayName);
    fetchNotes(uid, notesCallback);
    console.log(`user ${displayName} logged in`);
  }).catch((error) => {
    console.log(`error in authentication: ${error}`);
  });
}

export function deAuth() {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
    console.log(`error in deauthentication: ${error}`);
  });
}

export function updateNote(uid, id, noteUpdate) {
  database.ref(`notes/${uid}`).child(id).update(noteUpdate).then(() => { console.log(`firebase updateNote of ID: ${id} successful`); })
    .catch(() => { console.log(`firebase updateNote of ID:${id} failed`); });
}
export function addNote(uid, newNote) {
  const id = database.ref(`notes/${uid}`).push(newNote).key.toString();
  updateNote(uid, id, { id });
}
export function deleteNote(uid, id) {
  database.ref(`notes/${uid}`).child(id).remove().then(() => { console.log(`firebase deleteNote of ID:${id} successful`); })
    .catch(() => { console.log(`firebase deleteNote of ID:${id} failed`); });
}
