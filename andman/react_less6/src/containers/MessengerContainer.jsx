import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { chatsLoadAction, chatsMessageSendAction, chatsMessageDeleteAction, chatUnfireAction, } from '../actions/chats';

class MessengerContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    }


    // componentDidUpdate() {
    //     // document.getElementById('flag').scrollIntoView();
    //     setTimeout(() => {
    //         const { chatId, chatsMessageSendAction, messages } = this.props;
    //         const { author } = messages[messages.length - 1];
    //         if (author != 'Bot') {
    //             chatsMessageSendAction({
    //                 text: `Hi, ${author}! Бот на связи!`, author: 'Bot',
    //                 chatId,
    //                 id: nanoid(),
    //             });
    //         }
    //     }, 2000);
    // }

    handleMessageDel = (message) => {

        const { chatsMessageDeleteAction } = this.props;
        chatsMessageDeleteAction(message);
    }


    handleMessageSend = (message) => {
        const { chatsMessageSendAction, chatIdUniq } = this.props;

        chatsMessageSendAction({
            ...message,
            chatIdUniq,
            id: nanoid(),
        });
    }

    render() {
        const { messages, title, chatId, fire, chatUnfireAction, chatIdUniq } = this.props;
        if (fire) {
            setTimeout(() => {
                chatUnfireAction(chatIdUniq);
            }, 100);
        }


        return <Messenger chatId={chatId}
            chatIdUniq={chatIdUniq}
            messages={messages}
            title={title}
            handleMessageSend={this.handleMessageSend}
            handleMessageDel={this.handleMessageDel} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;


    let messages = null;
    let title = null;
    let fire = null;
    let chatIdUniq = null;


    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
        title = chats[match.params.id].title;
        fire = chats[match.params.id].fire;
        chatIdUniq = chats[match.params.id].id;
    }

    return {
        messages,
        chatId: match ? match.params.id : null,
        title,
        fire,
        chatIdUniq
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
        chatsMessageDeleteAction: (message) => dispacth(chatsMessageDeleteAction(message)),
        chatUnfireAction: (chatId) => dispacth(chatUnfireAction(chatId)),

    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);