import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from 'components/Header';
import { profileLoadAction } from '../actions/profile';

class HeaderContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    }

    /*handleMessageSend = (message) => {
        const { chatId, chatsMessageSendAction } = this.props;

        chatsMessageSendAction({
            ...message,
            chatId,
            id: nanoid(),
        });
    }*/

    render() {
        const { profile } = this.props;
        return <Header profile={profile} /*handleMessageSend={this.handleMessageSend}*/ />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const profile = state.profile.entries;
    return {
        profile,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: () => dispacth(profileLoadAction()),
        //chatsMessageSendAction: (message) => dispacth(chatsMessageSendAction(message)),
    };
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);