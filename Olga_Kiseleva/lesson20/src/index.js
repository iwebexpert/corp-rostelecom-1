import React from 'react';
import ReactDom, { render } from 'react-dom';

const messagesData = ['test'];

const Message = (props) => {
    return <div>
        <h3>Сообщение</h3>
        {props.text}
        {/* <Button text={props.text} /> */}
    </div>;
};
const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message key={index} text={item} />));
};
const AddButton = (props) => {
    const handleClick = (event) => {
        let message = prompt('введите сообщение', 'нормально')
        messagesData.unshift(message)
        console.log(messagesData);
    };

    ReactDom.render(<Content />, document.getElementById('root'));
    return (<div>
        <button onClick={handleClick}>Введите сообщение</button>

    </div>);
};
const Content = () => {
    return <div>
        <AddButton />
        <hr />
        <MessageList messages={messagesData} />
    </div>
}
ReactDom.render(<Content />, document.getElementById('root'));
