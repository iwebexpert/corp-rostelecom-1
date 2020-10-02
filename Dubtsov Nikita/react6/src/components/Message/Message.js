import React from "react"
import classNames from "classnames"
import "./Message.css"

export default function Message({ author, text }) {
  const classes = classNames("message", {
    message__user: author !== "Бот",
    message__bot: author === "Бот",
  })
  return (
    <p className={classes}>
      <b>{author}: </b> {text}
    </p>
  )
}
