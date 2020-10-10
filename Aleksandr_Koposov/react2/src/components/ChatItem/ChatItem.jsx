import React from 'react'
import classNames from 'classnames'

import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar, Icon, CircularProgress } from '@material-ui/core'

import './ChatItem.scss'

export const ChatItem = (props) => {
  const { active, item, onClick } = props
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
      onClick={id ? onClick : () => ({})}
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
