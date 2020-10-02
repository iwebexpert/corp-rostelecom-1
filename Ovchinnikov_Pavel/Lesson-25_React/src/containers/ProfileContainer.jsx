import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Profile } from 'pages/Profile';
import { profileLoadAction } from '../actions/profile';

class ProfileContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    }

    render() {
        const { profile } = this.props;

        return <Profile profile={profile} />
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
    };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass); 