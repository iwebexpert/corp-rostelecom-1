import React from 'react'
import { push } from 'connected-react-router'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { chatDeleteAction, chatDeleteMessageAction, chatMessageSendAction } from 'actions/chats'

import { MessagesBlock } from 'components/MessagesBlock'

export const MessageBlockContainer = (props) => {
  const chatId = useParams().id || ''
  const dispatch = useDispatch()

  const [user, chats, isLoading] = useSelector((state) => ([
    state.profile.entries,
    state.chats.entries,
    state.chats.loading,
  ]))
  const chat = chats.find(i => i.id === chatId) || {}
  const messages = !chatId
    ? []
    : chat.messages || []

  const onMessageAdd = (chatId, message) => {
    dispatch(chatMessageSendAction({
      chatId,
      message
    }))
  }

  const onMessageDelete = (chatId, messageId) => {
    dispatch(chatDeleteMessageAction({
      chatId,
      messageId
    }))
  }

  const onChatDelete = (chatId) => {
    dispatch(push('/'))
    dispatch(chatDeleteAction(chatId))
  }

  return <MessagesBlock
    chat={chat || {}}
    chatId={chatId || ''}
    messages={messages || []}
    isLoading={isLoading}
    user={user}
    onAdd={onMessageAdd}
    onChatDelete={onChatDelete}
    onContext={onMessageDelete}
  />
}
