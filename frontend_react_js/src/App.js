import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, BrowserRouter } from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AppRouter, { appRoutes } from './components/Router';

// Responsive multi-panel main layout with topbar, sidebar and main content
function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Pick current title from routes
  const currentRoute = appRoutes.find((r) => r.path === location.pathname);
  const title = currentRoute ? currentRoute.label : "App";

  return (
    <div className="main-root">
      <Sidebar
        routes={appRoutes}
        activePath={location.pathname}
        onNavigate={navigate}
      />
      <div className="main-content-wrap">
        <Topbar title={title} />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      {/* Global Theme Toggle Button (float on top-right) */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
