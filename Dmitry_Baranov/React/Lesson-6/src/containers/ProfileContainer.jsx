import React, {Component} from 'react';
import {connect} from 'react-redux';

import {profileLoadAction} from '../actions/profile';

class ProfileContainerClass extends Component {
    componentDidMount() {
        const {profileLoadAction} = this.props;
        profileLoadAction();
    }

    render() {
        const {profile} = this.props;

        return <ProfilePage profile={profile}/>
    }
}

function mapStateToProps(state, ownProps) {

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