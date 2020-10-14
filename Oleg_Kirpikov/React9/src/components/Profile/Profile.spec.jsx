import React from 'react';
import { Profile } from './Profile';

describe('Profile component', () => {
    it('should render Profile component ', () => {
        const component = shallow(<Profile profile={{ author: 'WebDev', text: '1234' }} />);
        expect(component).toMatchSnapshot();
    });
});