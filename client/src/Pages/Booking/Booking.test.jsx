import React from "react";
import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import { BrowserRouter, Routes } from "react-router-dom";
const { default: Booking } = require("./Booking");
import ReactDOM from 'react-dom'
import renderer from "react-test-renderer"

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(
        <BrowserRouter><Booking></Booking></BrowserRouter>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})

test('renders and displays User Details', () => {
    render(<BrowserRouter><Booking></Booking></BrowserRouter>);
    const linkElement = screen.getByText(/User Details/i);
    expect(linkElement).toBeInTheDocument();
});

it("renders and shows hopepage link", ()=>{
    render(<BrowserRouter><Booking></Booking></BrowserRouter>);
    expect(screen.getByRole('link', {name: /Ascenda Hotel Booking/i, hidden: true})).toBeEnabled();
    // expect(screen.getByText(/See availability/i, {selector: 'button'}));
})

it("renders and shows option Miss", ()=>{
    render(<BrowserRouter><Booking></Booking></BrowserRouter>);
    expect(screen.getByRole('option', {name: /Miss/i, hidden: true})).toBeEnabled();
    // expect(screen.getByText(/See availability/i, {selector: 'button'}));
})

test("renders and checks if submit button enabled", async ()=>{
    render(<BrowserRouter><Booking></Booking></BrowserRouter>);
    expect(await screen.findByRole('button', { name: /Submit/i })).toBeEnabled();
})

describe('Destination search input: Typing', () => {
    test('search box updates on change', () => {
        const {queryByPlaceholderText} = render(<BrowserRouter><Booking/></BrowserRouter>);
        const searchInput = queryByPlaceholderText('MM/YY');
        fireEvent.change(searchInput, {target: {value: "03/22"}});
        // userEvent.type(searchInput, 'test')
        expect(searchInput.value).toBe("03/22");
    });
})

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<BrowserRouter><Booking/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})

// let container = null
// beforeEach(()=>{
//     container = document.createElement("div");
//     document.body.appendChild(container);
// })

// afterEach(()=>{
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// })

// it("renders booking data", async () => {
//     const fakeBooking = {
//         salutation: "Miss",
//         firstName:"Namitha",    //test: with missing field
//         lastName: "Justine",    //test:with missing field
//         phoneNumber: "gde3432e2",
//         emailAddress: "namitha@gmail.com", //test: "namitha@gmail": without the .com
//         billingAddress: "25 Root"
//     }
//     // jest.spyOn(global, "fetch").mockImplementation(() =>
        
//     // );

//     // Use the asynchronous version of act to apply resolved promises
//     await act(function Component() {
//         render(<Booking/>, container);
//     });

//     expect(container.querySelector("div").textContent).toBe(fakeBooking.firstName);
//     expect(container.textContent).toBe(fakeBooking.address);
//     expect(container.textContent).toBe(fakeBooking.emailAddress);

//     // remove the mock to ensure tests are completely isolated
//     global.fetch.mockRestore();
// });