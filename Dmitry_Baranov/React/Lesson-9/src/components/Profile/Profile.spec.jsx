import React from 'react';
import {Profile} from './Profile';

describe('Profile component', () => {
    it('should render Profile component (1)', () => {
        const component = shallow(<Profile name='WebDev' age='35' from='Moscow'/>);
        expect(component).toMatchSnapshot();
    });

    it('should render MessageList component (2)', () => {
        const component = render(<Profile name='WebDev' age='35' from='Moscow'/>);
        expect(component).toMatchSnapshot();
    });
});