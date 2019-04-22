import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';

// importing components
import Note from './components/note';
import NoteMaker from './components/noteMaker';

// modular functions from firebase wrapper
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Map(),
    };
  }

  /**
   * On mount, a listener will be attached to continously read data from firebase.
   */
  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  /**
   * Creates a note.
   */
  createNote = (title) => {
    // // increments a new key via a counter
    // this.setState(
    //   prevState => ({
    //     keyCounter: prevState.keyCounter + 1,
    //   }),
    // );
    // creates the note in object notation form
    const newNote = {
      id: '',
      title,
      text: '',
      x: 70,
      y: 50,
      z: this.getHighestZ(),
    };

    db.addNote(newNote);
    // adds note into the map
    // this.setState(
    //   prevState => ({
    //     notes: prevState.notes.set(noteData.id, noteData),
    //   }),
    // );
  }

  /**
   * Updates any properties of existing notes.
   */
  updateNote = (id, fields) => {
    db.updateNote(id, fields);
    // this.setState(prevState => ({
    //   notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    // }));
  }

  /**
   * Retrieves highest z-index of all existing notes; used for dynamic z-index feature.
   */
  getHighestZ = () => {
    let currentHighestID;
    let currentHighestZ = 0;
    this.state.notes.entrySeq().forEach(([id, note]) => {
      if (note.z >= currentHighestZ) {
        currentHighestID = id;
        currentHighestZ = note.z;
      }
      return null;
    });
    return currentHighestZ;
  }

  /**
   * Deletes a note.
   */
  deleteNote = (id) => {
    db.deleteNote(id);
    // this.setState(
    //   prevState => ({
    //     notes: prevState.notes.delete(id),
    //   }),
    // );
  }

  render() {
    const returnedNotes = this.state.notes.entrySeq().map(([id, note]) => <Note note={note} key={id} updateNote={this.updateNote} deleteNote={this.deleteNote} getHighestZ={this.getHighestZ} />);
    return (
      <div>
        <div>
          <NoteMaker createNote={this.createNote} />
        </div>
        <div id="notes">
          {returnedNotes}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
