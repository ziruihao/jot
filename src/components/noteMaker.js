import React, { Component } from 'react';

class NoteMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * Updates the NoteMaker state with whatever is in the <input> field.
   * @param {} event
   */
  onInputChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  /**
   * Activates callback to indicate that the user wants to create a new note to App.
   */
  createNote = (event) => {
    this.props.createNote(this.state.title);
  }

  render() {
    return (
      <div>
        <div>
          <input onChange={this.onInputChange} value={this.state.title} placeholder="take a note..." />
        </div>
        <div>
          <button type="button" onClick={this.createNote}>new note</button>
        </div>
      </div>
    );
  }
}

export default NoteMaker;
