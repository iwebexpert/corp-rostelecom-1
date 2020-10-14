import { profileReducer } from './profile';
import { profileRequestAction, profileSuccessAction, profileFailureAction } from '../actions/profile';

describe('profileReducer', () => {
    it('profileSuccess action', () => {

        const action = profileRequestAction();

        const store = { entries: { 0: { name: 'WebDev', email: 'webdev@webdev.com', avatar: 'ava.jpg' } } };
        const newStore = profileReducer(store, action);

        //console.log('Proffff:', newStore);
        expect(newStore.entries[0]).toEqual(expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            avatar: expect.any(String),
        }));
        expect(newStore.loading).toBe(true);
        expect(newStore.error).toBe(false);

        const newStore2 = profileReducer(store, profileSuccessAction());
        expect(newStore2.loading).toBe(false);
        expect(newStore2.error).toBe(false);

        const newStore3 = profileReducer(store, profileFailureAction());

        expect(newStore3.loading).toBe(false);
        expect(newStore3.error).toBe(true);

    });
});