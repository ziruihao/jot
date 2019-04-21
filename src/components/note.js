import React, { Component } from 'react';
import Draggable from 'react-draggable';


class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      x: props.x,
      y: props.y,
    };
  }


  render() {
    return (
      <Draggable
        handle=".draggable"
        grid={[1, 1]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{
          x: this.state.x,
          y: this.state.y,
        }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <p className="draggable">{this.state.title}</p>
      </Draggable>
    );
  }
}

export default Note;
