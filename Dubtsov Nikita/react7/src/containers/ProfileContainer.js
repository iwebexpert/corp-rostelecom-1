import React, { useEffect } from "react"
import { connect } from "react-redux"
import { nanoid } from "nanoid"

import Profile from "components/Profile/Profile"
import { profileLoadAction } from "../actions/profile"

function ProfileContainerFunc({ profile, profileLoadAction }) {
  useEffect(() => {
    profileLoadAction()
  }, [])

  return <Profile profile={profile} />
}

function mapStateToProps(state, ownProps) {
  const { match } = ownProps
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

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerFunc)
