import React, { Component } from 'react';
import Draggable from 'react-draggable';


class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  render() {
    return (
      <Draggable>
        <p>{this.state.title}</p>
      </Draggable>
    );
  }
}

export default Note;
