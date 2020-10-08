import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Profile } from 'components/Profile';
import { profileLoadAction } from '../actions/profile';

export const ProfileContainer = () => {
    const dispacth = useDispatch();

    const profile = useSelector((state) => state.profile.entries);
    const [isLoading, isError] = useSelector((state) => ([state.profile.loading, state.profile.error]));

    useEffect(() => {
        dispacth(profileLoadAction());
    }, []);

    return <Profile {...profile} isLoading={isLoading} isError={isError} />;
}