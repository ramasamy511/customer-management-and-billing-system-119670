import React from "react";
import "./Topbar.css";

// PUBLIC_INTERFACE
function Topbar({ title, actions }) {
  /** 
   * Top application bar for quick actions, notifications, profile.
   * title: current page/module name.
   * actions: optional right-aligned elements (e.g., buttons).
   */
  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">{actions}</div>
    </header>
  );
}

export default Topbar;
