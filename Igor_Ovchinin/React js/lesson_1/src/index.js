import React from 'react';
import ReactDom from 'react-dom';

//Вариант 1
const element = React.createElement('h1', { className: 'react1', 'id': 'app1' }, 'Hello, React.js!');

//Вариант 2
//JSX
const element2 = <h1 className="react1" id="app1">Hello, React.js!!!</h1>;

const Message = (props) => {
    return <div>
        <h3>Сообщение</h3>
        {props.text} ({props.author})
    </div>;
};

ReactDom.render(
    //element2,
    <Message text="Сообщение 1" author="Anna" />,
    document.getElementById('root')
);