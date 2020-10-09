import {
    saveProfileAction,
    loadProfileRequest,
    loadProfileSuccess
} from 'store/actions/profile'

describe('Update profile fetch', () => {
    it('Should update profile', async () => {
        const data = {
            id: 1,
            name: "Test New User Name",
            age: 10,
            about: "Lorem ipsum, dolor sit",
            avatar: ''
        }
        global.fetch = jest.fn().mockResolvedValue({
            json: () => (data),
        })

        const dispatch = jest.fn()

        await saveProfileAction()(dispatch)

        expect(dispatch).toHaveBeenCalledTimes(2)

        expect(dispatch).toHaveBeenCalledWith({
            type: loadProfileRequest.toString(),
        })

        expect(dispatch).toHaveBeenCalledWith({
            type: loadProfileSuccess.toString(),
            payload: data
        })
    })
})
