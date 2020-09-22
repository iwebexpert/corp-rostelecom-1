import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

export class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            My messenger
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
