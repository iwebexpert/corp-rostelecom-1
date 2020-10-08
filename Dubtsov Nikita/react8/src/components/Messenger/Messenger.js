import React, { useState, useEffect } from "react"
import MessageList from "components/MessageList/MessageList"
import Form from "components/MessageForm/MessageForm"
import ChatList from "components/ChatList/ChatList"

import "./Messenger.css"

export default function Messenger({
  chats,
  messages,
  handleMessageSend,
  handleChatAdd,
  chatId,
}) {
  return (
    <>
      <ChatList chats={chats} handleChatAdd={handleChatAdd} chatId={chatId} />

      <div className="current-chat">
        {{ messages } ? (
          <MessageList messages={messages} />
        ) : (
          <div className="no-chat">Пожалуйста, выберите чат слева</div>
        )}

        {messages && <Form onSend={handleMessageSend} />}
      </div>
    </>
  )
}
