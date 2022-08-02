import Navbar from './Navbar'
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<Navbar></Navbar>, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('renders and displays Ascenda', () => {
    render(<Navbar />);
    const linkElement = screen.getByText(/Ascenda/i);
    expect(linkElement).toBeInTheDocument();
});

it("renders with button Register", ()=>{
    render(<Navbar/>);
    const button = screen.getByTestId("navRegister");
    expect(button).toBeInTheDocument();
})

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<Navbar/>).toJSON();
    expect(tree).toMatchSnapshot();
})

