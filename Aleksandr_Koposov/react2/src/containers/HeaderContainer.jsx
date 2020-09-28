import React, { Component } from 'react'
import { connect } from 'react-redux'

import { profileLoadAction } from 'actions/profile'

import { Header } from 'components/Header'

class HeaderContainerClass extends Component {
  componentDidMount() {
    this.props.profileLoadAction()
  }

  render() {
    const { user, children } = this.props
    return <Header user={user}>{children}</Header>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.profile.entries
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileLoadAction: () => dispatch(profileLoadAction())
  }
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainerClass)
