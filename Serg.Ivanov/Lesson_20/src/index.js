import React from 'react';
import ReactDom from 'react-dom';

const messagesData = ['Hello', 'Hi', 'Привет', 'Test!', 'A message'];

const Message = (props) => {
    return <div>
        <h3>Сообщение</h3>
        {props.text} ({props.author})

        <Button text={props.text} />
    </div>;
};

const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message key={index} text={item} author="WebDev" />));
};


const Button = (props) => {
    const handleClick = (event) => {
        console.log('Btn1', event);
    };


    return (<div>
        <button onClick={handleClick}>Button 1 {props.text}</button>
    </div>);
};

const Button2 = (props) => {
    return (<div>
        <button>{props.text2} - {props.children}</button>
    </div>);
};

let normArray = [];
const Button4 = (props) => {
    const handleClick = (event) => {
        normArray.push('Нормально');
        console.log(normArray);
    };
    return (<div>
        <button onClick={handleClick}>Новая кнопка {props.text}</button>
    </div>);
};
// Вывод массива  
// Неудачно
const Arr = (props) => {
    return <div>
        <h3>Массив</h3>
        {props.text}

    </div>;
};

const ArrayList = (props) => {
    console.log('Test');
    return props.arrays.map((item, index) => (<Arr key={index} text={item} />));
};
//
ReactDom.render(
    <div>
        <MessageList messages={messagesData} />
        <hr />
        <Button />
        <hr />
        <Button2 text2="One">The test button</Button2>
        <hr />
        {/* Кнопка заполнения массива */}
        <Button4 />
        {/* Вывод массива       */}
        <ArrayList arrays={normArray} />
    </div>
    ,
    document.getElementById('root')
);