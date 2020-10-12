import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Messenger } from 'components/Messenger';
import { chatsLoadAction, chatsAddAction, chatsMessageSendAction } from '../actions/chats';

export const MessengerContainer = (props) => {
    const { id } = useParams();
    const dispacth = useDispatch();

    const chats = useSelector((state) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;

    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));


    useEffect(() => {
        dispacth(chatsLoadAction());

    }, []);

    const handleReloadChats = () => {
        dispacth(chatsLoadAction());
    };

    const handleMessageSend = (message) => {
        dispacth(chatsMessageSendAction({
            ...message,
            chatId: id,
            id: nanoid(),
        }));
    };

    const handleChatAdd = () => {
        const title = prompt('Введите название чата', 'Chat1');
        const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0;

        if (title) {
            dispacth(chatsAddAction(lastId, title));
            dispacth(push(`/chats/${lastId}`));
        } else {
            alert('Введите название чата');
        }
    };

    return <Messenger
        handleReloadChats={handleReloadChats}
        isError={isError}
        isLoading={isLoading}
        messages={messages}
        handleMessageSend={handleMessageSend}
        handleChatAdd={handleChatAdd}
    />
};


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { nanoid } from 'nanoid';
// import { push } from 'connected-react-router';

// import { Messenger } from 'components/Messenger';
// import { chatsLoadAction, chatsAddAction, chatsMessageSendAction } from '../actions/chats';

// class MessengerContainerClass extends Component {
//     componentDidMount() {
//         const { chatsLoadAction, chats } = this.props;

//         if (!chats.length) {
//             chatsLoadAction();
//         }
//     }

//     handleMessageSend = (message) => {
//         const { chatId, chatsMessageSendAction } = this.props;

//         chatsMessageSendAction({
//             ...message,
//             chatId,
//             id: nanoid(),
//         });
//     }

//     handleChatAdd = () => {
//         const { chatsAddAction, lastId, redirect } = this.props;
//         const title = prompt('Введите название чата', 'Chat1');

//         if (title) {
//             chatsAddAction(lastId, title);
//             redirect(lastId);
//         } else {
//             alert('Введите название чата');
//         }
//     }

//     handleReloadChats = () => {
//         const { chatsLoadAction } = this.props;
//         chatsLoadAction();
//     };

//     render() {
//         const { messages, isLoading, isError } = this.props;

//         return <Messenger
//             handleReloadChats={this.handleReloadChats}
//             isError={isError}
//             isLoading={isLoading}
//             messages={messages}
//             handleMessageSend={this.handleMessageSend}
//             handleChatAdd={this.handleChatAdd}
//         />
//     }
// }

// function mapStateToProps(state, ownProps) {

//     const { match } = ownProps;
//     const chats = state.chats.entries;

//     let messages = null;

//     if (match && chats[match.params.id]) {
//         messages = chats[match.params.id].messages;
//     }

//     const lastId = Object.keys(chats).length ? Object.keys(chats).length : 0;

//     return {
//         messages,
//         chatId: match ? match.params.id : null,
//         lastId,
//         chats,
//         isLoading: state.chats.loading,
//         isError: state.chats.error,
//     };
// }

// function mapDispatchToProps(dispacth) {
//     return {
//         chatsLoadAction: () => dispacth(chatsLoadAction()),
//         chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
//         chatsAddAction: (newChatId, title) => dispacth(chatsAddAction(newChatId, title)),
//         redirect: (id) => dispacth(push(`/chats/${id}`)),
//     };
// }

// export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);