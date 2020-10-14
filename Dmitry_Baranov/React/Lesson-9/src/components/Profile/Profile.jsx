import React from 'react';

import './Profile.css';

export const Profile = ({name, age, email, isError, isLoading}) => {

    if (isError) {
        return (<div>Не удалось загрузить профиль пользователя...</div>);
    }

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    return (<div className="profile-window">
        <ul className="profile-list">
            <li>Имя: {name}</li>
            <li>Возраст: {age}</li>
            <li>Email: {email}</li>
        </ul>
    </div>);
};