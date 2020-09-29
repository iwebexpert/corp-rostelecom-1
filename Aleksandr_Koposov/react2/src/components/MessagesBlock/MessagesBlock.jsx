import React, { Component } from 'react'
import { nanoid } from 'nanoid'

import { Divider, Typography } from '@material-ui/core'
import { MessageList } from 'components/MessageList'
import { MessageForm } from 'components/MessageForm'

import './MessagesBlock.scss'

export class MessagesBlock extends Component {
  state = {
    botWriting: false
  }

  scrollToLastMessage = () => {
    const items = document.querySelectorAll('.messages__list .message')
    const lastItem = items[items.length - 1]
    if (!lastItem) {
      return
    }
    lastItem.scrollIntoView()
  }

  setBotWriting = (val) => {
    this.setState({
      botWriting: val
    })
  }

  setBotMessage = (text, timeout) => {
    const botChatId = this.chatId
    this.setBotWriting(true)
    setTimeout(() => {
      this.onSend({
        author: 'bot',
        text
      }, botChatId)
      this.setBotWriting(false)
      this.scrollToLastMessage()
    }, timeout)
  }

  componentDidUpdate() {
    this.scrollToLastMessage()
    if (!this.chatId || this.state.botWriting) {
      return
    }
    const len = this.messages.length
    if (!len) {
      this.setBotMessage(`Добро пожаловать в чат «${this.chatName}»!`, 1000)
      return
    }
    if (this.messages[len - 1].author === 'bot') {
      return
    }
    this.setBotMessage(`Привет, ${this.props.user.name || 'Аноним'}! Это бот!`, 1000)
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
        </Typography>
        <Divider />
        <MessageList
          items={this.messages || []}
          user={this.props.user || {}}
        />
        <Divider />
        <MessageForm onSend={this.onSend} />
      </div>
    )
  }
}
