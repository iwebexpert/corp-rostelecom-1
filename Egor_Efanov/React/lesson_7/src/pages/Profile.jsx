import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';


export class Profile extends Component {
    render() {
        const profile = this.props.profile;
        console.log(profile);
        const { isLoading, isError } = this.props;

        if (isError) {
            return (<div>Не удалось загрузить профиль...</div>);
        }

        if (isLoading) {
            return (<div>Loading...</div>);
        }
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

} 