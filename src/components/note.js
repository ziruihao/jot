import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.onDrag = this.onDrag.bind(this);
  }

  /**
   * Handler for dragging.
   * @param {*} e
   * @param {*} ui
   */
  onDrag(e, ui) {
    e.preventDefault();
    this.props.updateNote(this.props.note.id, {
      x: ui.x,
      y: ui.y,
    });
  }

  startDrag = () => {
    this.props.updateNote(this.props.note.id, {
      z: this.props.getHighestZ() + 1,
    });
  }

  /**
   * Switches whether the note is being edited or is just being dragged.
   */
  toggleEdit = () => {
    this.setState(
      prevState => ({
        isEditing: !prevState.isEditing,
      }),
    );
  }

  /**
   * Updates the props.text with whatever is in the <textarea> field.
   * @param {} event
   */
  onInputChange = (event) => {
    this.props.updateNote(this.props.note.id, {
      text: event.target.value,
    });
  }

  deleted = () => {
    this.props.deleteNote(this.props.note.id);
  }

  renderWhetherEditing() {
    let editOrNot = '';
    if (this.state.isEditing) {
      editOrNot = 'save';
      return (
        <div className="note" style={{ left: this.props.note.x, top: this.props.note.y }}>
          <p>{this.props.note.title}</p>
          <i onClick={this.deleted} role="button" tabIndex={0} className="fa fa-trash-o" />
          <button type="button" onClick={this.toggleEdit}>{editOrNot}</button>
          <textarea id="note-editor" name="textarea" onChange={this.onInputChange} value={this.props.note.text} />
        </div>
      );
    } else {
      editOrNot = 'edit';
      return (
        <Draggable
          handle=".draggable"
          grid={[1, 1]}
          defaultPosition={{ x: 0, y: 0 }}
          position={{
            x: this.props.note.x,
            y: this.props.note.y,
          }}
          onStart={this.startDrag}
          onDrag={this.onDrag}
        >
          <div className="draggable note" style={{ zIndex: this.props.note.z }}>
            <p>{this.props.note.title}</p>
            <i onClick={this.handleDeleteClick} role="button" tabIndex={0} className="fa fa-trash-o" />
            <button type="button" onClick={this.toggleEdit}>{editOrNot}</button>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
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
