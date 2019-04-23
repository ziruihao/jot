import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';

// material-ui imports
import { MuiThemeProvider, createMuiTheme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// modular functions from firebase wrapper
import * as db from './services/datastore';

// importing components
import NoteMaker from './components/noteMaker';
import Note from './components/note';
import Nav from './components/nav';
// import Menu from './components/menu';

/**
 * Theme override for material-ui
 */
const theme = createMuiTheme({

});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Map(),
      uid: null,
      displayName: '',
      menuOpen: false,
    };
  }

  /**
   * On mount, a listener will be attached to continously read data from firebase.
   */
  componentDidMount() {
    // I am no longer using this because I am doing the authentication extra credit, which requires different 'logged in' or 'logged out' states.
    // Essentially, I cannot immediately fetch from firebase after mounting.
  }

  // logout2 = () => {
  //   console.log('called');
  //   this.setState(
  //     prevState => ({
  //       menuOpen: !prevState.menuOpen,
  //     }),
  //   );
  // }

  login = () => {
    db.auth(this.updateUserInfo, this.updateMap);
  }

  updateMap = (notes) => {
    this.setState({ notes: Map(notes) });
  }

  updateUserInfo = (uid, displayName) => {
    this.setState({
      uid,
      displayName,
    });
  }

  logout = () => {
    db.deAuth();
    this.setState({ uid: null });
    console.log(`user ${this.state.displayName} signed out`);
  }

  /**
   * Creates a note.
   */
  createNote = (title, text) => {
    const newNote = {
      id: '',
      title,
      text,
      x: 70,
      y: 50,
      z: this.getHighestZ() + 2, // new note is always highest
    };
    db.addNote(this.state.uid, newNote);
  }

  /**
   * Updates any properties of existing notes.
   */
  updateNote = (id, fields) => {
    db.updateNote(this.state.uid, id, fields);
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
  }

  renderWhetherLoggedIn() {
    if (this.state.uid === null) {
      return (
        <div>
          <Nav loggedIn={false} login={this.login} updateUserInfo={this.updateUserInfo} />
          <div id="welcome">
            <Paper elevation={1} id="welcomeCard">
              <Typography className="welcomeText" variant="h2">
                This is Jot.
              </Typography>
              <Typography className="welcomeText" variant="subtitle1">
                The new note taker. Dynamic, flexible, and on-the-cloud.
              </Typography>
              <div id="loginArea">
                <Button onClick={this.login} variant="contained" color="primary">Login</Button>
              </div>
            </Paper>
          </div>
        </div>
      );
    } else {
      const returnedNotes = this.state.notes.entrySeq().map(([id, note]) => <Note note={note} key={id} updateNote={this.updateNote} deleteNote={this.deleteNote} getHighestZ={this.getHighestZ} />);
      return (
        <div>
          <Nav loggedIn displayName={this.state.displayName} updateUserInfo={this.updateUserInfo} logout={this.logout} />
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

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.renderWhetherLoggedIn()}
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
