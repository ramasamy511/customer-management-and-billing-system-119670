import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppShell.css";

const navConfig = [
  { name: "Dashboard", path: "/", icon: "🏠" },
  { name: "Customers", path: "/customers", icon: "👤" },
  { name: "Invoices", path: "/invoices", icon: "🧾" },
  { name: "Payments", path: "/payments", icon: "💳" },
  { name: "Analytics", path: "/analytics", icon: "📊" },
  { name: "Reports", path: "/reports", icon: "📄" },
  { name: "Exports", path: "/exports", icon: "⬇️" },
  { name: "Reminders", path: "/reminders", icon: "🔔" },
];

export default function AppShell({ children, theme, toggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`aside ${sidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <span role="img" aria-label="logo">🧾</span>
          <span className="brand">Billing</span>
        </div>
        <nav>
          {navConfig.map(route => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end={route.path === "/"}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="icon">{route.icon}</span>{route.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main">
        <header className="top-bar">
          <button
            className="sidebar-toggle"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen(v => !v)}
          >≡</button>
          <div className="actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >{theme === "light" ? "🌙" : "☀️"}</button>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
