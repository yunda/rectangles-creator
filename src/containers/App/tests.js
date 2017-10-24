import React from 'react';
import App from './index';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
    shallow(<App />);
});
