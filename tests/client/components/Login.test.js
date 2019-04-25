import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../../src/client/components/Login';

it('Login renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Login/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

