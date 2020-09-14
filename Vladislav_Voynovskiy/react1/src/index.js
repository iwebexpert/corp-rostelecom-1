import React from 'react';
import ReactDom from 'react-dom';

const randomMessages = ['Mangan', 'Sanbaiman', 'Baiman', 'Yakuman'];

const Message = (props) => {
  return <div>
    <h4>Сообщение {props.num + 1}</h4>
    <p>{props.text} {props.author}</p>
    <DeleteButton text2="Удалить сообщение" id={props.num}> {props.num + 1}</DeleteButton>
  </div>
}

const MessageList = (props) => {
  return props.messages.map((item, index) => (<Message key={index} num={index} text={item} author="Mahjong pro" />));
};

const AddButton = (props) => {
  const handleClick = (event) => {
    randomMessages.push('Ron!');
    render();
  }
  return (<div>
    <button onClick={handleClick}> {props.text}</button>
  </div>);
}

const DeleteButton = (props) => {
  const handleClick = (event) => {
    randomMessages.splice(event.target.dataset.id, 1);
    render();
  }
  return (<div>
    <button onClick={handleClick} data-id={props.id}>{props.text2} - {props.children}</button>
  </div>);
}

const render = () => {
  ReactDom.render(
    <div>
      <AddButton text="Добавить сообщение" />
      <hr />
      <MessageList messages={randomMessages} />
      <hr />


    </div>,
    document.getElementById('root')
  )
}
render();