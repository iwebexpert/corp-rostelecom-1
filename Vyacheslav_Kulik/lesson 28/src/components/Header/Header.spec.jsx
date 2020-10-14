import React from 'react'
import {Header} from './Header'
import {MemoryRouter} from 'react-router-dom'


describe('Header Test', () => {
    it('should render Header snapshot', function () {
        const container = (<Header/>)
        const wrapper = render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        )
        expect(wrapper).toMatchSnapshot()
    })
})