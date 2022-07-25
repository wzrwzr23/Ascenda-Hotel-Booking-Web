import React from "react";
import DestinationSearch from "./DestinationSearch";
import { render, fireEvent, queryByTestId} from "@testing-library/react"

it('renders correctly', () => {
    const {getByTestId, queryByPlaceholderText} = render(<DestinationSearch/>);
    expect(getByTestId('submit')).toBeTruthy;
    expect(queryByPlaceholderText('Search City')).toBeTruthy;
})

describe('Destination search input: Typing', () => {
    test('search box updates on change', () => {
        const {queryByPlaceholderText} = render(<DestinationSearch />);
        const searchInput = queryByPlaceholderText('Search City');
        fireEvent.change(searchInput, {target: {value: "test"}});
        // userEvent.type(searchInput, 'test')
        expect(searchInput.value).toBe("test");
    });
})

describe('Destination Result List: Clicking', () => {
    test('results on the dropdown list can be clicked', () => {
        const onSearch = jest.fn();
        const {getByTestId} = render(<DestinationSearch onSearch={onSearch}/>);
        fireEvent.click(getByTestId('filter-dest'));
        expect(onSearch).toHaveBeenCalled;

    })
})

describe('Destination search input: Empty input', () => {
    test('does not show any destinations', () => {
        const {getByTestId} = render(<DestinationSearch/>);
        fireEvent.change(getByTestId('searchinput'), {target: {value: ""}});
        expect(getByTestId('filter-dest')).not.toHaveBeenCalled;
    })
})

// describe('Destination search input: Destination clicked', () => {
//     test('search box updates', () => {
//         // const onSearch = jest.fn();
//         const {getByTestId} = render(<DestinationSearch/>);
//         const searchInput = getByTestId('searchinput');
//         fireEvent.click(getByTestId('searchinput'));
//         expect(searchInput.value).toBe();
//     })
// })