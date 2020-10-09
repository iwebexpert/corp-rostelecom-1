import React from 'react'
import { useDispatch } from 'react-redux'

import { chatDeleteMessageAction } from 'actions/chats'
import { Message } from 'components/Message'

export const MessageContainer = (props) => {
  const { user, chatId, message } = props
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(chatDeleteMessageAction(
      chatId,
      message.id
    ))
  }

  return <Message
    text={message.text}
    bot={message.author === 'bot'}
    user={user || {}}
    onDelete={onDelete}
  />
}
