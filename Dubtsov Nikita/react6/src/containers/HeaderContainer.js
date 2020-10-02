import React, { useEffect } from "react"
import { connect } from "react-redux"

import Header from "components/Header/Header"
import { profileLoadAction } from "../actions/profile"

function HeaderContainerFunc({ profile, profileLoadAction }) {
  useEffect(() => {
    profileLoadAction()
  }, [])

  return <Header user={profile} />
}

function mapStateToProps(state) {
  const users = state.users.entries

  let profile = users[0]

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
