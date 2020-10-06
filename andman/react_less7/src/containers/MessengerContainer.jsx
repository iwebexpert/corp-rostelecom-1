import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { chatsLoadAction, chatsMessageSendAction, chatsMessageDeleteAction, chatUnfireAction, } from '../actions/chats';

class MessengerContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction, chats } = this.props;

        if (!chats.length) {
            chatsLoadAction();
        }
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
        const { chatsMessageSendAction, chatId } = this.props;

        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }

    handleReloadChats = () => {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    };

    render() {
        const { messages, title, chatId, fire, chatUnfireAction, chatIdUniq, chatIdUrl,
            isLoading, isError } = this.props;
        if (fire) {
            setTimeout(() => {
                chatUnfireAction(chatId);
            }, 100);
        }


        return <Messenger chatId={chatId}
            chatIdUniq={chatIdUrl}
            messages={messages}
            title={title}
            handleMessageSend={this.handleMessageSend}
            handleMessageDel={this.handleMessageDel}
            handleReloadChats={this.handleReloadChats}
            isError={isError}
            isLoading={isLoading} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;


    let messages = null;
    let title = null;
    let fire = null;
    let chatIdUniq = null;

    //console.log(match);

    //console.log('Chats', chats[match.params.id]);




    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
        title = chats[match.params.id].title;
        fire = chats[match.params.id].fire;
        chatIdUniq = chats[match.params.id].id;
    }

    return {
        messages,
        chatIdUrl: match ? match.params.id : null,
        title,
        fire,
        chats,
        chatId: chatIdUniq,
        isLoading: state.chats.loading,
        isError: state.chats.error,
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