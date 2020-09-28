import React, { Component } from 'react'

import { List, Divider } from '@material-ui/core'

import { ChatItem } from 'components/ChatItem'
import { ChatForm } from 'components/ChatForm'

import './ChatsList.scss'

export class ChatsList extends Component {
  render() {
    const { activeChat, onAdd } = this.props
    return (
      <div className="chats__container">
        <List className="chats__list">
          {(this.props.chats || []).map(item => (
            <ChatItem
              key={item.id}
              item={item}
              active={activeChat === item.id}
            />
          ))}
        </List>
        <Divider/>
        <ChatForm onAdd={onAdd}/>
      </div>
    )
  }
}


