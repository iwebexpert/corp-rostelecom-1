import { shallow } from 'enzyme';
import React from 'react';
import { Profile } from './Profile';

//it
test('Simple test', () => {
    const a = 3;
    expect(a + 2).toBe(5);
});

test('should be rendered Profile', () => {
    const prof = {
        "title": 'Chat1',
        "email": "Test@test.ru",
        "about": "TEST",
        "image": "https://img2.wtftime.ru/store/2020/09/08/6ZW02821.jpg"
    };
    const component = shallow(<Profile profile={prof} handleReloadProfile={null}
        isError={false}
        isLoading={false} />);
    /*
     console.log(component);
      const wrapper1 = component.find('Typography');
      console.log(wrapper1.length);*/
    /* expect(wrapper1.length).toBe(3);
     expect(wrapper1.last().text()).toBe('TEST');
     expect(wrapper1.first().text()).toBe('Test@test.ru');*/
    expect(component).toMatchSnapshot();
});

