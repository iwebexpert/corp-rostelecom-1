import React, { Component } from 'react'
import { MessageList } from './MessageList'
import { MessageForm } from './MessageForm'

export default class App extends Component {
  state = {
    messages: [
      {
        text: 'Message 1',
        author: 'User 1'
      },
      {
        text: 'Message 2',
        author: 'User 1'
      },
      {
        text: 'Message 3',
        author: 'bot'
      },
      {
        text: 'Message 4',
        author: 'User 1'
      },
      {
        text: 'Message 5',
        author: 'bot'
      },
      {
        text: 'Message 6',
        author: 'User 1'
      }
    ]
  }

  componentDidUpdate() {
    const lastMessageAuthor = this.state.messages[this.state.messages.length - 1].author
    if (lastMessageAuthor === 'bot') {
      return
    }
    setTimeout(() => {
      this.setState({
        messages: this.state.messages.concat({
          author: 'bot',
          text: `${lastMessageAuthor}, не приставай ко мне, я робот!`
        })
      })
    }, 1000)
  }

  onSend = (message) => {
    this.setState({
      messages: this.state.messages.concat([message])
    })
  }

  render() {
    return (
      <div>
        <MessageList items={this.state.messages}/>
        <MessageForm onSend={this.onSend}/>
      </div>
    )
  }
}
