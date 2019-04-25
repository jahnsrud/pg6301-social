import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../../src/client/components/Header';

it('Search renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Header/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

