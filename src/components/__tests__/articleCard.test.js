import React from 'react';

import ArticleCard from '../ArticleCard';
import {shallow, configure} from 'enzyme'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
// configure({adapter: new Adapter()});

describe('test', () => {
  test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<ArticleCard
    // labelOn="On" labelOff="Off" 
    />);

    expect(checkbox.hasClass('foot-ja')).toBe(true)
    // .hasClass('foot-js').toBe(true)
    // .toEqual('Off');

    // checkbox.find('input').simulate('change');

    // expect(checkbox.text()).toEqual('On');
  });
})
  