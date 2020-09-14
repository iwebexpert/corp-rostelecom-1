import React, { useState } from "react";
import ReactDom from "react-dom";
import "./index.css";

function App() {
  const [messages, setMessages] = React.useState([
    { text: "Сообщение 1", author: "Пользователь 1" },
    { text: "Сообщение 2", author: "Пользователь 2" },
    { text: "Сообщение 3", author: "Пользователь 1" },
  ]);

  const MessageList = ({ messages }) => {
    return messages.map((item, index) => (
      <Message key={index} author={item.author} text={item.text} />
    ));
  };

  const Message = ({ author, text }) => {
    return (
      <div>
        <p>
          <b>Сообщение: </b> {text} <i>(автор: {author})</i>
        </p>
      </div>
    );
  };

  function addMessage(text, author) {
    if (!author.trim()) {
      setMessages(messages.concat([{ text, author: "Неизвестный" }]));
    } else {
      setMessages(messages.concat([{ text, author }]));
    }
  }

  const Form = ({ onClick }) => {
    const [textValue, setTextValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");

    function submitHandler(event) {
      event.preventDefault();

      if (textValue.trim()) {
        onClick(textValue, authorValue);
      } else {
        alert("Сообщение не может быть пустым!");
      }
    }

    return (
      <form onSubmit={submitHandler}>
        <label>
          Введите текст сообщения:
          <input
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
          ></input>
        </label>
        <label>
          Введите ваше имя:
          <input
            value={authorValue}
            onChange={(event) => setAuthorValue(event.target.value)}
          ></input>
        </label>
        <button type="submit">Добавить сообщение</button>
      </form>
    );
  };

  return (
    <div className="container">
      <h1>Чат</h1>
      <MessageList messages={messages} />
      <Form onClick={addMessage} />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
