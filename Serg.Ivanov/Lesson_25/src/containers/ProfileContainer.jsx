//TODO
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

// import {Messenger} from 'components/Messenger';
import { profileLoadAction } from '../actions/profile';

class ProfileContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction } = this.props;
        profileLoadAction();

    }

    // handleMessageSend = (message) => {
    //     const {chatId, chatsMessageSendAction} = this.props;

    //     chatsMessageSendAction({
    //         ...message,
    //         chatId,
    //         id: nanoid(),
    //     });
    // }

    render() {
        const { profile } = this.props;

        return <Profile profile={profile} />
    }
}

// function mapStateToProps(state, ownProps) {

//     const { match } = ownProps;
//     const chats = state.chats.entries;

//     let messages = null;

//     if (match && chats[match.params.id]) {
//         messages = chats[match.params.id].messages;
//     }

//     return {
//         messages,
//         chatId: match ? match.params.id : null,
//     };
// }

function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: () => dispacth(profilleLoadAction()),
        // chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),

    };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);