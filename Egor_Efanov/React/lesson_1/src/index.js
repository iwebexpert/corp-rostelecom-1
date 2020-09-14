import React from 'react';
import ReactDom from 'react-dom';

const messages = ['Начальное положение'];

const Messages = (props) => {
    return (props.messages.map((item, index) => (<div key={index}>{item}</div>)))
};

const Button = (props) => {
    return (<div>
        <button onClick={props.handleClick}>{props.text}</button>
    </div>);
};

const ButtonDel = (props) => {
    return (<div>
        <button onClick={props.handleClickDel}>{props.text}</button>
    </div>);
};

class TextMessage extends React.Component {

    constructor(props) {
        super(props);

    }


    handleClick(event) {
        messages.push(`Нормально`);
        console.log(messages);
        this.forceUpdate();

    }
    handleClickDel(event) {
        messages.pop();
        console.log(messages);
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Button text={this.props.textBtnPush} handleClick={this.handleClick.bind(this)} />
                <ButtonDel text={this.props.textBtnPop} handleClickDel={this.handleClickDel.bind(this)} />
                <Messages messages={this.props.messages} />
            </div>
        )
    }
};


ReactDom.render(
    <TextMessage messages={messages} textBtnPush="Добавить новое сообщение" textBtnPop="Удалить последнее сообщение" />,
    document.getElementById('root')
);


