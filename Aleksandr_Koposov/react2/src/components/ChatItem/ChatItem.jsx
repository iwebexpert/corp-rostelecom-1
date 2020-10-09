import React, { Component } from 'react'
import classNames from 'classnames'

import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar, Icon, CircularProgress } from '@material-ui/core'

import './ChatItem.scss'

export class ChatItem extends Component {
  render() {
    const { active, item } = this.props
    const { id, name, users, messages } = item || {}
    const classes = classNames('chat router__link', {
      'active': active,
      'chat__flash': item.flash
    })
    return (
      <ListItem
        selected={active}
        className={classes}
        button
        onClick={id ? this.props.onClick : () => ({})}
      >
        <ListItemAvatar>
          <Avatar>
            {id ? (<Icon>chat</Icon>) : (<CircularProgress />)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={id ? name : 'Загрузка...'}
          secondary={id ? 'Пользователей: ' + users.length : ''}
        />
        {
          id ? (
            <ListItemIcon>
              {messages.length} сообщ.
            </ListItemIcon>
          ) : ''
        }
      </ListItem >
    )
  }
}
