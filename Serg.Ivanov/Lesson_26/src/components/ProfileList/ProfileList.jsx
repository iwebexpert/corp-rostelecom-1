import React, { Component } from 'react';

import { User } from 'components/User';

import './ProfileList.css';

export class ProfileList extends Component {
    render() {
        const items = this.props.items.map((item) => (<User name={item.name} age={item.age} from={item.from} />));

        return (
            <ul className="profile-list">
                {items}
            </ul>
        );
    }
}