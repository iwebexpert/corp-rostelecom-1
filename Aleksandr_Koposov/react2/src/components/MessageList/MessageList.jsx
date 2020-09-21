import React, { Component } from 'react'
import { Message } from 'components/Message'

import './MessageList.scss'

export class MessageList extends Component {
    render() {
        const items = this.props.items
            .map(item =>
                (<Message
                    key={item.id}
                    text={item.text}
                    author={item.author}
                />))
        return (
            <div className='messages__list'>{items}</div>
        )
    }
}
