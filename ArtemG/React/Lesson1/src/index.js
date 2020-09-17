import React from 'react';
import ReactDom from 'react-dom';


//JSX

const messagesData = ["Hello", "hi", "good morning", "test"];

const Message = (props) => {
    return <div>
        <h3>Сообщение</h3>
        {props.text} ({props.author})
        {/* <button onClick={props.onClick}>Клик</button> */}
    </div>;
};

const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message text={item}  key={index} author="WebDev" />));
};



const Button = (props) => {
    const handleClick = (event) => {
        console.log('Нормально');
        messagesData.push('New Hello');
        console.log(messagesData);
    };
    return (<div>
        <button onClick={handleClick}>Button 1 {"See at console.log"}</button>
    </div>
    )
};


ReactDom.render(
    <div>
    {/*<Message  text="Сообщение 1" author="Anna" onClick={() => {console.log("Button")}}/>,*/}
    <MessageList messages={messagesData} />,
    <hr />
    <Button/>
    <hr/>
    </div>,
    document.getElementById('root')
    );



 