import Homepage from './Homepage';
import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup, getByTestId, getByAltText } from '@testing-library/react';
import {jest} from '@testing-library/jest-dom'
import renderer from "react-test-renderer"
import { BrowserRouter } from 'react-router-dom';
import ImageSlide from './ImageSlide'

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<BrowserRouter><Homepage/></BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('image1 is loaded in image slider', () => {
    const {getAllByTestId} = render(<BrowserRouter><Homepage><ImageSlide/></Homepage></BrowserRouter>)
    const slide1 = getAllByTestId('slide1')
    expect(slide1[0]).toHaveAttribute('src', 'images/hotelimage1.jpg')
    expect(slide1[1]).toHaveAttribute('src', 'images/hotelimage1.jpg')
})
test('image2 is loaded in image slider', () => {
    const {getAllByTestId} = render(<BrowserRouter><Homepage><ImageSlide/></Homepage></BrowserRouter>)
    const slide2 = getAllByTestId('slide2')
    expect(slide2[0]).toHaveAttribute('src', 'images/hotelimage2.jpg')
    expect(slide2[1]).toHaveAttribute('src', 'images/hotelimage2.jpg')
    expect(slide2[2]).toHaveAttribute('src', 'images/hotelimage2.jpg')
})
test('image3 is loaded in image slider', () => {
    const {getAllByTestId} = render(<BrowserRouter><Homepage><ImageSlide/></Homepage></BrowserRouter>)
    const slide3 = getAllByTestId('slide3')
    expect(slide3[0]).toHaveAttribute('src', 'images/hotelimage3.jpeg')
    expect(slide3[1]).toHaveAttribute('src', 'images/hotelimage3.jpeg')
    expect(slide3[2]).toHaveAttribute('src', 'images/hotelimage3.jpeg')
})

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<BrowserRouter><Homepage/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})
