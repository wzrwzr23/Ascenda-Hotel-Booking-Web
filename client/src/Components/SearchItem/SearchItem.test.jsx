import SearchItem from './SearchItem'
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"
import { BrowserRouter, Routes } from "react-router-dom";

afterEach(cleanup);

it("renders",()=>{
    render(<BrowserRouter><SearchItem/></BrowserRouter>)
})

it("renders and shows 'See Availabibility' button", ()=>{
    render(<BrowserRouter><SearchItem></SearchItem></BrowserRouter>);
    expect(screen.getByRole('button', {name: /See availability/i, hidden: true})).toBeEnabled();
    // expect(screen.getByText(/See availability/i, {selector: 'button'}));
})

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<BrowserRouter><SearchItem></SearchItem></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})

