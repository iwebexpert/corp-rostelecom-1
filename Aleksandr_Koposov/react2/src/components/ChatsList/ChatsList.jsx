import React, { Component } from 'react'

import { List, Divider, Skeleton, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import { ChatForm } from 'components/ChatForm'
import { ChatItemContainer } from 'containers/ChatItemContainer'

import './ChatsList.scss'

export class ChatsList extends Component {
  render() {
    const { activeChat, onAdd, isLoading } = this.props
    return (
      <div className="chats__container">
        <List className="chats__list">
          {isLoading ? (
            <ChatItemContainer
              key='0'
              item={{}}
            />
          ) : (
              (this.props.chats || []).map(item => (
                <ChatItemContainer
                  key={item.id}
                  item={item}
                  active={activeChat === item.id}
                />
              ))
            )}
        </List>
        <Divider />
        <ChatForm onAdd={onAdd} />
      </div>
    )
  }
}


