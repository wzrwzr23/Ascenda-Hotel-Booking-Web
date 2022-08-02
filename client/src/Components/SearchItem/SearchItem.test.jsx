import SearchItem from './SearchItem'
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"

afterEach(cleanup);

// it("renders without crashing", ()=>{
//     const div = document.createElement("div")
//     render(
//         <SearchItem>
//         </SearchItem>
//     , div)
//     ReactDOM.unmountComponentAtNode(div)
// })

// it("renders and shows Book Now! button", ()=>{
//     render(<SearchItem></SearchItem>);
//     expect(screen.getByRole('button', {name: /See availability/i, hidden: true})).toBeEnabled();
//     // expect(screen.getByText(/See availability/i, {selector: 'button'}));
// })