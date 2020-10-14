import { profileReducer } from './profile';
import { profileRequestAction, profileSuccessAction } from '../actions/profile';
import { FormatAlignJustifyOutlined } from '@material-ui/icons';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    })
);

describe('profileReducer', () => {
    it('Request action', async () => {
        const store = {
            entries: [],
            loading: true,
            error: false,
        };
        const result = [
            {
                id: 0,
                firstName: "James",
                lastName: "Bond",
                title: "Agent 007",
                email: "mi6@london.uk",
                description: "Bond. James Bond",
                avatar: "https://avatarfiles.alphacoders.com/123/thumb-12304.jpg"
            }];

        let action = profileRequestAction();
        expect(action).toMatchObject({ type: "[Profile] Request" });

        let newState = profileReducer(store, action);
        expect(newState).toMatchObject({ loading: true });


        action = profileSuccessAction(result);
        expect(action).toMatchObject({ type: "[Profile] Success", payload: [{ "firstName": "James" }] });

        newState = profileReducer(newState, action);

        expect(newState).toMatchObject(
            { profile: { "firstName": "James" } }
        );

        //const profileSuccessAction(await result.json())
    })
})
