import React, { useState } from "react"

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
    <form onSubmit={submitHandler}>
      <label>
        Введите текст сообщения:
        <input
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}
        ></input>
      </label>
      <label>
        Введите ваше имя:
        <input
          value={authorValue}
          onChange={(event) => setAuthorValue(event.target.value)}
        ></input>
      </label>
      <button type="submit">Добавить сообщение</button>
    </form>
  )
}
