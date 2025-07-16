import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BalanceSheetView from "../components/balance/BalanceSheetView";
import ExportToPDF from "../components/balance/ExportToPDF";
import ExportToExcel from "../components/balance/ExportToExcel";

describe("BalanceSheetView", () => {
  const balances = [
    { customerName: "C1", credit: 100, debit: 50, balance: 50 },
    { customerName: "C2", credit: 500, debit: 200, balance: 300 }
  ];
  it("renders table of balances", () => {
    render(<BalanceSheetView balances={balances} onExportPDF={() => {}} onExportExcel={() => {}} />);
    expect(screen.getByText("C1")).toBeInTheDocument();
    expect(screen.getByText("C2")).toBeInTheDocument();
    expect(screen.getByText("Balance Sheet")).toBeInTheDocument();
    expect(screen.getByText(/Export to PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/Export to Excel/i)).toBeInTheDocument();
  });
  it("shows empty state", () => {
    render(<BalanceSheetView balances={[]} onExportPDF={() => {}} onExportExcel={() => {}} />);
    expect(screen.getByText(/no records/i)).toBeInTheDocument();
  });
});

describe("ExportToPDF", () => {
  it("calls onExport if button clicked", () => {
    const spy = jest.fn();
    render(<ExportToPDF onExport={spy} data={[1]} />);
    fireEvent.click(screen.getByText(/download pdf/i));
    expect(spy).toHaveBeenCalledWith([1]);
  });
});

describe("ExportToExcel", () => {
  it("calls onExport if button clicked", () => {
    const spy = jest.fn();
    render(<ExportToExcel onExport={spy} data={[2]} />);
    fireEvent.click(screen.getByText(/download excel/i));
    expect(spy).toHaveBeenCalledWith([2]);
  });
});
