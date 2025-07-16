import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerView from "../../components/customers/CustomerView";

describe("CustomerView", () => {
  const sample = { id: 77, name: "Test C", email: "x@x.net", company: "Brand" };
  it("renders customer fields", () => {
    render(<CustomerView customer={sample} />);
    expect(screen.getByText("Test C")).toBeInTheDocument();
    expect(screen.getByText("x@x.net")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText(/customer details/i)).toBeInTheDocument();
  });
  it("shows 'No customer selected' if no customer", () => {
    render(<CustomerView />);
    expect(screen.getByText(/no customer selected/i)).toBeInTheDocument();
  });
  it("fires onEdit and onBack if passed", () => {
    const onEdit = jest.fn(), onBack = jest.fn();
    render(<CustomerView customer={sample} onEdit={onEdit} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(onEdit).toHaveBeenCalledWith(77);
    expect(onBack).toHaveBeenCalled();
  });
});
