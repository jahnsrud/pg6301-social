import React from 'react';
import ReactDOM from 'react-dom';
import Chat from '../../../src/client/components/Chat';

it('Search renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Chat/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

