import React from 'react';
//import React, { Component } from 'react';


import { MessageList } from 'components/MessageList';
import { MessageForm } from 'components/MessageForm';

import './Messenger.css';


export const Messenger = ({ messages, handleMessageSend, handleMessageDel,
    title, chatId, isError, isLoading, handleReloadChats }) => {
    if (isError) {
        return (<div>Не удалось загрузить чаты... <button onClick={handleReloadChats}>Загрузить повторно</button></div>);
    }

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    return (
        <div className="messenger">
            <div className="title">{title}</div>
            {messages ? <MessageList chatId={chatId} items={messages} handleMessageDel={handleMessageDel} /> : 'Пожалуйста, веберите чат слева'}
            {messages && <MessageForm onSend={handleMessageSend} chatIdUniq={chatId} />}
        </div>
    );
};
// export class Messenger extends Component {


//     render() {
//         const { messages, handleMessageSend, handleMessageDel,
//             title, chatId, isError, isLoading, handleReloadChats } = this.props;

//         if (isError) {
//             return (<div>Не удалось загрузить чаты... <button onClick={handleReloadChats}>Загрузить повторно</button></div>);
//         }

//         if (isLoading) {
//             return (<div>Loading...</div>);
//         }

//         return (
//             <div className="messenger">
//                 <div className="title">{title}</div>
//                 {messages ? <MessageList chatId={chatId} items={messages} handleMessageDel={handleMessageDel} /> : 'Пожалуйста, веберите чат слева'}
//                 {messages && <MessageForm onSend={handleMessageSend} chatIdUniq={chatId} />}
//             </div>
//         );
//     }
// }