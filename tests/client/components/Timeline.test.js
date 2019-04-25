import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from '../../../src/client/components/Timeline';

it('Search renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<Timeline/>, div);


    ReactDOM.unmountComponentAtNode(div);
});

