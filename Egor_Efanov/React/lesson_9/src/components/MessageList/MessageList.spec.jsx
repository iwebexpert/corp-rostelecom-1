import React from 'react';
import { MessageList } from './MessageList';

describe('MessageList component', () => {
    it('should render MessageList component (1)', () => {
        const component = shallow(<MessageList
            items={[{ author: 'WebDev', text: '1234' }, { author: 'WebDev2', text: 'Test1' }]} />);
        expect(component).toMatchSnapshot();
    });

    it('should render MessageList component (2)', () => {
        const component = render(<MessageList
            items={[{ author: 'WebDev', text: '1234' }, { author: 'WebDev2', text: 'Test1' }]} />);
        expect(component).toMatchSnapshot();
    });
}); 