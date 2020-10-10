import React from 'react'

import { MessageContainer } from 'containers/MessageContainer'
import { Message } from 'components/Message'

import './MessageList.scss'

export const MessageList = (props) => {
  const { chatId, items, user, isLoading } = props
  return (
    <div className='messages__list'>
      {isLoading ? (
        <Message
          text="Загрузка..."
          bot={false}
          user={{}}
          isLoading={isLoading}
        />
      ) : items.map(item =>
        (<MessageContainer
          key={item.id}
          chatId={chatId}
          user={user}
          message={item}
        />))}
    </div>
  )
}
