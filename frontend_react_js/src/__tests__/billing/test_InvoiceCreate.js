import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InvoiceCreate from "../../components/billing/InvoiceCreate";

const mockCustomers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

describe("InvoiceCreate", () => {
  it("renders fields and fires onSave", () => {
    const onSave = jest.fn(), onCancel = jest.fn();
    render(
      <InvoiceCreate customers={mockCustomers} onSave={onSave} onCancel={onCancel} />
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1", name: "customerId" } });
    fireEvent.change(screen.getByPlaceholderText(/total amount/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2024-02-11" } });
    fireEvent.click(screen.getByText(/save invoice/i));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        customerId: "1",
        date: "2024-02-11",
        totalAmount: "123"
      })
    );
  });

  it("calls onCancel when Cancel pressed", () => {
    const onCancel = jest.fn();
    render(<InvoiceCreate customers={mockCustomers} onSave={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
