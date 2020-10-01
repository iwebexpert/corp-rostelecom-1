import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import './Header.css';

export class Header extends Component {

    render() {
        const { profile } = this.props;
        console.log(profile);
        return (
            <div className="menu">
                <h2>Messenger</h2>
                <div className="ava">
                    <Avatar alt="Avatar" src={profile.avatar} />
                    <Link to="/profile" key={profile.id} >
                        {/* <ListItemText primary={profile.name} key={profile.id} /> */}
                        {profile.name}
                    </Link>
                </div>

            </div >
        );
    }
}