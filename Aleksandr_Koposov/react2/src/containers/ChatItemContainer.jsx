import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { ChatItem } from 'components/ChatItem'

export const ChatItemContainer = (props) => {
  const { item, active } = props
  const dispatch = useDispatch()
  const redirectToChat = () => {
    dispatch(push(`/chats/${item.id}`))
  }
  return <ChatItem
    item={item}
    active={active}
    onClick={redirectToChat}
  />
}
