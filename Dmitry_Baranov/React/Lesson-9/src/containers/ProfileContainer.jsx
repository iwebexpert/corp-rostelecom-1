import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Profile} from 'components/Profile';
import {profileLoadAction} from '../actions/profile';
import {chatsLoadAction} from "../actions/chats";

export const ProfileContainer = () => {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.entries);
    const [isLoading, isError] = useSelector((state) => ([state.profile.loading, state.profile.error]));

    useEffect(() => {
        if (!profile.length) { //  проверка, чтобы при переходе между страницами не сбрасывалось состояние, где хранятся чаты и сообщения
            dispatch(profileLoadAction());
        }
    }, []);

    return <Profile {...profile} isLoading={isLoading} isError={isError}/>;
}