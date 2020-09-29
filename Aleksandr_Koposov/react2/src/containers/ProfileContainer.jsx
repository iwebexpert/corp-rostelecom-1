import React, { Component } from 'react'
import { connect } from 'react-redux'

import { profileLoadAction, profileUpdateAction } from 'actions/profile'

import { Profile } from 'components/Profile'

class ProfileContainerClass extends Component {
  componentDidMount() {
    this.props.profileLoadAction()
  }

  onSave = (data) => {
    this.props.profileUpdateAction(data)
  }

  render() {
    return <Profile
      user={this.props.user || {}}
      onSave={this.onSave}
    />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.profile.entries || {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileLoadAction: () => dispatch(profileLoadAction()),
    profileUpdateAction: (user) => dispatch(profileUpdateAction(user)),
  }
}

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerClass)
