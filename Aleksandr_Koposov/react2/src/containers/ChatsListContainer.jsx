import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { push } from 'connected-react-router'
import { nanoid } from 'nanoid'

import { chatsLoadAction, chatAddAction } from 'actions/chats'

import { ChatsList } from 'components/ChatsList'

export const ChatsListContainer = (props) => {
  const dispatch = useDispatch()
  const chatId = useParams().id || ''
  const [user, chats, isLoading] = useSelector((state) => ([
    state.profile.entries,
    state.chats.entries,
    state.chats.loading,
  ]))

  useEffect(() => {
    if (!chats.length) {
      dispatch(chatsLoadAction())
    }
  }, [])

  const onChatAdd = (name) => {
    const newId = nanoid()
    if (!name) {
      return
    }
    dispatch(chatAddAction({
      id: newId,
      name: name,
      users: [user.id],
      messages: []
    }))
    dispatch(push(`/chats/${newId}`))
  }

  return <ChatsList
    chats={chats || []}
    isLoading={isLoading}
    activeChat={chatId}
    onAdd={onChatAdd}
  />
}
