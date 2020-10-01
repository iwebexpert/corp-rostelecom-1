import React from 'react';
import {profile} from '../helpers/profilesData';

export function ProfilePage() {
    return (
        <div>
            <h3>Profile page</h3>
            <ul>
                <li>Имя: {profile[0].name}</li>
                <li>Возраст: {profile[0].age}</li>
                <li>E-mail: {profile[0].email}</li>
            </ul>
        </div>
    );
}