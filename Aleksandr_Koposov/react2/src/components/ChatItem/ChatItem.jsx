import React, { Component } from 'react'
import classNames from 'classnames'

import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar, Icon } from '@material-ui/core'

import './ChatItem.scss'

export class ChatItem extends Component {
  render() {
    const { active, item } = this.props
    const { name, users, messages } = item
    const classes = classNames('chat router__link', {
      'active': active,
      'chat__flash': item.flash
    })
    return (
      <ListItem
        selected={active}
        className={classes}
        button
        onClick={this.props.onClick}
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
    )
  }
}
