import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-logo">SS</div>
                <h2>ServiceSphere</h2>
            </div>

            <div className="sidebar-profile">
                <div className="profile-avatar">U</div>
                <div className="profile-info">
                    <h4>Guest User</h4>
                    <span className="profile-role">Visitor</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/workers-dashboard" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                    <span className="link-icon">📊</span>
                    Control Center
                </NavLink>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')} end>
                    <span className="link-icon">🛠️</span>
                    Service Categories
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                    <span className="link-icon">📋</span>
                    My Requests
                </NavLink>
                <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                    <span className="link-icon">⭐</span>
                    Client Feedback
                </NavLink>
                <NavLink to="/saved" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                    <span className="link-icon">❤️</span>
                    Saved Services
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                    <span className="link-icon">⚙️</span>
                    Settings
                </NavLink>
                <div className="sidebar-link logout-link">
                    <span className="link-icon">🚪</span>
                    Logout
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
