import React from 'react'
import {Profile} from './Profile'

describe('Profile Test', () => {
    it('should render Profile snapshot', function () {
        const container = (<Profile profile={{author: 'Test',  age: '25'}}/>)
        const wrapper = render(container)
        expect(wrapper).toMatchSnapshot()
    })
})