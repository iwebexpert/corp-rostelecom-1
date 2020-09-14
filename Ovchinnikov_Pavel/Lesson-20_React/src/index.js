import React from "react";
import ReactDom from "react-dom";

const messages = ['Привет'];

const Message = (props) => {
    return <div>
        <h3>Сообщения</h3>
        {props.text}
    </div>;
};

const MessageList = (props) => {
    return props.messages.map((item, index) => (<Message key={index} text={item} />));
};

function addMessage() {
    const input = document.getElementById("input");
    if (input) {
        const value = input.value;
        if (value) {
            messages.push(value)
            console.log(messages);
            input.value = "";
            render();
        }
        else
            alert("Введите текст сообщения!");
    }
}

const Input = (props) => {
    const handleKeyup = (event) => {
        if (event.keyCode == 13)
            addMessage();
    }

    return (<div>
        <div>Текст сообщения</div>
        <input type="text" id="input" onKeyUp={handleKeyup}></input>
    </div>);
};

const Button = (props) => {
    const handleClick = (event) => {
        addMessage();
    }

    return (<div>
        <button onClick={handleClick}>Отправить</button>
    </div>);
};

function render() {
    ReactDom.render(
        <div>
            <Input />
            <Button />
            <hr />
            <MessageList messages={messages} />
        </div>,
        document.getElementById('root')
    );
}

render();
