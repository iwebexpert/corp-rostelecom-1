import React, { Component } from 'react'
import { MessageContainer } from 'containers/MessageContainer'
import { Message } from 'components/Message'

import './MessageList.scss'

export class MessageList extends Component {
  render() {
    const { chatId, items, user, isLoading } = this.props
    return (
      <div className='messages__list'>
        {isLoading ? (
          <Message
            text="Загрузка..."
            bot={false}
            user={user}
            isLoading={isLoading}
          />
        ) : items.map(item =>
          (<MessageContainer
            key={item.id}
            chatId={chatId}
            message={item}
          />))}
      </div>
    )
  }
}
