import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/client/components/App';

it('App renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
