import React, { Component } from 'react'

import { List, Divider } from '@material-ui/core'

import { ChatForm } from 'components/ChatForm'
import { ChatItemContainer } from 'containers/ChatItemContainer'

import './ChatsList.scss'

export class ChatsList extends Component {
  render() {
    const { activeChat, onAdd } = this.props
    return (
      <div className="chats__container">
        <List className="chats__list">
          {(this.props.chats || []).map(item => (
            <ChatItemContainer
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


