import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { push } from 'connected-react-router';

import { Messenger } from 'components/Messenger';
import { chatsLoadAction, chatsMessageSendAction, chatsUnFireAction, chatsFireAction } from '../actions/chats';

class MessengerContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction, chats, chatId, chatsUnFireAction } = this.props;
        if (!chats.length) {
            chatsLoadAction();
        }
        if (chats[chatId].fire) {
            console.log("Tsr");
            chatsUnFireAction(chatId);
        }

    }
    componentDidUpdate() {
        const { chatsLoadAction, chats, chatId, chatsUnFireAction } = this.props;
        if (chats[chatId].fire) {
            console.log("Tsr");
            chatsUnFireAction(chatId);
        }
    }

    handleMessageSend = (message) => {
        const { chatId, chatsMessageSendAction } = this.props;

        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }


    render() {
        const { messages } = this.props;

        return <Messenger messages={messages} handleMessageSend={this.handleMessageSend} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;


    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;

    }

    return {
        messages,
        chatId: match ? match.params.id : null,
        chats,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
        chatsFireAction: (id) => dispacth(chatsFireAction(id)),
        chatsUnFireAction: (id) => dispacth(chatsUnFireAction(id)),
    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);