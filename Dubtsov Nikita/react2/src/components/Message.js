import React from "react"

export default function Message({ author, text }) {
  return (
    <p>
      <b>{author}: </b> {text}
    </p>
  )
}
