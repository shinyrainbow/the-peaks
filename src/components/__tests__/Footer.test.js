import React from 'react';
import renderer from 'react-test-renderer';
// import { experiments } from 'webpack';
import Footer from '../Footer';
import {shallow, configure} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
// configure({adapter: new Adapter()});

describe('test', () => {
  test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<Footer
    // labelOn="On" labelOff="Off" 
    />);

    expect(checkbox.hasClass('foot-ja')).toBe(true)
    // .hasClass('foot-js').toBe(true)
    // .toEqual('Off');

    // checkbox.find('input').simulate('change');

    // expect(checkbox.text()).toEqual('On');
  });
})
  
// })
// test('Link changes the class when hovered', () => {
//   const component = renderer.create(
//     <Footer 
//     // p
//     // age="http://www.facebook.com">Facebook</Link>
//     />
//     ,
//   );

// expect(component)
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
// });