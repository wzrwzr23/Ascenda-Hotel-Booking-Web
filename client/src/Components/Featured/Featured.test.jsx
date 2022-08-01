import Featured from './Featured';
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<Featured/>, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('renders and displays number of properties', () => {
    render(<Featured />);
    const linkElement = screen.getByText(/Doha/i);
    expect(linkElement).toBeInTheDocument();
  });