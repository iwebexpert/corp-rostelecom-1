import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadProfileAction } from 'actions/profile'

import { Header } from 'components/Header'

export const HeaderContainer = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const user = useSelector((state) => state.profile.entries)
  useEffect(() => {
    if (!user) {
      dispatch(loadProfileAction())
    }
  }, [])
  return <Header user={user}>{children}</Header>
}
