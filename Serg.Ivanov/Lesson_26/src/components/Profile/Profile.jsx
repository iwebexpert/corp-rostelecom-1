import React, { Component } from 'react';
// import { nanoid } from 'nanoid';

import { ProfileList } from 'components/ProfileList';
import { ProfileForm } from 'components/ProfileForm';

import './Profile.css';
// import { profile } from '../../helpers/profilesData';

export class Profile extends Component {
    render() {
        const { user, handleUserSend, isLoading, isError, handleReloadProfile, handleProfileAdd } = this.props;

        if (isError) {
            return (<div>Не удалось загрузить профили... <button onClick={handleReloadProfile}>Загрузить повторно</button></div>);
        }

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        return (
            <div className="profile">
                <button onClick={handleProfileAdd}>Добавить новый профиль</button>
                {user ? <ProfileList items={user} /> : 'Пожалуйста, выберите профиль слева'}
                {user && <ProfileForm onSend={handleUserSend} />}
            </div>
        );
    }
}