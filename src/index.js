import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';

// importing components
import Note from './components/note';
import NoteMaker from './components/noteMaker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Map(),
    };
  }

  createNote = (title) => {
    console.log('creating note');
    const newNote = {
      title,
      text: '',
      x: 0,
      y: 0,
      z: 0,
    };
    this.setState(
      prevState => ({
        notes: prevState.notes.set('id', newNote),
      }),
    );
  }

  render() {
    const returnedNotes = this.state.notes.entrySeq().map(([id, note]) => <Note key={id} title={note.title} x={note.x} y={note.y} z={note.z} />);
    return (
      <div>
        <div>
          <NoteMaker createNote={this.createNote} />
        </div>
        <div>
          {returnedNotes}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
