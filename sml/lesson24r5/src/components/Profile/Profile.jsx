import React from 'react';

export const Profile = ({name, age, email, isError, isLoading}) => {

    if(isError){
        return (<div>Не удалось загрузить профиль пользователя...</div>);
    }

    if(isLoading){
        return (<div>Loading...</div>);
    }

    return (<div>
        <ul>
            <li>Имя: {name}</li>
            <li>Возраст: {age}</li>
            <li>E-mail: {email}</li>
        </ul>
    </div>);
};