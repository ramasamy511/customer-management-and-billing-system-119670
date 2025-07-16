import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InvoiceView from "../../components/billing/InvoiceView";

const sampleInvoice = {
  invoiceNumber: "I2",
  customerName: "Acme Corp",
  date: "2023-12-12",
  totalAmount: 2500,
  status: "Paid",
  items: [{ productName: "ItemA", quantity: 2, price: 100 }]
};

describe("InvoiceView", () => {
  it("shows invoice main fields and items", () => {
    render(<InvoiceView invoice={sampleInvoice} />);
    expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
    expect(screen.getByText(/2023-12-12/)).toBeInTheDocument();
    expect(screen.getByText(/Paid/)).toBeInTheDocument();
    expect(screen.getByText(/ItemA × 2 @ 100/)).toBeInTheDocument();
  });

  it("shows 'No invoice found' for missing invoice", () => {
    render(<InvoiceView />);
    expect(screen.getByText(/no invoice found/i)).toBeInTheDocument();
  });

  it("renders Back button and calls onBack", () => {
    const onBack = jest.fn();
    render(<InvoiceView invoice={sampleInvoice} onBack={onBack} />);
    fireEvent.click(screen.getByText("Back"));
    expect(onBack).toHaveBeenCalled();
  });
});
