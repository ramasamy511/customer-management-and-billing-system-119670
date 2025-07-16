import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";

const exampleRoutes = [
  { path: "/customers", label: "Customers" },
  { path: "/invoices", label: "Billing" },
  { path: "/payments", label: "Payments" }
];

describe("Sidebar", () => {
  it("renders navigation links for all routes", () => {
    render(<Sidebar routes={exampleRoutes} activePath="/customers" onNavigate={() => {}} />);
    expect(screen.getByText("Customers")).toBeInTheDocument();
    expect(screen.getByText("Billing")).toBeInTheDocument();
    expect(screen.getByText("Payments")).toBeInTheDocument();
  });

  it("highlights active navigation button", () => {
    render(<Sidebar routes={exampleRoutes} activePath="/invoices" onNavigate={() => {}} />);
    const activeBtn = screen.getByRole("button", { name: "Billing" });
    expect(activeBtn.className).toMatch(/active/);
  });

  it("calls onNavigate with correct route", () => {
    const navFn = jest.fn();
    render(<Sidebar routes={exampleRoutes} activePath="" onNavigate={navFn} />);
    fireEvent.click(screen.getByText("Payments"));
    expect(navFn).toHaveBeenCalledWith("/payments");
  });
});
