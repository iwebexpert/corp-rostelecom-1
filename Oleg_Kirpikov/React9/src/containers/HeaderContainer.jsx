import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'components/Header';
import { profileLoadAction } from '../actions/profile';


export const HeaderContainer = (props) => {

    const profile = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileLoadAction());
    }, []);

    return <Header profile={profile} />;
}