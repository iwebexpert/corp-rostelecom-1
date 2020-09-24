import React, { useState, useEffect } from "react"
import MessageList from "components/MessageList/MessageList"
import Form from "components/MessageForm/MessageForm"

import { chats } from "../../helpers/chatsData"
import "./Messenger.css"
import { nanoid } from "nanoid"

export default function Messenger(props) {
  const [chatsList, setChatsList] = useState(chats)

  useEffect(() => {
    const messages = getMessages()
    if (messages && messages.length) {
      const { author } = messages[messages.length - 1]
      if (author !== "Бот") {
        setTimeout(() => {
          handleMessageSend({
            text: `Привет, ${author}, я Бот!`,
            author: "Бот",
          })
        }, 500)
      }
    }
  }, [getMessages()])

  function getMessages() {
    let messages = null
    if (props.match && chats[props.match.params.id]) {
      messages = chatsList[props.match.params.id].messages
    }
    return messages
  }

  const handleMessageSend = (message) => {
    let messages = getMessages()

    message.id = nanoid(8)

    const chat = chatsList[props.match.params.id]
    chat.messages = messages.concat([message])

    setChatsList({ ...chats, [props.match.params.id]: chat })
  }

  return (
    <div className="current-chat">
      {getMessages() ? (
        <MessageList messages={getMessages()} />
      ) : (
        <div className="no-chat">Пожалуйста, выберите чат слева</div>
      )}

      {getMessages() && <Form onSend={handleMessageSend} />}
    </div>
  )
}
