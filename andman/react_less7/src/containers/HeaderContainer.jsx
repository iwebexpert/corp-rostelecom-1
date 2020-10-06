import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Header } from 'components/Header';

import { profileLoadAction } from '../actions/profile';

class HeaderContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    }

    render() {
        const { profile, isLoading, isError } = this.props;

        return <Header profile={profile} isLoading={isLoading} isError={isError} />
    }
}

function mapStateToProps(state, ownProps) {

    const profile = state.profile.entries;


    return {
        profile,
        isLoading: state.profile.loading,
        isError: state.profile.error,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: () => dispacth(profileLoadAction()),
    };
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);