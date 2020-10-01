import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { ChatItem } from 'components/ChatItem'

class ChatItemContainerClass extends Component {
  redirectToChat = () => {
    this.props.redirect(`/chats/${this.props.item.id}`)
  }

  render() {
    const { item, active } = this.props
    return <ChatItem
      item={item}
      active={active}
      onClick={this.redirectToChat}
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
    redirect: to => dispatch(push(to))
  }
}

export const ChatItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatItemContainerClass)
