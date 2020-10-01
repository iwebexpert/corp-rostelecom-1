import React, { Component } from 'react'
import { MessageContainer } from 'containers/MessageContainer'

import './MessageList.scss'

export class MessageList extends Component {
  render() {
    const { chatId, items } = this.props
    return (
      <div className='messages__list'>
        {items.map(item =>
          (<MessageContainer
            key={item.id}
            chatId={chatId}
            message={item}
          />))}
      </div>
    )
  }
}
