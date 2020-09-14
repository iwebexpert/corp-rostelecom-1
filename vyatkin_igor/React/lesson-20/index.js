//console.log('test')

import React from 'react';
import ReactDom from 'react-dom';


const messagesData = [];

const Message = (props) => {
    return <div>
        <h3>Сообщение:</h3>
        {props.text} {props.author}
    </div>;
};

const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message key={index} text={item} author="" />));
};


const AddMessage = (props) => {
    const handleClick = (event) => {

        messagesData.push('Нормально');
        add();
    };
    return (
    <div>
        <button onClick={handleClick}>Добавить сообщение</button>
    </div>);
};


function add() {
    ReactDom.render(
        <div>
            <MessageList messages={messagesData} />
            <AddMessage />
        </div>
        ,
        document.getElementById('root')
    );
}
add(); 
