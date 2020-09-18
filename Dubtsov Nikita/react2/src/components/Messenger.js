import React, { useState, useEffect } from "react"
import MessageList from "./MessageList"
import Form from "./MessageForm"

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].author != "Бот") {
      const username = messages[messages.length - 1].author
      setTimeout(() => {
        setMessages(
          messages.concat([
            {
              text: `Привет, ${username}! Я бот, и умею только здороваться!`,
              author: "Бот",
            },
          ])
        )
      }, 500)
    }
  }, [messages])

  function addMessage(text, author) {
    if (!author.trim()) {
      setMessages(messages.concat([{ text, author: "Неизвестный" }]))
    } else {
      setMessages(messages.concat([{ text, author }]))
    }
  }

  return (
    <div className="container">
      <h1>Чат</h1>
      <MessageList messages={messages} />
      <Form onClick={addMessage} />
    </div>
  )
}
export default App
