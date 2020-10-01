import React, { useState } from "react"
import { TextField, Fab } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

import "./MessageForm.css"

export default function Form({ onSend }) {
  const [textValue, setTextValue] = useState("")
  const [authorValue, setAuthorValue] = useState("")

  function submitHandler(event) {
    event.preventDefault()
    if (!authorValue.trim()) {
      setAuthorValue("Инкогнито")
    }
    let message = { text: textValue, author: authorValue || "Инкогнито" }
    if (textValue.trim()) {
      onSend(message)
    } else {
      alert("Сообщение не может быть пустым!")
    }
    setTextValue("")
  }

  return (
    <form className="message-form">
      <TextField
        id="outlined-basic"
        label="Текст сообщения"
        variant="outlined"
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
        autoFocus
      />
      <TextField
        id="outlined-basic"
        label="Ваше имя"
        variant="outlined"
        value={authorValue}
        onChange={(event) => setAuthorValue(event.target.value)}
      />
      <Fab
        variant="round"
        color="primary"
        type="submit"
        size="small"
        onClick={submitHandler}
      >
        <SendIcon />
      </Fab>
    </form>
  )
}
