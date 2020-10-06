import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import './Header.css';

const AvaDiv = class extends Component {

    render() {
        const { profile, isLoading, isError } = this.props;
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

}

export class Header extends Component {

    render() {
        const { profile, isLoading, isError } = this.props;
        return (
            <div className="menu">
                <h2>Messenger</h2>
                <AvaDiv isError={isError} isLoading={isLoading} profile={profile} />
            </div >
        );
    }
}