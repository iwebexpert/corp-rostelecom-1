import React from 'react';
import { Profile } from 'components/Profile';
import { useDispatch, useSelector } from 'react-redux';

export const ProfileContainer = (props) => {
    const profile = useSelector((state) => state.profile);
    return <Profile profile={profile} />;
}
