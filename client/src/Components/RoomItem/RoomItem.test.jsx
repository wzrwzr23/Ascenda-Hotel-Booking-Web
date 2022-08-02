import RoomList from './RoomItem';
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<RoomList/>, div)
    ReactDOM.unmountComponentAtNode(div)
})

// it("renders and shows Book Now! button", ()=>{
//     render(<RoomList></RoomList>);
//     // expect(screen.getByRole('button', {name: /Book Now!/i, hidden: true})).toBeEnabled();
//     expect(screen.getByText(/Book Now!/i, {selector: 'button'}));
// })