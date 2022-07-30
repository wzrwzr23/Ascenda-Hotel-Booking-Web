import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import { render, fireEvent, screen } from "@testing-library/react";
const { default: Booking } = require("./Booking");

let container = null
beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it("renders booking data", async () => {
    const fakeBooking = {
        salutation: "Miss",
        firstName:"Namitha",    //test: with missing field
        lastName: "Justine",    //test:with missing field
        phoneNumber: "gde3432e2",
        emailAddress: "namitha@gmail.com", //test: "namitha@gmail": without the .com
        billingAddress: "25 Root"
    }
    // jest.spyOn(global, "fetch").mockImplementation(() =>
        
    // );

    // Use the asynchronous version of act to apply resolved promises
    await act(function Component() {
        render(<Booking/>, container);
    });

    expect(container.querySelector("div").textContent).toBe(fakeBooking.firstName);
    expect(container.textContent).toBe(fakeBooking.address);
    expect(container.textContent).toBe(fakeBooking.emailAddress);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});