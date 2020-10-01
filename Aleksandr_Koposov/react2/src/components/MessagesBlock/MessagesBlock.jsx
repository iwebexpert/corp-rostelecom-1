import React, { Component } from 'react'
import { nanoid } from 'nanoid'

import { Divider, Typography, Icon, IconButton } from '@material-ui/core'
import { MessageList } from 'components/MessageList'
import { MessageForm } from 'components/MessageForm'

import './MessagesBlock.scss'

export class MessagesBlock extends Component {
  scrollToLastMessage = () => {
    const items = document.querySelectorAll('.messages__list .message')
    const lastItem = items[items.length - 1]
    if (!lastItem) {
      return
    }
    lastItem.scrollIntoView()
  }

  componentDidUpdate() {
    this.scrollToLastMessage()
    // if (!this.chatId) {
    //   return
    // }
    // const len = this.messages.length
    // const botChatId = this.chatId
    // if (!len) {
    //   this.onSend({
    //     author: 'bot',
    //     text: `Добро пожаловать в чат «${this.chatName}»!`
    //   }, botChatId)
    // }
  }

  onDelete = () => {
    this.props.onChatDelete(this.chatId)
  }

  onSend = (message, chat = '') => {
    const { user, onAdd } = this.props
    const chatId = chat || this.chatId
    if (!chatId) {
      return
    }
    message.id = nanoid()
    if (!message.author) {
      message.author = user.id || ''
    }
    onAdd(chatId, message)
  }

  get chatId() {
    const { chat } = this.props
    if (!chat) {
      return ''
    }
    return chat.id
  }

  get chatName() {
    const defaultName = 'Чат не выбран'
    const { chat } = this.props
    if (!chat) {
      return defaultName
    }
    return chat.name || defaultName
  }

  get messages() {
    const { messages } = this.props
    return messages || []
  }

  render() {
    return (
      <div className="messages__block">
        <Typography variant="h6">
          Чат «{this.chatName}»
          <IconButton onClick={this.onDelete}>
            <Icon>delete_forever</Icon>
          </IconButton>
        </Typography>
        <Divider />
        <MessageList
          chatId={this.chatId}
          items={this.messages || []}
          user={this.props.user || {}}
          onContext={this.props.onContext}
        />
        <Divider />
        <MessageForm onSend={this.onSend} />
      </div>
    )
  }
}
