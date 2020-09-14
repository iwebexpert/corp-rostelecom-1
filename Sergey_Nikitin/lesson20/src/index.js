import React from 'react';
import ReactDom from 'react-dom';

//Вариант 1
const element = React.createElement('h1', { className: 'react1', 'id': 'app1' }, 'Hello, React.js!');

//Вариант 2
//JSX
const element2 = <h1 className="react1" id="app1">Hello, React.js!!!</h1>;

var messagesData = ['Hello', 'Hi', 'Привет', 'Test!', 'A message'];

const Message = (props) => {
    return <div>
        <h3>Сообщение:</h3>
        {props.text} ({props.author})
        {/* <button onClick={props.onClick}>Клик</button> */}
        {/* <Button text={props.text} />*/}
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

const Button3 = ({ text2, children }) => {
    return (<div>
        <button>{text2} - {children}</button>
    </div>);
};

const ButtonAdd = (props) => {
    const handleClick = (event) => {

        messagesData.push(prompt('Введите сообщение', 'Магия, не иначе :-)'));
        load();
    };


    return (<div>
        <button onClick={handleClick}>Добавить сообщение</button>
    </div>);
};
function load() {
    ReactDom.render(
        <div>
            {/* <Message text="Сообщение 1" author="Anna" onClick={() => {console.log('Test')}} /> */}
            <MessageList messages={messagesData} />
            <hr />
            <ButtonAdd />
        </div>
        ,
        document.getElementById('root')
    );
}
load();