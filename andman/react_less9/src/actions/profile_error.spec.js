import { profileLoadAction } from './profile';

describe('profile fetch actions', () => {
    it('not should get profile', async () => {
        const data = false;
        global.fetch = jest.fn().mockResolvedValue({
            //json: () => (data),
            j: () => (data),
        });

        const dispatch = jest.fn();

        await profileLoadAction()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: '[Profile] Request',
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: '[Profile] Failure',
            payload: expect.anything(),
            error: true,
        });
    });
});