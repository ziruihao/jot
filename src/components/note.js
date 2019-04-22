import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

/**
 * Custom styling overrides for material-ui
 */
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: 275,
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  },
  'card:hover': {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
   * Updates the props.text with whatever is in the <TextField> field.
   * @param {} event
   */
  onInputChangeTitle = (event) => {
    this.props.updateNote(this.props.note.id, {
      title: event.target.value,
    });
  }

  /**
   * Updates the props.text with whatever is in the <TextField> field.
   * @param {} event
   */
  onInputChangeText = (event) => {
    this.props.updateNote(this.props.note.id, {
      text: event.target.value,
    });
  }

  deleteNote = () => {
    this.props.deleteNote(this.props.note.id);
  }

  renderWhetherEditing() {
    const { classes } = this.props;
    // classes.card.width = 'box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';
    if (this.state.isEditing) {
      return (
        <Card className={`${classes.card} note`} style={{ left: this.props.note.x, top: this.props.note.y, zIndex: this.props.note.z }}>
          <CardContent>
            <TextField
              margin="dense"
              id="noteTitleEditor"
              type="text"
              variant="outlined"
              fullWidth
              onChange={this.onInputChangeTitle}
              value={this.props.note.title}
            />
            <TextField
              autofocus
              margin="dense"
              id="notTextEditor"
              type="text"
              variant="outlined"
              fullWidth
              multiline
              rows="5"
              onChange={this.onInputChangeText}
              value={this.props.note.text}
            />
          </CardContent>
          <CardActions>
            <IconButton onClick={this.toggleEdit} className={classes.button} aria-label="Check">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={this.deleteNote} className={classes.button} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      );
    } else {
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
          <Card className={`${classes.card} draggable note`} style={{ zIndex: this.props.note.z }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {this.props.note.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                date_stamp
              </Typography>
              <Typography className="noteBody" component="p" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
            </CardContent>
            <CardActions>
              <IconButton onClick={this.toggleEdit} className={classes.button} aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={this.deleteNote} className={classes.button} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
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

export default withStyles(styles)(Note);
