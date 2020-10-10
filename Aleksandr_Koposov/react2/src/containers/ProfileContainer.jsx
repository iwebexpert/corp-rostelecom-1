import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadProfileAction, saveProfileAction } from 'actions/profile'

import { Profile } from 'components/Profile'

export const ProfileContainer = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProfileAction())
  }, [])

  const [user, isLoading] = useSelector((state) => ([
    state.profile.entries,
    state.profile.loading
  ]))

  const onSave = (data) => {
    dispatch(saveProfileAction(data))
  }

  return <Profile
    user={user || {}}
    isLoading={isLoading}
    onSave={onSave}
  />
}
