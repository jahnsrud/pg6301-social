import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../src/client/components/App';
import { shallow } from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');

it('App renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('App starts with zero posts', () => {
    it('starts with a count of 0', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state.posts.count === 0).toEqual(0);
    });
});