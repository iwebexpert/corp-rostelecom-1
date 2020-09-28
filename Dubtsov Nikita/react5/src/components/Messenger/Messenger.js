import React, { useState, useEffect } from "react"
import MessageList from "components/MessageList/MessageList"
import Form from "components/MessageForm/MessageForm"

// import { chats } from "../../helpers/chatsData"
import "./Messenger.css"
import { nanoid } from "nanoid"

export default function Messenger(props) {
  const { messages, handleMessageSend } = props
  return (
    <div className="current-chat">
      {{ messages } ? (
        <MessageList messages={messages} />
      ) : (
        <div className="no-chat">Пожалуйста, выберите чат слева</div>
      )}

      {messages && <Form onSend={handleMessageSend} />}
    </div>
  )
}
