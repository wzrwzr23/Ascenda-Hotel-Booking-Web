import React from "react";
import DestinationSearch from "./DestinationSearch";
import { render, fireEvent, queryByTestId, getByTestId, getByPlaceholderText} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import user from '@testing-library/user-event'

it('renders correctly', () => {
    const {getByTestId, queryByPlaceholderText} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>);
    // expect(getByTestId('submit')).toBeTruthy;
    expect(queryByPlaceholderText('Search City')).toBeTruthy;
})

describe('Destination search input: Typing', () => {
    test('search box updates on change', () => {
        const {queryByPlaceholderText} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>);
        const searchInput = queryByPlaceholderText('Search City');
        fireEvent.change(searchInput, {target: {value: "test"}});
        // userEvent.type(searchInput, 'test')
        expect(searchInput.value).toBe("test");
    });
})

describe('Guest count (+)', () => {
    test('guest count updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>)
        const guestcount = getByTestId('guestno')
        fireEvent.click(getByTestId('guestplus'))
        expect(guestcount.value).not.toBe(1)
    })
})

describe('Guest count (-)', () => {
    test('guest count does not updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>)
        const guestcount = getByTestId('guestno')
        fireEvent.click(getByTestId('guestminus'))
        expect(guestcount.value).toBe(undefined)
    })
})

describe('Room count (+)', () => {
    test('guest count updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>)
        const guestcount = getByTestId('roomno')
        fireEvent.click(getByTestId('roomplus'))
        expect(guestcount.value).not.toBe(1)
    })
})

describe('Guest count (-)', () => {
    test('guest count does not updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>)
        const guestcount = getByTestId('roomno')
        fireEvent.click(getByTestId('roomminus'))
        expect(guestcount.value).toBe(undefined)
    })
})

describe('Search button', () => {
    test('empty destination does not trigger search(to give uid)', () => {
        const onSearch = jest.fn()
        const {getByTestId, queryByPlaceholderText} = render(<BrowserRouter><DestinationSearch onSearch={onSearch}/></BrowserRouter>)
        fireEvent.click(getByTestId('submit'))
        expect(onSearch).not.toHaveBeenCalled()
    })
})

// DELETE IF DK //
// describe('Search button', () => {
//     test('onSearch is called when all fields are filled', () => {
//         const{queryByPlaceholderText} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>)
//         const userDest = queryByPlaceholderText('Search City')
//         user.type(userDest, 'Indochina War Memorial, Frejus, France')
//         user.click(getByTestId('guest-count'))
//     })
// })


// describe('Destination Result List: Clicking', () => {
//     test('results on the dropdown list can be clicked', () => {
//         const searchDest = jest.fn()
//         const {getByTestId} = render(<BrowserRouter><DestinationSearch searchDest={searchDest}/></BrowserRouter>);
//         fireEvent.click(getByTestId('filter-dest'));
//         expect(searchDest).toHaveBeenCalled()

//     })
// })

// describe('Destination search input: Empty input', () => {
//     test('does not show any destinations', () => {
//         const onSearch = jest.fn()
//         const {getByTestId} = render(<DestinationSearch/>);
//         fireEvent.change(getByTestId('searchinput'), {target: {value: ""}});
//         expect(onSearch).not.toHaveBeenCalled;
//     })
// })

// describe('Destination search input: Destination clicked', () => {
//     test('search box updates', () => {
//         // const onSearch = jest.fn();
//         const {getByTestId} = render(<DestinationSearch/>);
//         const searchInput = getByTestId('searchinput');
//         fireEvent.click(getByTestId('searchinput'));
//         expect(searchInput.value).toBe();
//     })
// })