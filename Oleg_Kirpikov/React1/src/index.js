import React from 'react';
import ReactDom from 'react-dom';

const messages = ['test'];

const Messages = (props) => {
    return (props.messages.map((item, index) => (<div key={index}>{item}</div>)))
};

const Button = (props) => {
    return (<div>
        <button onClick={props.handleClick}>{props.text}</button>
    </div>);
};


class Container extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(event) {
        messages.push(`Сообщение ${messages.length}`);
        console.log(messages);
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <hr />
                <Messages messages={this.props.messages} />
                <hr />
                <Button text={this.props.text} handleClick={this.handleClick.bind(this)} />
            </div>
        )
    }
};


ReactDom.render(
    <Container messages={messages} text="Новое сообщение" />,
    document.getElementById('root')
);



