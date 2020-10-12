import {profileReducer} from './profile'

describe('test reducer profileReducer', () => {
    it('test initialState profileReducer', function () {
        const initialState = {
            entries: {},
            loading: false,
            error: false
        }
        expect(profileReducer(undefined, {})).toEqual(initialState)
    })
    it('should handle LOAD_PROFILE/LOAD_PROFILE_REQUEST', function () {
        expect(profileReducer(undefined, {type: 'LOAD_PROFILE/LOAD_PROFILE_REQUEST'})).toEqual({
            entries: {},
            loading: true,
            error: false
        })
    })
    it('should handle LOAD_PROFILE/LOAD_PROFILE_SUCCESS', function () {
        const store = {
                entries: {},
                loading: true,
                error: false
        }
        const profile = {
            author: 'Test',
            age: '25'
        }
        expect(profileReducer(store, {type: 'LOAD_PROFILE/LOAD_PROFILE_SUCCESS', payload: profile})).toEqual({
            entries: profile,
            loading: false,
            error: false
        })
    });
})