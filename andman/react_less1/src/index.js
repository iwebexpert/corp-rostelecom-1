import React from 'react';
import ReactDom from 'react-dom';

const messagesData = ['Hello', 'Hi', 'Привет', 'Test!', 'A message'];

const Message = (props) => {
    return <div>
        <h3>Сообщение {props.num + 1}</h3>
        {props.text} ({props.author})
        {/* <button onClick={props.onClick}>Клик</button> */}
        <Button2 text2="Удалить" id={props.num}> {props.num + 1}</Button2>
    </div >;
};

const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message key={index} num={index} text={item} author="WebDev" />));
};


const Button = (props) => {
    const handleClick = (event) => {
        console.log('Btn1', event);
        //Добавим в массив сообщение 
        messagesData.push('Нормально!');
        console.log(messagesData);
        //Перерисуем 
        refresh();
    };

    return (<div>
        <button onClick={handleClick}> {props.text}</button>
    </div>);
};

const Button2 = (props) => {
    const handleClick2 = (event) => {
        console.log('Btn2', event);
        //Удалим сообщение 
        messagesData.splice(event.target.dataset.id, 1);

        console.log(messagesData);
        //Перерисуем 
        refresh();
    };

    return (<div>
        <button onClick={handleClick2} data-id={props.id}>{props.text2} - {props.children}</button>
    </div>);
};

const refresh = () => {
    ReactDom.render(
        <div>
            <Button text="Добавить сообщение" />
            <hr />
            <MessageList messages={messagesData} />
            <hr />


        </div>
        ,
        document.getElementById('root')
    )
};

refresh();