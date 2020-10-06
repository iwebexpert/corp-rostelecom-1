import React, { Component } from 'react';


export class Profile extends Component {
    render() {
        const profile = this.props.profile;
        console.log("profile:", profile);
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
                        Имя: {profile.name}
                    </li>
                    <li>
                        Возраст: {profile.age}
                    </li>
                    <li>
                        e-mail: {profile.email}
                    </li>

                </ul>
            </div>
        );
    }

}