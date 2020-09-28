import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar, Icon } from '@material-ui/core'

import './ChatItem.scss'

export class ChatItem extends Component {
  render() {
    const { active, item } = this.props
    const { id, name, users, messages } = item
    const classes = classNames('chat', {
      'active': active
    })
    return (
      <Link className="router__link" to={`/chats/${id}`}>
        <ListItem
          selected={active}
          className={classes}
          button
        >
          <ListItemAvatar>
            <Avatar>
              <Icon>chat</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={'Пользователей: ' + users.length}
          />
          <ListItemIcon>
            {messages.length} сообщ.
          </ListItemIcon>
        </ListItem>
      </Link>
    )
  }
}
