import React, { Component } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Person from '@material-ui/icons/Person';



export class ChatList extends Component {

  render() {
      return (
          <div>
              <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                      <ListItemIcon>
                          <Person />
                      </ListItemIcon>
                      <ListItemText primary="Чат 1" />
                  </ListItem>
                  <ListItem button>
                      <ListItemIcon>
                          <Person />
                      </ListItemIcon>
                      <ListItemText primary="Чат 2" />
                  </ListItem>
                  <ListItem button>
                      <ListItemIcon>
                          <Person />
                      </ListItemIcon>
                      <ListItemText primary="Чат 3" />
                  </ListItem>
              </List>

          </div>
      );
  }
}