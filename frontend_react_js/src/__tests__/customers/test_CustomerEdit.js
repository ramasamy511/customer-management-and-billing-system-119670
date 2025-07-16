import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomerEdit from "../../components/customers/CustomerEdit";

describe("CustomerEdit", () => {
  it("renders form with provided customer data (edit mode)", () => {
    const customer = { id: 10, name: "Eve", email: "eve@ex.com", company: "Umbrella" };
    render(<CustomerEdit customer={customer} onSave={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByDisplayValue("Eve")).toBeInTheDocument();
    expect(screen.getByDisplayValue("eve@ex.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Umbrella")).toBeInTheDocument();
    expect(screen.getByText(/edit customer/i)).toBeInTheDocument();
  });

  it("renders blank form in add mode", () => {
    render(<CustomerEdit onSave={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByText(/add customer/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/full name/i)).toHaveValue("");
  });

  it("calls onSave with form values on submit", () => {
    const onSave = jest.fn();
    render(<CustomerEdit onSave={onSave} onCancel={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: "Test Name", name: "name" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "a@b.com", name: "email" } });
    fireEvent.change(screen.getByPlaceholderText(/company/i), { target: { value: "Inc", name: "company" } });
    fireEvent.click(screen.getByText("Save"));
    expect(onSave).toHaveBeenCalledWith({ name: "Test Name", email: "a@b.com", company: "Inc" });
  });

  it("calls onCancel when Cancel button is pressed", () => {
    const onCancel = jest.fn();
    render(<CustomerEdit onSave={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
