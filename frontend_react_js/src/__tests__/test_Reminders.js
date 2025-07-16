import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RemindersSend from "../components/reminders/RemindersSend";

const customers = [
  { id: 11, name: "Mary", email: "m@m.com" },
  { id: 12, name: "Rob", email: "r@r.com" }
];

describe("RemindersSend", () => {
  it("renders customers as selectable checkboxes", () => {
    render(<RemindersSend customers={customers} onSendReminders={() => {}} />);
    expect(screen.getByText(/send payment reminders/i)).toBeInTheDocument();
    customers.forEach(c => {
      const label = `Select ${c.name} (${c.email}) for reminder`;
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("enables and disables button correctly", () => {
    render(<RemindersSend customers={customers} onSendReminders={() => {}} />);
    const sendBtn = screen.getByText(/send reminders/i);
    expect(sendBtn).toBeDisabled();
    fireEvent.click(
      screen.getByLabelText('Select Mary (m@m.com) for reminder')
    );
    expect(sendBtn).not.toBeDisabled();
  });

  it("calls onSendReminders with selected customer IDs", () => {
    const spy = jest.fn();
    render(<RemindersSend customers={customers} onSendReminders={spy} />);
    fireEvent.click(
      screen.getByLabelText('Select Mary (m@m.com) for reminder')
    );
    fireEvent.click(
      screen.getByLabelText('Select Rob (r@r.com) for reminder')
    );
    fireEvent.click(screen.getByText(/send reminders/i));
    expect(spy).toHaveBeenCalledWith([11, 12]);
  });
});
