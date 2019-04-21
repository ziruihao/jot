import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.note.id,
      title: props.note.title,
      x: props.note.x,
      y: props.note.y,
      isEditing: false,
    };
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag(e, ui) {
    e.preventDefault();
    console.log(ui);
    this.setState({
      x: ui.x,
      y: ui.y,
    });
  }

  deleted = (id) => {
    console.log(this.state.title);
    this.props.deleteNote(this.state.id);
  }

  renderWhetherEditing() {
    if (this.state.isEditing) {
      return (
        <div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    } else {
      return (
        <Draggable
          handle=".draggable"
          grid={[1, 1]}
          defaultPosition={{ x: 0, y: 0 }}
          position={{
            x: this.state.x,
            y: this.state.y,
          }}
          onDrag={this.onDrag}
        >
          <div className="draggable">
            <p>{this.state.title}</p>
            <button type="button" onClick={this.deleted}>delete</button>
          </div>
        </Draggable>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderWhetherEditing()}
      </div>
    );
  }
}

export default Note;
