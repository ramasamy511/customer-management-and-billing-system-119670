import React from "react";
import { render, screen } from "@testing-library/react";
import Topbar from "../components/Topbar";

describe("Topbar", () => {
  it("renders the provided title", () => {
    render(<Topbar title="Something" />);
    expect(screen.getByText("Something")).toBeInTheDocument();
  });
  it("renders actions if provided", () => {
    render(<Topbar title="T" actions={<button>Act</button>} />);
    expect(screen.getByRole("button", { name: "Act" })).toBeInTheDocument();
  });
});
