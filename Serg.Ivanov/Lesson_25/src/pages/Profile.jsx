import React from 'react';
import { profile } from '../helpers/profilesData';

export function Profile() {
    return (
        <div>Profile page
            <ul>
                <li>
                    Name: {profile[0].name}
                </li>
                <li>
                    Age: {profile[0].age}
                </li>
                <li>
                    From: {profile[0].from}
                </li>

            </ul>
        </div>
    );
}