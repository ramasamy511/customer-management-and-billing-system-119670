import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomerList from "../../components/customers/CustomerList";

// Mock the fetchCustomers API
jest.mock("../../api", () => ({
  fetchCustomers: jest.fn()
}));

const mockCustomers = [
  { id: 1, name: "Alice", email: "alice@example.com", company: "Acme" },
  { id: 2, name: "Bob", email: "bob@some.com", company: "" },
];

describe("CustomerList", () => {
  beforeEach(() => {
    require("../../api").fetchCustomers.mockClear();
  });

  it("renders list of customers and handles empty state", async () => {
    require("../../api").fetchCustomers.mockResolvedValueOnce(mockCustomers);

    render(
      <CustomerList onView={jest.fn()} onEdit={jest.fn()} />
    );
    expect(screen.getByText(/loading customers/i)).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.queryByText(/no customers found/i)).toBeNull();
  });

  it("calls onView and onEdit props when action buttons clicked", async () => {
    const onView = jest.fn(), onEdit = jest.fn();
    require("../../api").fetchCustomers.mockResolvedValueOnce(mockCustomers);

    render(<CustomerList onView={onView} onEdit={onEdit} />);
    fireEvent.click(await screen.findByText("View"));
    expect(onView).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(onEdit).toHaveBeenCalledWith(1);
  });

  it("renders empty message when customers array is empty", async () => {
    require("../../api").fetchCustomers.mockResolvedValueOnce([]);
    render(<CustomerList onView={() => {}} onEdit={() => {}} />);
    expect(await screen.findByText(/no customers found/i)).toBeInTheDocument();
  });
});
