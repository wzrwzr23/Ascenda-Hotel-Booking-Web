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

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<RoomList/>).toJSON();
    expect(tree).toMatchSnapshot();
})

// it("renders and shows Book Now! button", ()=>{
//     render(<RoomList></RoomList>);
//     // expect(screen.getByRole('button', {name: /Book Now!/i, hidden: true})).toBeEnabled();
//     expect(screen.getByText(/Book Now!/i, {selector: 'button'}));
// })