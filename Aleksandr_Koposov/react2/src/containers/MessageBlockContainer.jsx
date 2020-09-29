import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'

import { messagesLoadAction, messageSendAction } from 'actions/messages'
import { chatMessageSendAction } from 'actions/chats'

import { MessagesBlock } from 'components/MessagesBlock'

class MessageBlockContainerClass extends Component {
  componentDidMount() {
    this.props.messagesLoadAction()
  }

  onMessageAdd = (chatId, message) => {
    const data = { chatId, message }
    this.props.messageSendAction(data)
    this.props.chatMessageSendAction(data)
  }

  render() {
    const { messages, chat, user } = this.props
    return <MessagesBlock
      chat={chat || {}}
      messages={messages || []}
      user={user}
      onAdd={this.onMessageAdd}
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
    : allMessages.filter(i => chat.messages.includes(i.id))

  return {
    user,
    messages,
    chat
  }
}

function mapDispatchToProps(dispatch) {
  return {
    messagesLoadAction: () => dispatch(messagesLoadAction()),
    messageSendAction: (message) => dispatch(messageSendAction(message)),
    chatMessageSendAction: (message) => dispatch(chatMessageSendAction(message)),
  }
}

export const MessageBlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBlockContainerClass)
