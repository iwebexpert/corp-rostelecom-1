import React from 'react'
import ReactDom from 'react-dom'

const rootEl = document.getElementById('root')

const messagesData = [
    {
        text: 'Message 1',
        author: 1
    },
    {
        text: 'Message 2',
        author: 1
    },
    {
        text: 'Message 3',
        author: 2
    },
    {
        text: 'Message 4',
        author: 1
    },
    {
        text: 'Message 5',
        author: 2
    },
    {
        text: 'Message 6',
        author: 1
    }
]

const Message = ({ text, isRight }) => {
    return <div style={{
        padding: '0 5px 5px 5px',
        marginBottom: '10px',
        border: '1px solid lightgray',
        borderRadius: '5px',
        width: '300px',
        color: 'white',
        alignSelf: isRight ? 'flex-end' : 'flex-start',
        backgroundColor: isRight ? '#7700ff' : '#123456',
        fontFamily: 'Arial'
    }}>
        <h3 style={{
            margin: '5px 0'
        }}>Сообщение</h3>
        {text}
    </div>
}

const MessageList = ({ messages }) => {
    return <div style={{
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid black',
        marginBottom: '10px'
    }}>
        {messages.map((item, index) =>
            <Message key={index} text={item.text} isRight={item.author === 1} />
        )}
    </div>
}

const Button = ({ children }) => {
    const handleClick = (event) => {
        messagesData.push({
            text: 'Нормально',
            author: 1
        })
        ReactDom.render(<App />, rootEl)
    }
    return <button className="btn" onClick={handleClick}><span>{children}</span></button>
}

const App = () => {
    return <div>
        <MessageList messages={messagesData} />
        <Button>Нормально</Button>
    </div>
}

ReactDom.render(<App />, rootEl)
