import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../../src/client/components/Search';

it('Search renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Search/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

