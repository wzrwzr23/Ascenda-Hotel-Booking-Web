import React from "react";
import {unmountComponentAtNode} from "react-dom";
import Enzyme, { shallow } from 'enzyme';
import {act} from "react-dom/test-utils";
import Error from './Error'
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
    render(<BrowserRouter><Error/></BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('renders and displays 404', () => {
    render(<BrowserRouter><Error/></BrowserRouter>);
    const linkElement = screen.getByText(/404/i);
    expect(linkElement).toBeInTheDocument();
  });

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<BrowserRouter><Error/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})