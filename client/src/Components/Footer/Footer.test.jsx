import Footer from './Footer'
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<Footer></Footer>, div)
    ReactDOM.unmountComponentAtNode(div)
})

it("renders using test id", ()=>{
    const {getByTestId} = render(<Footer/>)
    expect(getByTestId('footer'))
})

test('renders and displays Copyright', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Copyright/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders and displays Hotels', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Hotels/i);
    expect(linkElement).toBeInTheDocument();
  });

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<Footer/>).toJSON();
    expect(tree).toMatchSnapshot();
})