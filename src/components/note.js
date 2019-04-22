import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.note.id,
      title: props.note.title,
      text: props.note.text,
      x: props.note.x,
      y: props.note.y,
      z: props.note.id,
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
    console.log('dragging');
    e.preventDefault();
    console.log(this.props.getHighestZ());
    this.setState({
      x: ui.x,
      y: ui.y,
      z: this.props.getHighestZ() + 1,
    });
  }

  /**
   * Switches whether the note is being edited or is just being dragged.
   */
  toggleEdit = () => {
    console.log('editing');
    this.setState(
      prevState => ({
        isEditing: !prevState.isEditing,
      }),
    );
  }

  /**
   * Updates the NoteMaker state with whatever is in the <textarea> field.
   * @param {} event
   */
  onInputChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  deleted = () => {
    console.log(this.state.title);
    this.props.deleteNote(this.state.id);
  }

  renderWhetherEditing() {
    let editOrNot = '';
    if (this.state.isEditing) {
      editOrNot = 'save';
      return (
        <div className="note" style={{ left: this.state.x, top: this.state.y }}>
          <p>{this.state.title}</p>
          <i onClick={this.deleted} role="button" tabIndex={0} className="fa fa-trash-o" />
          <button type="button" onClick={this.toggleEdit}>{editOrNot}</button>
          <textarea id="note-editor" name="textarea" onChange={this.onInputChange} value={this.state.text} />
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
            x: this.state.x,
            y: this.state.y,
          }}
          onDrag={this.onDrag}
        >
          <div className="draggable note" style={{ zIndex: this.state.z }}>
            <p>{this.state.title}</p>
            <i onClick={this.handleDeleteClick} role="button" tabIndex={0} className="fa fa-trash-o" />
            <button type="button" onClick={this.toggleEdit}>{editOrNot}</button>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }} />
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
