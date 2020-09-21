import React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"

import "./ChatList.css"

export default function ChatList({ chats }) {
  return (
    <List className="chat-list">
      {chats.map((item, index) => (
        <ListItem button component="a" key={index}>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  )
}
