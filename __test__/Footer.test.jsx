import React from 'react';
 import { shallow } from 'enzyme';
 import Footer from './Footer';
 import Adapter from 'enzyme-adapter-react-15';
 
 describe('Footer component should render as expected', () => {
   const component = shallow(<Footer />);
 
   it('should contain the word "Address', () => {
    expect(component.contains('Address')).toBe(true);
  });

  
});
