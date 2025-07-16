import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("App global behaviors", () => {
  it("renders sidebar and routes", () => {
    render(<App />);
    // Main sidebar/navigation/title should appear
    expect(screen.getByText(/Cust & Bill/)).toBeInTheDocument();
    // Module navigation buttons visible
    expect(screen.getByRole("button", { name: /customers/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /billing/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /payments/i })).toBeInTheDocument();
  });
  it("allows toggling theme between light and dark", () => {
    render(<App />);
    const themeBtn = screen.getByLabelText(/switch to dark mode/i);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    fireEvent.click(themeBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    // Button text switches mode, too
    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });
});
