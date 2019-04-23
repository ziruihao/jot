import React, { Component } from 'react';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
    };
  }

  renderWhetherLoggedIn() {
    const { classes } = this.props;
    if (!this.props.loggedIn) {
      return (
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                Jot
            </Typography>
            <Button onClick={this.props.login} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.props.toggleMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                Jot
            </Typography>
            <Typography variant="subtitle1" color="inherit" className={classes.grow}>
              {`Hello, ${this.props.displayName}`}
            </Typography>
            <Button onClick={this.props.logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderWhetherLoggedIn()}
      </div>
    );
  }
}

export default withStyles(styles)(Nav);
