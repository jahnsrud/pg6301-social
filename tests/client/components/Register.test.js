import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../../../src/client/components/Register';

it('Search renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Register/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

