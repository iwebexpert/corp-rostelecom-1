import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { nanoid } from 'nanoid'

import {
  chatsLoadAction,
  chatAddAction
} from 'actions/chats'

import { ChatsList } from 'components/ChatsList'

class ChatsListContainerClass extends Component {
  componentDidMount() {
    this.props.chatsLoadAction()
  }

  onChatAdd = (name) => {
    const newId = nanoid()
    if (name) {
      this.props.chatAddAction({
        id: newId,
        name: name,
        users: [this.props.user.id],
        messages: []
      })
      this.props.redirect(newId)
    }
  }

  render() {
    const { chats, chatId, isLoading, isError } = this.props
    return <ChatsList
      chats={chats || []}
      isLoading={isLoading}
      isError={isError}
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
  const isLoading = state.chats.loading
  const isError = state.chats.error

  return {
    user,
    chats,
    chatId,
    isLoading,
    isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatAddAction: chat => dispatch(chatAddAction(chat)),
    redirect: id => dispatch(push(`/chats/${id}`)),
  }
}

export const ChatsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsListContainerClass)
