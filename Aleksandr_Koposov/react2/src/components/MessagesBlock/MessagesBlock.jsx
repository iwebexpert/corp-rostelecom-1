import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'

import { Divider, Typography, Icon, IconButton } from '@material-ui/core'
import { MessageList } from 'components/MessageList'
import { MessageForm } from 'components/MessageForm'

import './MessagesBlock.scss'

export const MessagesBlock = (props) => {
  const {
    chat,
    messages,
    user,
    isLoading,
    onContext,
    onChatDelete,
    onAdd
  } = props

  const scrollToLastMessage = () => {
    const items = document.querySelectorAll('.messages__list .message')
    const lastItem = items[items.length - 1]
    if (!lastItem) {
      return
    }
    lastItem.scrollIntoView()
  }

  useEffect(() => {
    scrollToLastMessage()
  }, [])

  const onDelete = () => {
    onChatDelete(chat.id)
  }

  const onSend = (message, chatId = '') => {
    const id = chatId || chat.id
    if (!id) {
      return
    }
    message.id = nanoid()
    if (!message.author) {
      message.author = user.id || ''
    }
    onAdd(id, message)
  }

  const chatName = () => {
    const defaultName = 'Чат не выбран'
    if (!chat) {
      return defaultName
    }
    return chat.name || defaultName
  }

  return (
    <div className="messages__block">
      <Typography variant="h6">
        {isLoading ? 'Загрузка...' : `Чат «${chatName()}»`}
        <IconButton onClick={onDelete}>
          <Icon>delete_forever</Icon>
        </IconButton>
      </Typography>
      <Divider />
      <MessageList
        chatId={(chat || {}).id}
        items={messages || []}
        isLoading={isLoading}
        user={user || {}}
        onContext={onContext}
      />
      <Divider />
      <MessageForm onSend={onSend} />
    </div>
  )
}
