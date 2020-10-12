import { shallow } from 'enzyme';
import React from 'react';
import { ProfilePage } from './Profile';

const profile = { name: 'WebDev', email: 'webdev@webdev.com', avatar: 'ava.jpg' };

describe('ProfilePage component', () => {
    it('should render ProfilePage component (1)', () => {
        const component = shallow(<ProfilePage
            profile={profile}
            isLoading={false}
            isError={false}
        />);
        expect(component).toMatchSnapshot();
    });

    it('should render ProfilePage component (loading)', () => {
        const component = shallow(<ProfilePage
            profile={profile}
            isLoading={true}
            isError={false}
        />);
        expect(component).toMatchSnapshot();
    });

    it('should render ProfilePage component (error)', () => {
        const component = shallow(<ProfilePage
            profile={profile}
            isLoading={false}
            isError={true}
        />);
        expect(component).toMatchSnapshot();
    });

    it('should render ProfilePage component (loading & error)', () => {
        const component = shallow(<ProfilePage
            profile={profile}
            isLoading={true}
            isError={true}
        />);
        expect(component).toMatchSnapshot();
    });
});