import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { messagesLoadAction, messageSendAction, messageDeleteAction } from 'actions/messages'
import { chatDeleteAction } from 'actions/chats'

import { MessagesBlock } from 'components/MessagesBlock'

class MessageBlockContainerClass extends Component {
  componentDidMount() {
    this.props.messagesLoadAction()
  }

  onMessageAdd = (chatId, message) => {
    const data = { chatId, message }
    this.props.messageSendAction(data)
  }

  onMessageDelete = (chatId, messageId) => {
    const data = { chatId, messageId }
    this.props.messageDeleteAction(data)
  }

  onChatDelete = (chatId) => {
    this.props.redirect()
    this.props.chatDeleteAction(chatId)
  }

  render() {
    const { messages, chat, user } = this.props
    return <MessagesBlock
      chat={chat || {}}
      messages={messages || []}
      user={user}
      onAdd={this.onMessageAdd}
      onChatDelete={this.onChatDelete}
      onContext={this.onMessageDelete}
    />
  }
}

function mapStateToProps(state, ownProps) {
  const { match } = ownProps
  const user = state.profile.entries
  const chats = state.chats.entries
  const allMessages = state.messages.entries
  const chatId = ((match || {}).params || {}).id || ''
  const chat = chats.find(i => i.id === chatId) || {}
  const messages = !chatId
    ? []
    : allMessages.filter(i => (chat.messages || []).includes(i.id))

  return {
    user,
    messages,
    chat,
    chatId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    messagesLoadAction: () => dispatch(messagesLoadAction()),
    messageSendAction: (message) => dispatch(messageSendAction(message)),
    messageDeleteAction: (chatId, messageId) => dispatch(messageDeleteAction(chatId, messageId)),
    chatDeleteAction: chatId => dispatch(chatDeleteAction(chatId)),
    redirect: () => dispatch(push('/')),
  }
}

export const MessageBlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBlockContainerClass)
