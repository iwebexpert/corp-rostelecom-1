import React from 'react'
import ReactDom from 'react-dom'

const root = document.getElementById('root')
const messagesData = ['Hello', 'Hi', 'Test']

const Message = (props) => {
  return <div>
    {props.text}
  </div>
}

const MessageList = (props) => {
  return props.messages.map((item, index) => (<Message key={index} text={item} />))
}

const Button = (props) => {
  const handleClick = (event) => {
    messagesData.push('Нормально')
    console.log(messagesData)
    show()
  }
  return (<div>
    <button onClick={handleClick}>Новое сообщение Нормально</button>
  </div>)
}

const show = () => ReactDom.render(
  <div>
    <Button />
    <hr />
    <MessageList messages={messagesData} />
  </div>
  , root
)

show()
