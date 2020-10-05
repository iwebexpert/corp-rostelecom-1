import React from "react"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"
import { Link } from "react-router-dom"

import "./ChatList.css"

export default function ChatList({ chats, chatId, handleChatAdd }) {
  return (
    <List className="chat-list">
      {chats.map((item) => (
        <Link
          to={`/chats/${item.id}`}
          key={item.id}
          className={chatId == item.id ? "chat current" : "chat"}
        >
          <ListItem
            button
            component="a"
            className={item.fire ? "chat fire" : "chat"}
          >
            <ListItemIcon>
              <ChatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleChatAdd}
        className="add-chat-btn"
      >
        Добавить новый чат
      </Button>
    </List>
  )
}
