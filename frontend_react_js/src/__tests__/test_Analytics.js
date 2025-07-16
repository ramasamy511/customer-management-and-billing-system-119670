import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/analytics/Dashboard";
import TopBuyers from "../components/analytics/TopBuyers";
import TopProducts from "../components/analytics/TopProducts";
import FrequentPurchase from "../components/analytics/FrequentPurchase";

describe("Dashboard", () => {
  it("shows loading state if overview is null", () => {
    render(<Dashboard overview={null} />);
    expect(screen.getByText(/loading overview/i)).toBeInTheDocument();
  });
  it("renders fields for real data", () => {
    render(<Dashboard overview={{
      totalCustomers: 20,
      outstandingAmount: 1234,
      totalInvoices: 15
    }} />);
    expect(screen.getByText(/Total Customers:/)).toHaveTextContent("Total Customers: 20");
    expect(screen.getByText(/Outstanding Amount:/)).toHaveTextContent("Outstanding Amount: 1234");
    expect(screen.getByText(/Total Invoices:/)).toHaveTextContent("Total Invoices: 15");
  });
});

describe("TopBuyers", () => {
  it("shows list of buyers", () => {
    const buyers = [{ name: "B1", totalPurchases: 800 }];
    render(<TopBuyers buyers={buyers} />);
    expect(screen.getByText(/B1/i)).toBeInTheDocument();
    expect(screen.getByText(/₹800/)).toBeInTheDocument();
  });
  it("shows empty if none", () => {
    render(<TopBuyers buyers={[]} />);
    expect(screen.getByText(/no buyers/i)).toBeInTheDocument();
  });
});

describe("TopProducts", () => {
  it("shows products", () => {
    render(<TopProducts products={[{ name: "A", quantitySold: 12 }]} />);
    expect(screen.getByText(/A/i)).toBeInTheDocument();
    expect(screen.getByText(/\(12\)/)).toBeInTheDocument();
  });
  it("shows empty if none", () => {
    render(<TopProducts products={[]} />);
    expect(screen.getByText(/no products/i)).toBeInTheDocument();
  });
});

describe("FrequentPurchase", () => {
  it("shows purchase list", () => {
    const purchases = [{ customerName: "Foo", productName: "Bar", count: 9 }];
    render(<FrequentPurchase purchases={purchases} />);
    expect(screen.getByText(/Foo: Bar \(9 times\)/i)).toBeInTheDocument();
  });
  it("shows no data", () => {
    render(<FrequentPurchase purchases={[]} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
