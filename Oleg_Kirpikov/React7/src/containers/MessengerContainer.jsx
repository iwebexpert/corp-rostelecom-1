import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { chatsMessageSendAction, chatsMessageDeleteAction } from '../actions/chats';

class MessengerContainerClass extends Component {

    handleMessageSend = (message) => {
        const { chatId, chatsMessageSendAction } = this.props;
        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }

    handleMessageDelete = (chatId, id) => {
        const { chatsMessageDeleteAction } = this.props;
        chatsMessageDeleteAction(chatId, id);
    }

    handleReloadChats = () => {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    };


    render() {
        const { chatId, chatTitle, messages, isLoading, isError } = this.props;
        return <Messenger {...this.props}
            isLoading={isLoading}
            isError={isError}
            chatId={chatId}
            messages={messages}
            chatTitle={chatTitle}
            onAdd={this.handleMessageSend}
            handleMessageDelete={this.handleMessageDelete}
            handleReloadChats={this.handleReloadChats}
        />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;

    let messages = null;
    let chatTitle = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
        chatTitle = chats[match.params.id].title;
    }

    return {
        messages,
        chatId: match ? match.params.id : null,
        chatTitle,
        isLoading: state.chats.loading,
        isError: state.chats.error,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
        chatsMessageDeleteAction: (chatId, id) => dispacth(chatsMessageDeleteAction(chatId, id))
    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);