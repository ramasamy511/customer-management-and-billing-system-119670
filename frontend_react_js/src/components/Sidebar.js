import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ routes, activePath, onNavigate }) {
  /** 
   * Sidebar navigation for main modules.
   * routes: [{ path: "/customers", label: "Customers", icon?: JSX }]
   * activePath: current location.pathname
   * onNavigate: function to trigger navigation on click
   */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🧾</span>
        <span className="sidebar-title">Cust & Bill</span>
      </div>
      <nav className="sidebar-nav">
        {routes.map((route) => (
          <button
            key={route.path}
            className={`sidebar-link${activePath === route.path ? " active" : ""}`}
            onClick={() => onNavigate(route.path)}
          >
            {route.icon && <span className="sidebar-icon">{route.icon}</span>}
            {route.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a className="sidebar-footer-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
          Help
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
