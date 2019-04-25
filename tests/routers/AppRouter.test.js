import React from "react";
import AppRouter from '../../src/client/routers/AppRouter';
import App from '../../src/client/components/App';
import ErrorPage from '../../src/client/components/ErrorPage';

jest.dontMock('../App');


test('invalid path should redirect to 404', () => {
    const wrapper = mount(
        <AppRouter initialEntries={[ '/invalid-link' ]}>
            <App/>
        </AppRouter>
    );
    expect(wrapper.find(App)).toHaveLength(0);
    expect(wrapper.find(ErrorPage)).toHaveLength(1);
});