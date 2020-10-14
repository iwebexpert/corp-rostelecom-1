import { profileLoadAction, PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS } from './profile';

describe('profile fetch actions', () => {
    it('should get  profile', async () => {
        const data = {
            "title": 'Chat1',
            "email": "Test@test.ru",
            "about": "TEST",
            "image": "https://img2.wtftime.ru/store/2020/09/08/6ZW02821.jpg"
        };
        global.fetch = jest.fn().mockResolvedValue({
            json: () => (data),
        });

        const dispatch = jest.fn();

        await profileLoadAction()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenCalledWith({
            type: PROFILE_LOAD_REQUEST,
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: PROFILE_LOAD_SUCCESS,
            payload: data
        });
    });
});