import React, { Component } from 'react';

export class ProfilePage extends Component {

    render() {

        const { profile, isLoading, isError } = this.props;
        if (isError) {
            return (
                <div>Не удалось загрузить профиль...</div>
            );
        }
        if (isLoading) {
            return (
                <div>Profile loading...</div>
            );
        }
        return (
            <div>
                <h2>Profile page</h2>
        E - mail: {profile.email} <hr />
        Логин: {profile.name} < hr />
                <img src={profile.avatar} width="200px" height="200px" />
            </div >
        );

    };
}