import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Profile } from 'components/Profile';

class ProfileContainerClass extends Component {
    render() {
        return <Profile {...this.props} />
    }
}

function mapStateToProps(state) {
    const profile = state.profile;
    return {
        profile,
        loading: false,
        error: false,
    };
}

function mapDispatchToProps(dispacth) {
    return {};
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);
