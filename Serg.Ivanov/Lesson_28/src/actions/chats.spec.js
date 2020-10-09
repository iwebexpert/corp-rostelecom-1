import {chatsLoadAction, CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS} from './chats';

describe('chat fetch actions', () => {
    it('should get all chats', async () => {
        const data = {chats: {0: {title: 'Chat1', id: 0, messages: []}}};
        global.fetch = jest.fn().mockResolvedValue({
            json: () => (data),
        });

        const dispatch = jest.fn();

        await chatsLoadAction()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenCalledWith({
            type: CHATS_LOAD_REQUEST,
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: CHATS_LOAD_SUCCESS,
            payload: data
        });
    });
});