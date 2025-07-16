import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentEntry from "../components/payments/PaymentEntry";
import PaymentMethods from "../components/payments/PaymentMethods";

describe("PaymentEntry", () => {
  const customers = [{ id: 1, name: "Test C" }];
  const invoices = [{ id: 99, invoiceNumber: "IN99" }];
  it("renders form fields", () => {
    render(<PaymentEntry customers={customers} invoices={invoices} onSave={() => {}} onCancel={() => {}} />);
    expect(screen.getByText(/record payment/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "" })).toBeInTheDocument(); // customer select
    expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
  });
  it("calls onSave with filled form on submit", () => {
    const onSave = jest.fn();
    render(<PaymentEntry customers={customers} invoices={invoices} onSave={onSave} onCancel={() => {}} />);
    fireEvent.change(screen.getByRole("combobox", { name: "customerId" }), { target: { value: "1", name: "customerId" } });
    fireEvent.change(screen.getByRole("combobox", { name: "invoiceId" }), { target: { value: "99", name: "invoiceId" } });
    fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: "300", name: "amount" } });
    fireEvent.change(screen.getByRole("combobox", { name: "method" }), { target: { value: "upi", name: "method" } });
    fireEvent.click(screen.getByText("Save Payment"));
    expect(onSave).toHaveBeenCalledWith({
      customerId: "1",
      invoiceId: "99",
      amount: "300",
      method: "upi"
    });
  });
  it("calls onCancel if cancel clicked", () => {
    const onCancel = jest.fn();
    render(<PaymentEntry customers={customers} invoices={invoices} onSave={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});

describe("PaymentMethods", () => {
  it("renders payment methods list, empty case", () => {
    render(<PaymentMethods methods={[]} onAdd={() => {}} onRemove={() => {}} />);
    expect(screen.getByText(/no payment methods/i)).toBeInTheDocument();
    expect(screen.getByText(/add method/i)).toBeInTheDocument();
  });
  it("renders and removes methods", () => {
    const spyRemove = jest.fn();
    render(<PaymentMethods methods={[{ type: "UPI", details: "upi@bank" }]} onAdd={() => {}} onRemove={spyRemove} />);
    expect(screen.getByText(/UPI/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Remove"));
    expect(spyRemove).toHaveBeenCalledWith(0);
  });
});
