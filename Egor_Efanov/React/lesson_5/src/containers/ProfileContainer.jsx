import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

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



function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: () => dispacth(profilleLoadAction()),


    };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass); 