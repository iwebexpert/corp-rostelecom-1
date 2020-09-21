import React, { useState } from "react"
import { TextField, Fab } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

import "./MessageForm.css"

export default function Form({ onClick }) {
  const [textValue, setTextValue] = useState("")
  const [authorValue, setAuthorValue] = useState("")

  function submitHandler(event) {
    event.preventDefault()

    if (textValue.trim()) {
      onClick(textValue, authorValue)
    } else {
      alert("Сообщение не может быть пустым!")
    }
    setTextValue("")
  }

  return (
    <form onSubmit={submitHandler} className="message-form">
      <TextField
        id="outlined-basic"
        label="Текст сообщения"
        variant="outlined"
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
        autoFocus="true"
      />
      <TextField
        id="outlined-basic"
        label="Ваше имя"
        variant="outlined"
        value={authorValue}
        onChange={(event) => setAuthorValue(event.target.value)}
      />
      <Fab variant="round" color="primary" type="submit" size="small">
        <SendIcon />
      </Fab>
    </form>
  )
}
