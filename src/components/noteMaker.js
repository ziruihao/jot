import React, { Component } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Custom styling overrides for material-ui
 */
const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class NoteMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      dialogOpen: false,
    };
  }

  /**
   * Updates the NoteMaker state with whatever is in the <input> field.
   * @param {} event
   */
  onInputChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
    console.log(this.state.title);
  }

  /**
   * Updates the NoteMaker state with whatever is in the <input> field.
   * @param {} event
   */
  onInputChangeText = (event) => {
    this.setState({
      text: event.target.value,
    });
    console.log(this.state.text);
  }

  /**
   * Activates callback to indicate that the user wants to create a new note to App.
   */
  createNote = () => {
    this.closeDialog();
    this.cleanDialog();
    this.props.createNote(this.state.title, this.state.text);
  }

  /**
   * Opens the dialog to create a new note.
   */
  openDialog = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  /**
   * Clears out any entries in the dialog.
   */
  cleanDialog = () => {
    this.setState({
      title: '',
      text: '',
    });
  }

  /**
   * Closes the dialog to create a new note.
   */
  closeDialog = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New note</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="noteTitle"
              label="Note title"
              type="text"
              fullWidth
              onChange={this.onInputChangeTitle}
              value={this.state.title}
            />
            <TextField
              margin="dense"
              id="noteText"
              label="Note body"
              type="text"
              fullWidth
              multiline
              rows="5"
              onChange={this.onInputChangeText}
              value={this.state.text}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createNote} color="primary">
              Create Note
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <Fab color="primary" aria-label="Add" className={classes.fab} variant="extended" onClick={this.openDialog}>
            <AddIcon className="extendedIcon" />New Note
          </Fab>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NoteMaker);
