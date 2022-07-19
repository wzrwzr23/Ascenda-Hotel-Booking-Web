/*
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RoomSearch from "./RoomSearch";

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

it("renders user data", async () => {
    const fakeHotel = {
        name: "The Fullerton Hotel Singapore",
        latitude: 1.28624,
        longitude: 103.852889,
        address: "1 Fullerton Square",
        rating: 5,
        description: "<p><b>Property Location</b> <br />With a stay at The Fullerton Hotel Singapore, you'll be centrally located in Singapore, steps from Cavenagh Bridge and Anderson Bridge.  This 5-star hotel is close to Chinatown Heritage Center and <b>Universal Studios Singapore</b>®.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 400 individually furnished guestrooms, featuring refrigerators and plasma televisions. Complimentary wired and wireless Internet access keeps you connected, and satellite programming provides entertainment. Private bathrooms with separate bathtubs and showers feature deep soaking bathtubs and complimentary toiletries. Conveniences include phones, as well as laptop-compatible safes and desks.</p><p><b>Amenities</b> <br />Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool and a fitness center. This Colonial hotel also features complimentary wireless Internet access, concierge services, and gift shops/newsstands. Guests can get to nearby shops on the complimentary shuttle.</p><p><b>Dining</b> <br />Grab a bite at one of the hotel's 5 restaurants, or stay in and take advantage of 24-hour room service. Quench your thirst with your favorite drink at a bar/lounge. Buffet breakfasts are available for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include complimentary high-speed (wired) Internet access, a 24-hour business center, and limo/town car service. Planning an event in Singapore? This hotel has 7524 square feet (699 square meters) of space consisting of a conference center and meeting rooms. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and free self parking is available onsite.</p>",
        image_details: {
            "suffix": ".jpg",
            "count": 56,
            "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/"
        },
        default_image_index: 1,
        amenities_ratings: [
            {
                "name": "Location",
                "score": 96
            },
            {
                "name": "Wellness",
                "score": 95
            },
            {
                "name": "Service",
                "score": 91
            },
            {
                "name": "WiFi",
                "score": 87
            },
            {
                "name": "Vibe",
                "score": 86
            },
            {
                "name": "Breakfast",
                "score": 84
            },
            {
                "name": "Amenities",
                "score": 81
            },
            {
                "name": "Food",
                "score": 80
            },
            {
                "name": "Room",
                "score": 77
            },
            {
                "name": "Comfort",
                "score": 62
            }
        ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeHotel)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<RoomSearch id="0KmN" />, container);
    });

    expect(container.querySelector("summary").textContent).toBe(fakeHotel.name);
    expect(container.querySelector("strong").textContent).toBe(fakeHotel.latitude);

    expect(container.textContent).toContain(fakeHotel.address);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});*/
