import React, { useState, useEffect } from "react"
import MessageList from "components/MessageList/MessageList"
import Form from "components/MessageForm/MessageForm"
import ChatList from "components/ChatList/ChatList"
import Header from "components/Header/Header"

import "./Messenger.css"

export default function Messenger() {
  const [messages, setMessages] = useState([])
  const [chats, setChats] = useState([
    { title: "Диалог 1" },
    { title: "Диалог 2" },
    { title: "Диалог 3" },
    { title: "Диалог 4" },
    { title: "Диалог 5" },
    { title: "Диалог 6" },
  ])

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
      <Header />
      <div className="main">
        <ChatList chats={chats} />
        <div className="current-chat">
          <MessageList messages={messages} />
          <Form onClick={addMessage} />
        </div>
      </div>
    </div>
  )
}
