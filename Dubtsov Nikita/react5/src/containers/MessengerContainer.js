import React, { useEffect } from "react"
import { connect } from "react-redux"
import { nanoid } from "nanoid"

import Messenger from "components/Messenger/Messenger"
import { chatsLoadAction, chatsMessageSendAction } from "../actions/chats"

function MessengerContainerFunc({
  messages,
  chatId,
  chatsMessageSendAction,
  chatsLoadAction,
}) {
  useEffect(() => {
    chatsLoadAction()
  }, [])

  useEffect(() => {
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
  }, [messages])

  const handleMessageSend = (message) => {
    chatsMessageSendAction({
      ...message,
      chatId,
      id: nanoid(),
    })
  }

  return <Messenger messages={messages} handleMessageSend={handleMessageSend} />
}

function mapStateToProps(state, ownProps) {
  const { match } = ownProps
  const chats = state.chats.entries

  let messages = null

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages
  }

  return {
    messages,
    chatId: match ? match.params.id : null,
  }
}

function mapDispatchToProps(dispacth) {
  return {
    chatsLoadAction: () => dispacth(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispacth(chatsMessageSendAction(message)),
  }
}

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerFunc)
