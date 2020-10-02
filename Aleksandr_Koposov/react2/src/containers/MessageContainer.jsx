import React, { Component } from 'react'
import { connect } from 'react-redux'

import { messageDeleteAction } from 'actions/messages'
import { Message } from 'components/Message'

class MessageContainerClass extends Component {
  onDelete = () => {
    this.props.messageDeleteAction(this.props.chatId, this.props.message.id)
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
    messageDeleteAction: (chatId, messageId) => dispatch(messageDeleteAction(chatId, messageId)),
  }
}

export const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainerClass)
