import React from "react"
import Message from "components/Message/Message"

import "./MessageList.css"

export default function MessageList({ messages }) {
  if (messages.length) {
    return (
      <div className="message-list">
        {messages.map((item, index) => (
          <Message key={index} author={item.author} text={item.text} />
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
