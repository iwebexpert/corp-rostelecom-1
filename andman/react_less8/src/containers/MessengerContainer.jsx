import React, { useEffect } from 'react';
//import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import { Messenger } from 'components/Messenger';
import { chatsLoadAction, chatsMessageSendAction, chatsMessageDeleteAction, chatUnfireAction, } from '../actions/chats';


export const MessengerContainer = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        handleReloadChats();
    }, []);

    const chats = useSelector((state) => state.chats.entries);

    const [isLoading, isError] = useSelector((state) => ([state.chats.loading, state.chats.error]));

    const chatIdUrl = props.match.params.id;
    const messages = chats[chatIdUrl] ? chats[chatIdUrl].messages : null;
    const title = chats[chatIdUrl] ? chats[chatIdUrl].title : null;
    const chatId = chats[chatIdUrl] ? chats[chatIdUrl].id : null;
    const fire = chats[chatIdUrl] ? chats[chatIdUrl].fire : null;


    const handleMessageDel = (message) => {
        dispatch(chatsMessageDeleteAction(message));
    };


    const handleMessageSend = (message) => {
        dispatch(chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        }));
    }

    const handleReloadChats = () => {
        if (!chats.length) {
            dispatch(chatsLoadAction());
        }
    };

    if (fire) {
        setTimeout(() => {
            dispatch(chatUnfireAction(chatId));
        }, 100);
    };

    return (<Messenger chatId={chatId}
        chatIdUniq={chatIdUrl}
        messages={messages}
        title={title}
        handleMessageSend={handleMessageSend}
        handleMessageDel={handleMessageDel}
        handleReloadChats={handleReloadChats}
        isError={isError}
        isLoading={isLoading} />);

};


// class MessengerContainerClass extends Component {
//     componentDidMount() {
//         const { chatsLoadAction, chats } = this.props;

//         if (!chats.length) {
//             chatsLoadAction();
//         }
//     }


//     handleMessageDel = (message) => {

//         const { chatsMessageDeleteAction } = this.props;
//         chatsMessageDeleteAction(message);
//     }


//     handleMessageSend = (message) => {
//         const { chatsMessageSendAction, chatId } = this.props;

//         chatsMessageSendAction({
//             ...message,
//             chatId,
//             id: nanoid(),
//         });
//     }

//     handleReloadChats = () => {
//         const { chatsLoadAction } = this.props;
//         chatsLoadAction();
//     };

//     render() {
//         const { messages, title, chatId, fire, chatUnfireAction, chatIdUniq, chatIdUrl,
//             isLoading, isError } = this.props;
//         if (fire) {
//             setTimeout(() => {
//                 chatUnfireAction(chatId);
//             }, 100);
//         }


//         return <Messenger chatId={chatId}
//             chatIdUniq={chatIdUrl}
//             messages={messages}
//             title={title}
//             handleMessageSend={this.handleMessageSend}
//             handleMessageDel={this.handleMessageDel}
//             handleReloadChats={this.handleReloadChats}
//             isError={isError}
//             isLoading={isLoading} />
//     }
// }

// function mapStateToProps(state, ownProps) {

//     const { match } = ownProps;
//     const chats = state.chats.entries;


//     let messages = null;
//     let title = null;
//     let fire = null;
//     let chatIdUniq = null;

//     //console.log(match);

//     //console.log('Chats', chats[match.params.id]);




//     if (match && chats[match.params.id]) {
//         messages = chats[match.params.id].messages;
//         title = chats[match.params.id].title;
//         fire = chats[match.params.id].fire;
//         chatIdUniq = chats[match.params.id].id;
//     }

//     return {
//         messages,
//         chatIdUrl: match ? match.params.id : null,
//         title,
//         fire,
//         chats,
//         chatId: chatIdUniq,
//         isLoading: state.chats.loading,
//         isError: state.chats.error,
//     };
// }

// function mapDispatchToProps(dispacth) {
//     return {
//         chatsLoadAction: () => dispacth(chatsLoadAction()),
//         chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
//         chatsMessageDeleteAction: (message) => dispacth(chatsMessageDeleteAction(message)),
//         chatUnfireAction: (chatId) => dispacth(chatUnfireAction(chatId)),

//     };
// }

// export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);