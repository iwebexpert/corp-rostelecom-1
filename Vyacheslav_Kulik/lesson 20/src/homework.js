import React from 'react'
import ReactDom from 'react-dom'

let arrayForMessage = []
const addToArray = (messages) => {
    arrayForMessage.push(messages)
}

const Button = (props) => {
    let count = 0
    const handlerClick = () => {
        addToArray(`Messages № ${count++}`)
        console.log(arrayForMessage)
    }
    return <button onClick={handlerClick}>Click</button>
}

const Message = (props) => {
    return <div><span>{props.text}</span></div>
}

const Messages = (props) => {
    return props.messages.map((value, index) => (<Message key={index} text={value} />))
}

const MessagesParent = (props) => {
    return <div>
        <Button />
            <Messages messages={arrayForMessage}/>
    </div>

}

ReactDom.render(
    <MessagesParent />
    ,document.getElementById('root'))