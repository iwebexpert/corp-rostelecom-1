import React from 'react'
import { Profile } from 'components/Profile'

describe('Profile component', () => {
    const user = {
        id: 1,
        name: "Test User Name",
        age: 10,
        about: "Lorem ipsum, dolor sit",
        avatar: ''
    }

    it('should render Profile component', () => {
        const component = shallow(<Profile
            user={user || {}}
            isLoading={false}
        />)
        expect(component).toMatchSnapshot()
    })

    it('should render Profile without avatar prop', () => {
        user.avatar = null
        const component = shallow(<Profile
            user={user || {}}
            isLoading={false}
        />)
        expect(component).toMatchSnapshot()
    })

    it('should render Profile without user and with loading state', () => {
        const component = shallow(<Profile
            user={{}}
            isLoading={true}
        />)
        expect(component).toMatchSnapshot()
    })
})
