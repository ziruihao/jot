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
      keyCounter: 0,
    };
  }

  createNote = (title) => {
    console.log('creating note');
    // increments a new key via a counter
    this.setState(
      prevState => ({
        keyCounter: prevState.keyCounter + 1,
      }),
    );
    // creates the note in object notation form
    const noteData = {
      id: this.state.keyCounter,
      title,
      text: 'hello',
      x: 70,
      y: 50,
      z: this.state.keyCounter,
    };
    // adds note into the map
    this.setState(
      prevState => ({
        notes: prevState.notes.set(noteData.id, noteData),
      }),
    );
  }

  getHighestZ = () => {
    let currentHighestZ = 0;
    this.state.notes.entrySeq().forEach(([id, note]) => {
      if (note.z >= currentHighestZ) {
        currentHighestZ = note.z;
      }
      return null;
    });
    // console.log(currentHighestZ);
    return currentHighestZ;
  }

  deleteNote = (id) => {
    console.log('deleting node');
    this.setState(
      prevState => ({
        notes: prevState.notes.delete(id),
      }),
    );
  }

  render() {
    const returnedNotes = this.state.notes.entrySeq().map(([id, note]) => <Note note={note} key={id} deleteNote={this.deleteNote} getHighestZ={this.getHighestZ} />);
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
