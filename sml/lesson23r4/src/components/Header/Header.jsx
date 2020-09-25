import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, withStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  a: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    textAlign: "right",
  }
};

class HeaderClass extends Component {
  render() {
    const { classes } = this.props;
    console.log('Form', classes);
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.root} color="inherit">
            My messenger
          </Typography>
          <Button color="inherit">{' '}
            <Link to="/profile" className={classes.a}>Профиль</Link>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
export const Header = withStyles(styles)(HeaderClass);