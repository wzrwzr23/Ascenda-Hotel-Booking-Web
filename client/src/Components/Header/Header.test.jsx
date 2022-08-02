import React from "react";
import {unmountComponentAtNode} from "react-dom";
import Enzyme, { shallow } from 'enzyme';
import {act} from "react-dom/test-utils";
import Header from '../../Components/Header/Header'
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import renderer from "react-test-renderer"
// import Adapter from 'enzyme-adapter-react-16';


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
    cleanup
});

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<BrowserRouter><Header/></BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('renders and displays the title', () => {
    render(<BrowserRouter><Header/></BrowserRouter>);
    const linkElement = screen.getByText(/The place you come to explore all options/i);
    expect(linkElement).toBeInTheDocument();
  });

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<BrowserRouter><Header/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})

// describe('Header', () => {
//     Enzyme.configure({ adapter: new Adapter() })
//     it('should render text for h3', () => {
//         const mProps = { config: { text: 'h3' } };
//         const wrapper = shallow(<Header {...mProps}></Header>);
//         expect(wrapper.find('h3').text()).toEqual('h1');

//     });
// });
