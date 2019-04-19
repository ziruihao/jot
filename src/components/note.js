import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      text: props.text,
      x: props.x,
      y: props.y,
      z: props.z,
    };
  }

  render() {
    return (
      <Draggable />
    );
  }
}

export default Note;
