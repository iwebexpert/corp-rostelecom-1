import { createStore } from 'redux'
import { profileReducer } from 'store/reducers/profile'
import { loadProfileSuccess } from 'store/actions/profile'

describe('profileReducer', () => {
    const profile = {
        id: 1,
        name: "Test User Name",
        age: 10,
        about: "Lorem ipsum, dolor sit",
        avatar: ''
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
        const data = await newStore.dispatch(loadProfileSuccess(profile))
        expect(data).toMatchObject({
            type: loadProfileSuccess.toString()
        })
        expect(newStore.getState().entries).toMatchObject(profile)
    })
})
