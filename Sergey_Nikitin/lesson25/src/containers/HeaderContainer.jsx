import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import { Header } from 'components/Header';
import { profileLoadAction } from '../actions/profile';

class HeaderContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    }

    render() {
        const { profile, text, handleRedirect } = this.props;

        return <Header profile={profile} text={text} handleRedirect={this.handleRedirect} />
    }
    handleRedirect = () => {
        const { redirect } = this.props;

        redirect(`/profile`);
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
        redirect: (path) => dispacth(push(path))
    };
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);