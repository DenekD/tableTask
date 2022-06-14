import { render, screen } from "./test-utils";
import { cleanup, fireEvent } from "@testing-library/react";

import App from "./App";
import InputId from "./components/InputId";

afterEach(cleanup);

// Input tests
describe("input tests", () => {
  it("input should be renderd in the document", () => {
    render(<InputId />);
    expect(screen.getByLabelText(/filter data by ID/i)).toBeInTheDocument();
  });

  it("input should display number value", () => {
    render(<App />);
    const input = screen.getByLabelText(/filter data by ID/i);
    fireEvent.change(input, { target: { value: 1 } });
    expect(screen.getByLabelText(/filter data by ID/i)).toHaveValue(1);
  });

  it("input should display number value 2", () => {
    render(<App />);
    const input = screen.getByLabelText(/filter data by ID/i);
    fireEvent.change(input, { target: { value: 2 } });
    expect(screen.getByLabelText(/filter data by ID/i).value).toBe("2");
  });

  it("input should display string value", () => {
    render(<App />);
    const input = screen.getByLabelText(/filter data by ID/i);
    fireEvent.change(input, { target: { value: "aaaa" } });
    expect(screen.getByLabelText(/filter data by ID/i)).toHaveValue(null);
  });

  it("should display error message when input value < 1", async () => {
    render(<App />);
    const input = await screen.findByLabelText(/filter data by ID/i);
    fireEvent.change(input, { target: { value: "0" } });
    const helperText = await screen.findByText(/id must be higher than 0/i);

    expect(helperText).toBeInTheDocument();
  });

  it("should display error message when input value > 6", async () => {
    render(<App />);
    const input = await screen.findByLabelText(/filter data by ID/i);
    fireEvent.change(input, { target: { value: 12 } });
    const helperText = await screen.findByText(/id must be smaller than/i);

    expect(helperText).toBeInTheDocument();
  });
});

// Pagination tests
describe("pagination tests", () => {
  it("should render pagination component", () => {
    render(<App />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});

// Table tests
describe("table tests", () => {
  it("should render table component", async () => {
    render(<App />);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("should fetched data with 'cerulean' text content", async () => {
    render(<App />);
    const item = await screen.findByText("cerulean");
    expect(item).toBeInTheDocument();
  });

  it("should table has 6 elements", async () => {
    render(<App />);
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(6);
  });
});
