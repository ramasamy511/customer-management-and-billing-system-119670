import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InvoiceList from "../../components/billing/InvoiceList";

const invoices = [
  {
    id: 1, invoiceNumber: "INV1", customerName: "Alice", date: "2024-01-02",
    totalAmount: 500, status: "Open"
  },
  {
    id: 2, invoiceNumber: "INV2", customerName: "Bob", date: "2024-01-03",
    totalAmount: 700, status: "Paid"
  },
];

describe("InvoiceList", () => {
  it("renders list of invoices", () => {
    render(<InvoiceList invoices={invoices} onCreate={jest.fn()} onView={jest.fn()} />);
    expect(screen.getByText("INV1")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    // Use role for all "View" buttons
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    expect(viewButtons.length).toBe(2);
  });

  it("calls onCreate and onView when buttons clicked", () => {
    const onCreate = jest.fn(), onView = jest.fn();
    render(<InvoiceList invoices={invoices} onCreate={onCreate} onView={onView} />);
    fireEvent.click(screen.getByRole('button', { name: /create invoice/i }));
    expect(onCreate).toHaveBeenCalled();
    // Second "View" button is for id:2
    const viewBtns = screen.getAllByRole('button', { name: /view/i });
    fireEvent.click(viewBtns[1]);
    expect(onView).toHaveBeenCalledWith(2);
  });

  it("shows empty state for no invoices", () => {
    render(<InvoiceList invoices={[]} onCreate={jest.fn()} onView={jest.fn()} />);
    expect(screen.getByText(/no invoices found/i)).toBeInTheDocument();
  });
});
