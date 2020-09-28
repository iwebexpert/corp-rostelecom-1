import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'

import { chatsLoadAction, chatAddAction } from 'actions/chats'

import { ChatsList } from 'components/ChatsList'

class ChatsListContainerClass extends Component {
  componentDidMount() {
    this.props.chatsLoadAction()
  }

  routeTo = (id) => {
    if (this.props.history) {
      this.props.history.push(`/chats/${id}`)
    }
  }

  onChatAdd = (name) => {
    const newId = nanoid()
    this.props.chatAddAction({
      id: newId,
      name: name,
      users: [this.props.user.id],
      messages: []
    }, this.routeTo)
  }

  render() {
    const { chats, chatId } = this.props
    return <ChatsList
      chats={chats || []}
      activeChat={chatId}
      onAdd={this.onChatAdd}
    />
  }
}

function mapStateToProps(state, ownProps) {
  const { match } = ownProps
  const user = state.profile.entries
  const chats = state.chats.entries
  const chatId = ((match || {}).params || {}).id || ''

  return {
    user,
    chats,
    chatId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatAddAction: (chat, cb) => dispatch(chatAddAction(chat, cb)),
  }
}

export const ChatsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsListContainerClass)
