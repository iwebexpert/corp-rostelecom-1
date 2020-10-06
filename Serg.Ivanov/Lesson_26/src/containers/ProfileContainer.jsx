import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';

import { Profile } from 'components/Profile';
import { profileLoadAction, profileAddAction, profileUserSendAction, profileDeleteAction } from '../actions/profile';

class ProfileContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction, profile } = this.props;
        if (!profile.length) {
            profileLoadAction();
        }
    }

    handleUserSend = (user) => {
        const { profileId, profileUserSendAction } = this.props;

        profileUserSendAction({
            ...user,
            profileId,

        });
    }
    handleProfileAdd = () => {
        const { profileAddAction, lastId, redirect } = this.props;
        const login = prompt('Введите логин', 'Login1');

        if (login) {
            profileAddAction(lastId, login);
            redirect(lastId);
        } else {
            alert('Введите логин');
        }
    }

    handleReloadProfile = () => {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    };
    handleProfilelete = () => {
        const { profileDeleteAction, profileId } = this.props;
        console.log(profileId);
        profileDeleteAction(profileId);
        // if (chatId > 0) {
        //     chatsDeleteAction(chatId);
        //     redirect(chatId - 1);
        // }
        // else {
        //     chatsDeleteAction(chatId);
        //     redirect(chatId + 1);
        // };
    }

    render() {
        const { user, isLoading, isError } = this.props;

        return <Profile handleReloadProfile={this.handleReloadProfile}
            isError={isError}
            isLoading={isLoading}
            user={user}
            handleUserSend={this.handleUserSend}
            handleProfileAdd={this.handleProfileAdd}
            handleProfilelete={this.handleProfilelete} />
    }
}

function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const profile = state.profile.entries;

    let user = null;

    if (match && profile[match.params.id]) {
        user = profile[match.params.id].user;
    }
    const lastId = Object.keys(profile).length ? Object.keys(profile).length : 0;
    return {
        user,
        profile,
        profileId: match ? match.params.id : null,
        lastId,
        isLoading: state.profile.loading,
        isError: state.profile.error,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: () => dispacth(profileLoadAction()),
        profileUserSendAction: (user) => dispacth(profileUserSendAction(user)),
        profileAddAction: (newProfileId, login) => dispacth(profileAddAction(newProfileId, login)),
        profileDeleteAction: (profileId) => dispacth(profileDeleteAction(profileId)),
        redirect: (id) => dispacth(push(`/profile/${id}`)),
    };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);