import React from 'react';
import ReactDom from 'react-dom';

const messagesData = ['Hello'];

const Message = (props) => {
    return <div>
        {props.text} ({props.author})
    </div>;
};

const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message key={index} text={item} author="WebDev"/>));
};


const Button1 = (props) => {
    const handleClick = (event) => {
        console.log('Btn1', event);
        messagesData.push(`${props.children}`);
        console.log(messagesData);

        ReactDom.render(
            <div>
                <MessageList messages={messagesData}/>
                <hr/>
                <Button1>Добавить</Button1>
            </div>
            ,
            document.getElementById('root')
        );
    };

    return (<div>
        <button onClick={handleClick}>{props.children}</button>
    </div>);
};


ReactDom.render(
    <div>
        <MessageList messages={messagesData}/>
        <hr/>
        <Button1>Добавить</Button1>
    </div>
    ,
    document.getElementById('root')
);