import React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat"
import { Link } from "react-router-dom"

import { chats } from "../../helpers/chatsData"

import "./ChatList.css"

export default function ChatList() {
  return (
    <List className="chat-list">
      {chats.map((item) => (
        <Link className="link" to={`/chats/${item.id}`} key={item.id}>
          <ListItem button component="a">
            <ListItemIcon>
              <ChatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      ))}
    </List>
  )
}
