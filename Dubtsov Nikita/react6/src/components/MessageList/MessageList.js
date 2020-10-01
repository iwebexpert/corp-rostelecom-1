import React from "react"
import Message from "components/Message/Message"

import "./MessageList.css"

export default function MessageList({ messages }) {
  if (messages && messages.length) {
    return (
      <div className="message-list">
        {messages.map((item) => (
          <Message key={item.id} author={item.author} text={item.text} />
        ))}
      </div>
    )
  } else {
    return (
      <div className="message-list">
        <p>Нет сообщений</p>
      </div>
    )
  }
}
