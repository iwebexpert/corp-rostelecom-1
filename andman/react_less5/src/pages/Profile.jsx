import React, { Component } from 'react';

export class ProfilePage extends Component {

    render() {
        const { profile } = this.props;
        //console.log(profile);
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