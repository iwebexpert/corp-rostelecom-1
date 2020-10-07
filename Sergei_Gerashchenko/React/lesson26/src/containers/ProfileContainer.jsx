import React, { Component } from 'react';
import {connect} from 'react-redux';
import {profileLoadAction} from '../actions/profile';
import {Profile} from "../components/Profile";

class ProfileContainerClass extends Component{

    componentDidMount(){
        const {profileLoadAction} = this.props;
        profileLoadAction();
    }

    render(){
        const {profile} = this.props;
        return <Profile profile={profile} />
    }
}

function mapStateToProps(state, ownProps){
    const {match} = ownProps;
    const profile = state.profile;

    return {profile};
}

function mapDispatchToProps(dispatch){
    return {
        profileLoadAction: () => dispatch(profileLoadAction())
    };
}
export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);