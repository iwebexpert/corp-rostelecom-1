import React, { Component } from 'react'
import { Icon, Fab, TextField } from '@material-ui/core'

export class MessageForm extends Component {
  state = {
    text: '',
    author: '',
  }

  onMessageSend = () => {
    const { text, author } = this.state
    const { onSend } = this.props

    if (text && author) {
      if (typeof (onSend) === 'function') {
        onSend(this.state)
        this.setState({
          text: ''
        })
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
    const { text, author } = this.state
    return (
      <div className='form'>
        <TextField
          label="Автор"
          variant="outlined"
          placeholder="Автор"
          name="author"
          value={author}
          onChange={this.onInputChange}
          onKeyUp={this.onKeyUp}
        />
        <TextField
          label="Сообщение"
          variant="outlined"
          placeholder="Сообщение"
          multiline
          rowsMax={4}
          name="text"
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
