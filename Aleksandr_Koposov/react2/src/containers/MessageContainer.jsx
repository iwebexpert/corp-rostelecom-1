import React, { Component } from 'react'
import { connect } from 'react-redux'

import { chatDeleteMessageAction } from 'actions/chats'
import { Message } from 'components/Message'

class MessageContainerClass extends Component {
  onDelete = () => {
    this.props.chatDeleteMessageAction(this.props.chatId, this.props.message.id)
  }

  render() {
    const { user, message } = this.props
    return <Message
      text={message.text}
      bot={message.author === 'bot'}
      user={user}
      onDelete={this.onDelete}
    />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.profile.entries || {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatDeleteMessageAction: (chatId, messageId) => dispatch(chatDeleteMessageAction(chatId, messageId)),
  }
}

export const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainerClass)
