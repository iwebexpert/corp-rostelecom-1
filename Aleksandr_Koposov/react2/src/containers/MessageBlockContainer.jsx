import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { chatDeleteAction, chatDeleteMessageAction, chatMessageSendAction } from 'actions/chats'

import { MessagesBlock } from 'components/MessagesBlock'

class MessageBlockContainerClass extends Component {
  onMessageAdd = (chatId, message) => {
    const data = { chatId, message }
    this.props.chatMessageSendAction(data)
  }

  onMessageDelete = (chatId, messageId) => {
    const data = { chatId, messageId }
    this.props.chatDeleteMessageAction(data)
  }

  onChatDelete = (chatId) => {
    this.props.redirect()
    this.props.chatDeleteAction(chatId)
  }

  render() {
    const { messages, chat, user, isLoading, isError } = this.props
    return <MessagesBlock
      chat={chat || {}}
      messages={messages || []}
      isLoading={isLoading}
      isError={isError}
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
  const isLoading = state.chats.loading
  const isError = state.chats.error
  const chatId = ((match || {}).params || {}).id || ''
  const chat = chats.find(i => i.id === chatId) || {}
  const messages = !chatId
    ? []
    : chat.messages || []

  return {
    user,
    messages,
    chat,
    chatId,
    isLoading,
    isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatMessageSendAction: (chatId, message) => dispatch(chatMessageSendAction(chatId, message)),
    chatDeleteMessageAction: (chatId, messageId) => dispatch(chatDeleteMessageAction(chatId, messageId)),
    chatDeleteAction: chatId => dispatch(chatDeleteAction(chatId)),
    redirect: () => dispatch(push('/')),
  }
}

export const MessageBlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBlockContainerClass)
