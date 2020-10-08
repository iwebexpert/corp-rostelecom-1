import React, { useEffect } from "react"
import { connect } from "react-redux"
import { nanoid } from "nanoid"
import { push } from "connected-react-router"

import Messenger from "components/Messenger/Messenger"
import {
  chatsLoadAction,
  chatsAddAction,
  chatsMessageSendAction,
} from "../actions/chats"

function MessengerContainerFunc({
  chats,
  lastId,
  redirect,
  messages,
  chatId,
  chatsMessageSendAction,
  chatsLoadAction,
  chatsAddAction,
}) {
  useEffect(() => {
    if (!chats.length) {
      chatsLoadAction()
    }
  }, [])
  const handleMessageSend = (message) => {
    chatsMessageSendAction({
      ...message,
      chatId,
      id: nanoid(),
    })
  }

  const handleChatAdd = () => {
    const title = prompt("Введите название чата", "Chat1")

    if (title) {
      chatsAddAction(lastId, title)
      redirect(lastId)
    } else {
      alert("Введите название чата")
    }
  }

  return (
    <Messenger
      messages={messages}
      handleMessageSend={handleMessageSend}
      chats={chats}
      handleChatAdd={handleChatAdd}
      chatId={chatId}
    />
  )
}

function mapStateToProps(state, ownProps) {
  const { match } = ownProps

  const chats = state.chats.entries

  let messages = null

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages
  }

  const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0
  return {
    chats,
    messages,
    lastId,
    chatId: match ? match.params.id : null,
    chatFire: match.params.id ? chats[match.params.id].fire : null,
  }
}

function mapDispatchToProps(dispacth) {
  return {
    chatsLoadAction: () => dispacth(chatsLoadAction()),
    chatsMessageSendAction: (message) =>
      dispacth(chatsMessageSendAction(message)),
    chatsAddAction: (newChatId, title) =>
      dispacth(chatsAddAction(newChatId, title)),
    redirect: (id) => dispacth(push(`/chats/${id}`)),
  }
}

export const MessengerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainerFunc)
