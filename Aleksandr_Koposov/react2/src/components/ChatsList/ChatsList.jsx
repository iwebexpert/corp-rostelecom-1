import React from 'react'

import { List, Divider } from '@material-ui/core'

import { ChatForm } from 'components/ChatForm'
import { ChatItemContainer } from 'containers/ChatItemContainer'

import './ChatsList.scss'

export const ChatsList = (props) => {
  const { activeChat, chats, onAdd, isLoading } = props
  return (
    <div className="chats__container">
      <List className="chats__list">
        {isLoading ? (
          <ChatItemContainer
            key='0'
            item={{}}
          />
        ) : (
            (chats || []).map(item => (
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
