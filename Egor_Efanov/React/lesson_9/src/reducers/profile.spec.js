import { createStore } from 'redux'
import { profileReducer } from './profile'
import { profileSuccessAction } from '../actions/profile'

describe('profileReducer', () => {
    const profile = {
        id: 1,
        name: "Test",
        age: 25,
        from: "Samara"
    }

    it('Profile load action', async () => {
        const store = {
            entries: [],
            loading: false,
            error: false
        }
        global.fetch = jest.fn().mockResolvedValue({
            json: () => (data),
        })
        const newStore = createStore(profileReducer, store)
        const data = await newStore.dispatch(profileSuccessAction(profile))
        expect(data).toMatchObject({
            type: profileSuccessAction.toString()
        })
        expect(newStore.getState().entries).toMatchObject(profile)
    })
}) 