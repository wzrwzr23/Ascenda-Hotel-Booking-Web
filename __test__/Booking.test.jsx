import React from "react";
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Booking from "./Booking";
import TestRenderer from 'react-test-renderer';
import Navbar from "../../Components/Navbar/Navbar";
import { render, fireEvent, screen } from "@testing-library/react";


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
});

it("renders Booking", async () => {

    const Bookingtest = {
        destinationID: "destId",
        hotelID: "hotelId",
        bookingInfo: {
          noNight: 2,
          startDate: "checkInDate",
          endDate: "checkOutDate",
          noAdult: 2,
          noChildren: 2,
          roomType: "hotelRoomType",
          
        },
        
        guestInformation: {
          userID: "uid",
          salutation: "Ms",
          firstName: "firstName",
          lastName: "lastName",
          email: "yu@gmail.com",
          phone: 12345678,
          country: "country",
        },
        payeeInformation: {
          paymentID: "",
          payeeID: "uid",
        },
        uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      };
      
    
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(Bookingtest)
        })
    );
    const testRenderer = TestRenderer.create(<Booking/>)
    const testInstance = testRenderer.root;

    expect(testInstance.findByProps({className: "booking"})).toContain(<Navbar/>);

    // Use the asynchronous version of act to apply resolved promises
    await act(function Component() {
        render(<RoomSearch hotelID="0KmN"/>, container);
    });

    expect(container.querySelector("div").textContent).toBe(Bookingtest.destinationID);
    expect(container.textContent).toContain(Bookingtest.hotelID);
    expect(container.textContent).toContain(Bookingtest.userID);
    expect(container.textContent).toContainHTML(Bookingtest.description);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});


