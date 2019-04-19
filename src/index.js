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
    this.testAddNote = this.testAddNote.bind(this);
  }

  testAddNote = (note) => {
    this.setState(
      prevState => ({
        notes: prevState.notes.set('test', note),
      }),
    );
  }

  render() {
    const newNote = new Note({
      id: '',
      title: '',
      text: '',
      x: '',
      y: '',
      z: '',

    });
    this.testAddNote(newNote);
    console.log(this.state.notes);
    return (
      <div />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
