import { profileLoadAction } from './profile';

describe('profile fetch actions', () => {
    it('should get profile', async () => {
        const data = { profiles: { 0: { name: 'WebDev', from: 'Samara' } } };
        global.fetch = jest.fn().mockResolvedValue({
            json: () => (data),
        });

        const dispatch = jest.fn();

        await profileLoadAction()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenCalledWith({
            type: '[Profile] Request',
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: '[Profile] Success',
            payload: data
        });
    });
}); 