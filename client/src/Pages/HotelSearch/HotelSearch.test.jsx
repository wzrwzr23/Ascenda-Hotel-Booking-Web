import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import HotelSearch from "./HotelSearch";
import TestRenderer from 'react-test-renderer';
import Navbar from "../../Components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import DestinationSearch from "./../DestinationSearch/DestinationSearch"
import ReactDOM from 'react-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react';


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    cleanup
});

it("renders without crashing", ()=>{
    const div = document.createElement("div")
    render(<BrowserRouter><HotelSearch/></BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})

// it("renders hotel data", async () => {
//     const fakeHotelN = {
//         name: "Oryx Rotana Hotel",
//         rating: "4.3",
//         address: "Marina Bay",
//         city: "Singapore",
//         country: "Singapore",

//         description: "Hotel with air conditioning",
//         image_details: {
//             "suffix": ".jpg",
//             "count": 56,
//             "prefix": "https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768"
//         },
//         default_image_index: 1,
//     };
//     jest.spyOn(global, "fetch").mockImplementation(() =>
//         Promise.resolve({
//             json: () => Promise.resolve(fakeHotelN)
//         })
//     );
//     console.log(fakeHotelN)
//     const testRenderer = TestRenderer.create(<BrowserRouter><HotelSearch/></BrowserRouter>)
//     const testInstance = testRenderer.root;

//     // const button = screen.getByText('More');
//     // expect(button).toBeInTheDocument();

//     // expect(testInstance.findByProps({className: "HotelSearch"})).toContain(Navbar);

//     // Use the asynchronous version of act to apply resolved promises
//     await act(function Component() {
//         render(<BrowserRouter><DestinationSearch dest_ID="0KmN"/></BrowserRouter>, container);
//     });

//     expect(container.querySelector("div").textContent).toBe(fakeHotelN.name);
//     expect(container.textContent).toContain(fakeHotelN.latitude);
//     expect(container.textContent).toContain(fakeHotelN.address);
//     expect(container.textContent).toContainHTML(fakeHotelN.description);

//     // remove the mock to ensure tests are completely isolated
//     global.fetch.mockRestore();
// });

