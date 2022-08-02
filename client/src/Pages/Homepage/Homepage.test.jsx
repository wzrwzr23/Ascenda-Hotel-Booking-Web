import Homepage from './Homepage';
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<BrowserRouter><Homepage/></BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})

