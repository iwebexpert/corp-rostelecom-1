//TODO
import React, { Component } from 'react';
import { connect } from 'react-redux'; // это контейнер
import { nanoid } from 'nanoid';

import { Profile } from 'components/Profile';
import { profileLoadAction } from '../actions/profile';

class ProfileContainerClass extends Component {

  componentDidMount() {
    const { profileLoadAction } = this.props;
    profileLoadAction();
  }

  render() {
    console.log('profileContainer' + this.props)
    const { profile } = this.props;

    return <Profile profile={profile} />
  }
}

// достает данные из store
function mapStateToProps(state, ownProps) {
  console.log('state', state);
  // const { match } = ownProps;
  const profile = state.profile.entries;

  return {
    profile,
  };
}

// оборациваем экшен
function mapDispatchToProps(dispacth) {
  return {
    profileLoadAction: () => dispacth(profileLoadAction()),
  };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);