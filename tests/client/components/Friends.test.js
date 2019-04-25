import React from 'react';
import ReactDOM from 'react-dom';
import Friends from '../../../src/client/components/Friends';

it('Friends renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Friends/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

