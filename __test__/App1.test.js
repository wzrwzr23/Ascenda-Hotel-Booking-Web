import { render, screen } from '@testing-library/react';
import App from './App';
describe("POST /api", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/api");
    expect(response.statusCode).toBe(200);
    // expect(response.body.error).toBe(null);
  });
});
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders the landing page', () => {
  render(<App />);
  
  expect(screen.getByRole("heading")).toHaveTextContent(/Ascenda/);
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a Destination");
  expect(await screen.findByRole("destination", { name: "Singapore"})).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  expect(screen.getByRole("img")).toBeInTheDocument();
  //to add more
});

test("should be able to search and display destination image results", async () => {
  render(<App />);
  
  //Simulate selecting an option and verifying its value
  const select = screen.getByRole("combobox");
  expect(await screen.findByRole("option", { name: "Singapore"})).toBeInTheDocument();
  userEvent.selectOptions(select, "Singapore");
  expect(select).toHaveValue("Singapore");
})
