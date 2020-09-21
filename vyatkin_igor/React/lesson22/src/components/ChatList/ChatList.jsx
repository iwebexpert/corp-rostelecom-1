import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



export class ChatList extends Component {

  render() {
    return (

      <List component="nav">
        <ListItem button>
          <ListItemText primary="Чат 1" />
        </ListItem >
        <ListItem button>
          <ListItemText primary="Чат 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Чат 3" />
        </ListItem>

      </List>

    );
  }
}