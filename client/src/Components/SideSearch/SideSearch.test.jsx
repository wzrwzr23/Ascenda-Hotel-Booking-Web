import React from "react";
import SideSearch from "./SideSearch";
import { render, fireEvent, queryByTestId, getByTestId, getByPlaceholderText} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import user from '@testing-library/user-event'
import renderer from "react-test-renderer"



it('renders correctly', () => {
    const {getByTestId, queryByPlaceholderText} = render(<BrowserRouter><SideSearch/></BrowserRouter>);
    expect(getByTestId('submit')).toBeTruthy();
    expect(getByTestId('guestminus')).toBeTruthy();
    expect(getByTestId('guestplus')).toBeTruthy();
    expect(getByTestId('roomminus')).toBeTruthy();
    expect(getByTestId('roomplus')).toBeTruthy();
    expect(getByTestId('userdate')).toBeTruthy();
    expect(queryByPlaceholderText('Search City')).toBeTruthy();
})

describe('Destination search input: Typing', () => {
    test('search box updates on change', () => {
        const {queryByPlaceholderText} = render(<BrowserRouter><SideSearch/></BrowserRouter>);
        const searchInput = queryByPlaceholderText('Search City');
        fireEvent.change(searchInput, {target: {value: "New Delhi"}});
        // userEvent.type(searchInput, 'test')
        expect(searchInput.value).toBe("New Delhi");
    });
})

describe('Guest count (+)', () => {
    test('guest count updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><SideSearch/></BrowserRouter>)
        const guestcount = getByTestId('guestno')
        fireEvent.click(getByTestId('guestplus'))
        expect(guestcount.value).not.toBe(1)
    })
})

describe('Guest count (-)', () => {
    test('guest count does not updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><SideSearch/></BrowserRouter>)
        const guestcount = getByTestId('guestno')
        fireEvent.click(getByTestId('guestminus'))
        expect(guestcount.value).toBe(undefined)
    })
})

describe('Room count (+)', () => {
    test('guest count updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><SideSearch/></BrowserRouter>)
        const guestcount = getByTestId('roomno')
        fireEvent.click(getByTestId('roomplus'))
        expect(guestcount.value).not.toBe(1)
    })
})

describe('Guest count (-)', () => {
    test('guest count does not updates on change', () => {
        const {getByTestId} = render(<BrowserRouter><SideSearch/></BrowserRouter>)
        const guestcount = getByTestId('roomno')
        fireEvent.click(getByTestId('roomminus'))
        expect(guestcount.value).toBe(undefined)
    })
})

it("matches snapshot", ()=>{ //if you change the code in footer, then this test will fail. if intentional, can update snapshot. if by mistake, undo the code
    const tree = renderer.create(<BrowserRouter><SideSearch/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})

// describe('Search button', () => {
//     test('empty destination does not trigger search(to give uid)', () => {
//         jest.spyOn(Alert, 'alert')
//         const {getByTestId, queryByPlaceholderText} = render(<BrowserRouter><DestinationSearch/></BrowserRouter>)
//         fireEvent.click(getByTestId('submit'))
//         expect(Alert.alert).toHaveBeenCalled()
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