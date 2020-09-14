import React from 'react';
import ReactDom from 'react-dom';

//Вариант 1
const element =  React.createElement('h1', {className:  'react-1', id: 'app1'}, 'Hello , React.js!')

//Вариант 2
//JSX
const element2 = <h1  className="react1"  id="app1">Hello , React.js!!!!</h1>

const messagesData = ['Hello', 'Hi', 'Привет', 'Test']

const Message = (props) => {
    return <div>
        <h3>Сообщение</h3>
        {props.text} {props.author}
        {/*<button onClick={props.onClick}>Click</button>*/}
        <Button text={props.text}/>
    </div>;
}

const MessageDev = (props) => {
    return props.messages.map((item, index) => (<Message key={index} text={item} />));
}


const Button = (props) => {
    const handleClick = (event) => {
        console.log('Btn', event.target)
    }
    return (<div>
        <button onClick={handleClick}>Click {props.text}</button>
    </div>)
}

const Button2 = ({children, text2}) => {
    const handleClick = (event) => {
        console.log('Btn2', event.target)
    }
    return (<div>
        <button onClick={handleClick}>{children + text2}</button>
    </div>)
}

ReactDom.render(
    <div>
        <MessageDev messages={messagesData} />
        <hr/>
        <Button2 text2={'ON'}>The test button</Button2>
    </div>,
    document.getElementById('root'));



