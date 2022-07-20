import React from "react";
import {unmountComponentAtNode} from "react-dom";
import Enzyme, { shallow } from 'enzyme';
import {act} from "react-dom/test-utils";
import Header from '../../Components/Header/Header'
import Adapter from 'enzyme-adapter-react-15';


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Header', () => {
    Enzyme.configure({ adapter: new Adapter() })
    it('should render text for h3', () => {
        const mProps = { config: { text: 'h3' } };
        const wrapper = shallow(<Header {...mProps}></Header>);
        expect(wrapper.find('h3').text()).toEqual('h1');

    });
});

