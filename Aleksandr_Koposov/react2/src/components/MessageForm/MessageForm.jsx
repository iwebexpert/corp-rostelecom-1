import React, { Component } from 'react'
import { Icon, Fab, TextField } from '@material-ui/core'

import './MessageForm.scss'

export class MessageForm extends Component {
  state = {
    text: ''
  }

  onMessageSend = () => {
    const { text } = this.state
    const { onSend } = this.props

    if (text) {
      if (typeof (onSend) === 'function') {
        onSend(this.state)
        document.getElementById('text').focus()
        this.setState({ text: '' })
      }
    } else {
      alert('Заполните все поля формы.')
    }
  }

  onInputChange = (event) => {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  onKeyUp = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.onMessageSend()
    }
  }

  render() {
    const { text } = this.state
    return (
      <div className='message__form'>
        <TextField
          id="text"
          name="text"
          label="Сообщение"
          variant="outlined"
          placeholder="Сообщение"
          multiline
          rowsMax={4}
          color="primary"
          value={text}
          onChange={this.onInputChange}
          onKeyUp={this.onKeyUp}
        />
        <Fab
          color="primary"
          size="small"
          onClick={this.onMessageSend}
        >
          <Icon>send</Icon>
        </Fab>
      </div>
    )
  }
}
