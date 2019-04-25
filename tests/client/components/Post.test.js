import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../../../src/client/components/Post';

it('Post renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Post/>, div);

    // logic...

    ReactDOM.unmountComponentAtNode(div);
});

