import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArtTrack from '@material-ui/icons/ArtTrack';

export class ChatList extends Component {

  render() {
    return (
      <div>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <ArtTrack />
            </ListItemIcon>
            <ListItemText primary="Чат 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ArtTrack />
            </ListItemIcon>
            <ListItemText primary="Чат 2" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ArtTrack />
            </ListItemIcon>
            <ListItemText primary="Чат 3" />
          </ListItem>
        </List>

      </div>
    );
  }
}