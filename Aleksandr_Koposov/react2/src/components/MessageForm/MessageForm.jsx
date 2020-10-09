import React, { useState } from 'react'
import { Icon, Fab, TextField } from '@material-ui/core'

import './MessageForm.scss'

export const MessageForm = (props) => {
  const [dataForm, setDataForm] = useState({ text: '' })

  const onMessageSend = () => {
    const { text } = dataForm
    const { onSend } = props

    if (text) {
      onSend(dataForm)
      setDataForm({ ...dataForm, text: '' })
      document.getElementById('text').focus()
    } else {
      alert('Заполните все поля формы.')
    }
  }

  const onInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value
    })
  }

  const onKeyUp = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      onMessageSend()
    }
  }

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
        value={dataForm.text}
        onChange={onInputChange}
        onKeyUp={onKeyUp}
      />
      <Fab
        color="primary"
        size="small"
        onClick={onMessageSend}
      >
        <Icon>send</Icon>
      </Fab>
    </div>
  )
}
