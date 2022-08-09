import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Payment from "./Payment";
import { BrowserRouter } from "react-router-dom";
import TestRenderer from 'react-test-renderer';
import Navbar from "../../Components/Navbar/Navbar";
import { render, fireEvent, screen } from "@testing-library/react";
import ReactDOM from 'react-dom'

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(
        <BrowserRouter><Payment></Payment></BrowserRouter>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})


// it('renders correctly', () => {
//     const {getByTestId, queryByPlaceholderText} = render(<BrowserRouter><Payment/></BrowserRouter>);
   
//     expect(queryByPlaceholderText('CardName')).toBeTruthy();
//     expect(queryByPlaceholderText('CardNumber')).toBeTruthy();
//     expect(queryByPlaceholderText('CardCVV')).toBeTruthy();
//     expect(queryByPlaceholderText('CardExpM')).toBeTruthy();
//     expect(getByTestId('Submit')).toBeTruthy();
    
// })
// test('renders and displays User Details', () => {
//     render(<BrowserRouter><Booking></Booking></BrowserRouter>);
//     const linkElement = screen.getByText(/CardName/i);
//     expect(linkElement).toBeInTheDocument();
// });

// describe('Card Name', () => {
//     test('search box updates on change', () => {
//         const {queryByPlaceholderText} = render(<BrowserRouter><Payment/></BrowserRouter>);
//         const searchInput = queryByPlaceholderText('CardName');
//         expect(screen.getByDisplayValue('test').id).toBe('CardName');
//     });
// })
// describe('Card Number', () => {
//     test('search box updates on change', () => {
//         const {queryByPlaceholderText} = render(<BrowserRouter><Payment/></BrowserRouter>);

//         const activeComponent = getByTestId( 'CardNumber' );
//   expect( activeComponent ).toHaveTextContent( 'Cardholder Name' );
//        const searchInput = queryByPlaceholderText('CardNumber');
//       //  fireEvent.change(searchInput, {target: {value: "test"}});
//         // userEvent.type(searchInput, 'test')
//       //  expect(searchInput.value).toBe("test");
//     });
// })
// describe('Card CVV', () => {
//     test('search box updates on change', () => {
//         const {queryByPlaceholderText} = render(<BrowserRouter><Payment/></BrowserRouter>);
//         const searchInput = queryByPlaceholderText('CardCVV');
//       //  fireEvent.change(searchInput, {target: {value: "test"}});
//         // userEvent.type(searchInput, 'test')
//         expect(searchInput.value).toBe("test");
//     });
// })

test("renders and checks if submit button enabled", async ()=>{
    render(<BrowserRouter><Payment></Payment></BrowserRouter>);
    expect(await screen.findByRole('button', { name: /Submit/i })).toBeEnabled();
})




  
