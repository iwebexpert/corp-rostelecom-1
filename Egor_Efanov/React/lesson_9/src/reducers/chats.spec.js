import { chatsReducer } from './chats';
import { chatsAddAction } from '../actions/chats';

describe('chatReducer', () => {
    it('addChat action', () => {
        const title = 'Chat5';
        const chatId = 5;
        const fire = 'unfire';
        const store = { entries: { 0: { title: 'Chat1', id: 0, messages: [], fire: 'unfire' } } };
        const action = chatsAddAction(chatId, title, fire);

        const newStore = chatsReducer(store, action);

        expect(Object.keys(newStore.entries)).toHaveLength(2);
        expect(newStore.entries).toMatchObject({ [chatId]: { title: title } });

        expect(newStore.entries[chatId]).toEqual({

            title: title,
            id: chatId,
            messages: [],
        });

        expect(newStore.entries[chatId]).toEqual(expect.objectContaining({

            title: expect.any(String),
            id: expect.any(Number),
            messages: expect.any(Array),
        }));
    });
}); 