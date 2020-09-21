import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { Divider } from '@material-ui/core'
import { MessageList } from 'components/MessageList'
import { MessageForm } from 'components/MessageForm'

import './MessagesBlock.scss'

export class MessagesBlock extends Component {
    state = {
        botWriting: false,
        messages: [
            {
                text: 'Message 1',
                author: 'User 1',
                id: nanoid()
            },
            {
                text: 'Message 2',
                author: 'User 1',
                id: nanoid()
            },
            {
                text: 'Message 3',
                author: 'bot',
                id: nanoid()
            },
            {
                text: 'Message 4',
                author: 'User 1',
                id: nanoid()
            },
            {
                text: 'Message 5',
                author: 'bot',
                id: nanoid()
            },
            {
                text: 'Message 6',
                author: 'User 1',
                id: nanoid()
            }
        ]
    }

    scrollToLastMessage = () => {
        const items = document.querySelectorAll('.messages__list .message')
        const lastItem = items[items.length - 1]
        if (!lastItem) {
            return
        }
        lastItem.scrollIntoView()
    }

    componentDidUpdate() {
        this.scrollToLastMessage()
        const len = this.state.messages.length
        const lastMessageAuthor = this.state.messages[len - 1].author
        if (this.state.botWriting || lastMessageAuthor === 'bot') {
            return
        }
        this.state.botWriting = true
        setTimeout(() => {
            this.setState({
                messages: this.state.messages.concat({
                    id: nanoid(),
                    author: 'bot',
                    text: `${lastMessageAuthor}, не приставай ко мне, я робот!`
                })
            })
            this.state.botWriting = false
            this.scrollToLastMessage()
        }, 1000)
    }

    onSend = (message) => {
        message.id = nanoid()
        this.setState({
            messages: this.state.messages.concat([message])
        })
    }

    render() {
        return (
            <div className="messages__block">
                <MessageList items={this.state.messages} />
                <Divider />
                <MessageForm onSend={this.onSend} />
            </div>
        )
    }
}
