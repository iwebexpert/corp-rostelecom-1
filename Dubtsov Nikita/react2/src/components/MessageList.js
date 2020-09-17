import React from "react"
import Message from "./Message"

export default function MessageList({ messages }) {
  if (messages.length) {
    return messages.map((item, index) => (
      <Message key={index} author={item.author} text={item.text} />
    ))
  } else {
    return <p>Нет сообщений</p>
  }
}
