import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerSearch from "../../components/customers/CustomerSearch";

// Test for CustomerSearch filter utility
describe("CustomerSearch", () => {
  it("renders input and calls onSearch prop on input change", () => {
    const onSearch = jest.fn();
    render(<CustomerSearch onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search customers/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Acme" } });
    expect(onSearch).toHaveBeenCalledWith("Acme");

    fireEvent.change(input, { target: { value: "Widgets" } });
    expect(onSearch).toHaveBeenCalledWith("Widgets");
  });

  it("input changes local value", () => {
    render(<CustomerSearch onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/search customers/i);
    fireEvent.change(input, { target: { value: "ZZ" } });
    expect(input.value).toBe("ZZ");
  });
});
