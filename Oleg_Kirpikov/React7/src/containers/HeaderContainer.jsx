import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from 'components/Header';

import { profileLoadAction } from '../actions/profile';

class HeaderContainerClass extends Component {

    constructor(props) {
        super(props);
        const { profileLoadAction } = props;
        profileLoadAction();
    }


    render() {
        return <Header {...this.props} />
    }
}

function mapStateToProps(state) {
    const profile = state.profile;
    return {
        profile,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: (profile) => dispacth(profileLoadAction(profile)),
    };
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);
