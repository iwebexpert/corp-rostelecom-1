import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { Profile } from 'components/Profile';
import { profileLoadAction } from '../actions/profile';

class ProfileContainerClass extends Component {
  componentDidMount() {
    const { profileLoadAction } = this.props;
    profileLoadAction();
  }
  handleReloadProfile = () => {
    const { profileLoadAction } = this.props;
    profileLoadAction();
  };
  render() {
    const { profile, isError, isLoading } = this.props;

    return <Profile profile={profile} handleReloadProfile={this.handleReloadProfile}
      isError={isError}
      isLoading={isLoading} />
  }
}

function mapStateToProps(state, ownProps) {

  const { match } = ownProps;
  const profile = state.profile.entries;
  return {
    profile,
    isError: state.profile.error,
    isLoading: state.profile.loading,
  };
}

function mapDispatchToProps(dispacth) {
  return {
    profileLoadAction: () => dispacth(profileLoadAction()),
  };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);
