import React, { useEffect } from "react"
import { connect } from "react-redux"

import Header from "components/Header/Header"
import { profileLoadAction } from "../actions/profile"

function HeaderContainerFunc({ profile, profileLoadAction }) {
  useEffect(() => {
    profileLoadAction()
  }, [])

  return <Header profile={profile} />
}

function mapStateToProps(state) {
  const profiles = state.profile.entries

  let profile = profiles[0]

  return {
    profile,
  }
}

function mapDispatchToProps(dispacth) {
  return {
    profileLoadAction: () => dispacth(profileLoadAction()),
  }
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainerFunc)
