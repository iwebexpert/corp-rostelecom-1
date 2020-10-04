import React, {Component} from 'react';
import {connect} from 'react-redux';
import {nanoid} from 'nanoid';
import {push} from 'connected-react-router';

import {Messenger} from 'components/Messenger';
import {
    chatsLoadAction,
    chatsAddAction,
    chatsMessageSendAction,
    chatsFireAction,
    chatsUnfireAction
} from '../actions/chats';

class MessengerContainerClass extends Component {
    componentDidMount() {
        const {chatsLoadAction, chats} = this.props;

        if (!chats.length) {
            chatsLoadAction();
        }
    }

    handleMessageSend = (message) => {
        const {chatId, chatsMessageSendAction} = this.props;

        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }

    handleChatAdd = () => {
        const {chatsAddAction, lastId, redirect} = this.props;
        const title = prompt('Введите название чата', 'Chat1');

        if (title) {
            chatsAddAction(lastId, title);
            redirect(lastId);
        } else {
            alert('Введите название чата');
        }
    }

    handleChatFire = () => {
        const {chatsFireAction, chatId, title, messages, fire} = this.props;
        chatsFireAction(chatId, title, messages, fire);
    }

    handleChatUnfire = () => {
        const {chatsUnfireAction, chatId, title, messages, fire} = this.props;
        chatsUnfireAction(chatId, title, messages, fire);
    }


    render() {
        const {messages} = this.props;

        return <Messenger messages={messages} handleMessageSend={this.handleMessageSend}
                          handleChatAdd={this.handleChatAdd} handleChatFire={this.handleChatFire}
                          handleChatUnfire={this.handleChatUnfire}/>
    }
}

function mapStateToProps(state, ownProps) {

    const {match} = ownProps;
    const chats = state.chats.entries;

    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }

    const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0;

    return {
        messages,
        chatId: match ? match.params.id : null,
        lastId,
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
        chatsAddAction: (newChatId, title) => dispacth(chatsAddAction(newChatId, title)),
        redirect: (id) => dispacth(push(`/chats/${id}`)),
        chatsFireAction: (chatId, title, messages, fire) => dispacth(chatsFireAction(chatId, title, messages, fire)),
        chatsUnfireAction: (chatId, title, messages, fire) => dispacth(chatsUnfireAction(chatId, title, messages, fire)),
    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);