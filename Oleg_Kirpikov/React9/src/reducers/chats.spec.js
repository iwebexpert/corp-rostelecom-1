import { chatsReducer } from './chats';
import { chatsAddAction } from '../actions/chats';

describe('chatReducer', () => {
    it('addChat action', () => {
        const title = 'Chat5';
        const chatId = 5;
        const store = { entries: [{ 0: { title: 'Chat1', id: 0, messages: [] } }] };
        const action = chatsAddAction(title);

        const newStore = chatsReducer(store, action);

        expect(Object.keys(newStore.entries)).toHaveLength(2);
        expect(newStore.entries[1]).toMatchObject({ "1": { title: title } });

        expect(newStore.entries[1]).toEqual({
            "1": {
                title: title,
                id: 1,
                messages: [],
            }
        });

        expect(newStore.entries[1]).toEqual(expect.objectContaining({
            "1": {
                title: expect.any(String),
                id: expect.any(Number),
                messages: expect.any(Array),
            }
        }));
    });
});