import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { Messenger } from 'components/Messenger';
import { chatsLoadAction, chatsMessageSendAction, chatsAddAction } from '../actions/chats';

class MessengerContainerClass extends Component {
    componentDidMount() {
        const { chatsLoadAction } = this.props;
        chatsLoadAction();
    }



    componentDidUpdate() {
        // document.getElementById('flag').scrollIntoView();
        setTimeout(() => {
            const { chatId, chatsMessageSendAction, messages } = this.props;
            const { author } = messages[messages.length - 1];
            if (author != 'Bot') {
                chatsMessageSendAction({
                    text: `Hi, ${author}! Бот на связи!`, author: 'Bot',
                    chatId,
                    id: nanoid(),
                });
            }
        }, 2000);


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
        const { messages, title } = this.props;

        return <Messenger messages={messages} title={title} handleMessageSend={this.handleMessageSend} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const chats = state.chats.entries;




    let messages = null;
    let title = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
        title = chats[match.params.id].title;
    }

    return {
        messages,
        chatId: match ? match.params.id : null,
        title,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        chatsLoadAction: () => dispacth(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);