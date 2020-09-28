import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { chatsMessageSendAction } from '../actions/chats';

class MessengerContainerClass extends Component {

    handleMessageSend = (message) => {
        const { chatId, chatsMessageSendAction } = this.props;
        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }

    render() {
        const { chatTitle, messages } = this.props;
        return <Messenger {...this.props} messages={messages} chatTitle={chatTitle} onAdd={this.handleMessageSend} />
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
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);