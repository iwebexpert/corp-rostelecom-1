import {changeProfileAction} from './profile'


describe('test profile actions', () => {
    it('changeProfileAction ', async function () {
            const data = {profile: {
                    entries: {
                        author: 'Test',
                        age: '25'
                    }
                }}
            global.fetch = jest.fn().mockResolvedValue({
                json: () => (data),
                ok: true
            })
            const dispatch = jest.fn()
            await changeProfileAction()(dispatch)
            expect(dispatch).toHaveBeenCalledTimes(2)
            expect(dispatch).toHaveBeenCalledWith({type: 'CHANGE_PROFILE/CHANGE_PROFILE_REQUEST'})
            expect(dispatch).toHaveBeenCalledWith({
                type: "CHANGE_PROFILE/CHANGE_PROFILE_SUCCESS",
                payload: data
            })

        }
    );
})