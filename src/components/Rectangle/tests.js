import React from 'react';
import Rectangle from './index';
import {shallow} from 'enzyme';

test('Should render Rectangle', () => {
    const wrapper = shallow(
        <Rectangle width={40} height={40} x={0} y={10} />
    );

    expect(wrapper).toMatchSnapshot();
});
