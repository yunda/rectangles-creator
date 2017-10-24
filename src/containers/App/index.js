import React, { Component } from 'react';
import Page from '../Page';
import { Provider } from 'react-redux';
import store from '../../store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Page />
            </Provider>
        );
    }
}

export default App;
