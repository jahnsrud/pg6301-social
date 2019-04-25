import React from 'react';
import ReactDOM from 'react-dom';
import CreatePost from '../../../src/client/components/CreatePost';

it('CreatePost renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<CreatePost/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

