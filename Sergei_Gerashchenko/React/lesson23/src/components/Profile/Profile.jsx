import React, {Component} from 'react';
import classNames from 'classnames';

import './Profile.scss';

export class Profile extends Component {

    render(){
        console.log(this.props);
        const {profile} = this.props;
        console.log(profile);
        return (
        <div>
            <div>Имя: {profile.entries.name}</div>
            <div>Возраст: {profile.entries.age}</div>
            <div>Почта: {profile.entries.email}</div>
        </div>
        );
    }
}