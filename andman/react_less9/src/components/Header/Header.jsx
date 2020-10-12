import React from 'react';
//import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import './Header.css';

const AvaDiv = ({ profile, isLoading, isError }) => {
    if (isError) {
        return (
            <div className="ava">
                <div>Не удалось загрузить профиль...</div>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div className="ava">
                <div>Loading...</div>
            </div>
        );
    }
    return (
        <div className="ava">
            <Avatar alt="Avatar" src={profile.avatar} />
            <Link to="/profile" key={profile.id} >
                {profile.name}
            </Link>
        </div>
    );

}

export const Header = ({ profile, isLoading, isError }) => {
    return (
        <div className="menu">
            <h2>Messenger</h2>
            <AvaDiv isError={isError} isLoading={isLoading} profile={profile} />
        </div >
    );
}