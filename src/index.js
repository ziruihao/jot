import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';

// importing components
import Note from './components/note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: new Map({ test: 'a' }),
    };
    this.test_AddNote = this.test_AddNote.bind(this);
  }

  testAddNote = (note) => {
    this.setState(
      prevState => ({
        notes: prevState.notes.set('test', note),
      }),
    );
  }

  render() {
    const newNote = new Note();
    this.testAddNote(newNote);
    console.log(this.state.notes);
    return (
      <div />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
