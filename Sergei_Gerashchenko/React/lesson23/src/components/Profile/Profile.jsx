import React, {Component} from 'react';
import classNames from 'classnames';

import './Profile.scss';
import {profile} from '../../../helpers/profile'

export class Profile extends Component {
    // get direction(){
    //     return this.props.author === 'Bot' ? 'start' : 'end';
    // }

    render(){

        return (
        <div>
            <div>Имя: {profile.name}</div>
            <div>Возраст: {profile.age}</div>
            <div>Почта: {profile.email}</div>
        </div>
        );
    }
}