import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiOutlineShieldCheck,
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineLogout,
} from 'react-icons/hi';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-brand-icon">
            <HiOutlineShieldCheck />
          </div>
          <span className="navbar-brand-text">AuthFlow</span>
        </div>

        <div className="navbar-nav">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="nav-dashboard"
          >
            <HiOutlineViewGrid />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="nav-profile"
          >
            <HiOutlineUser />
            <span>Profile</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="btn-logout"
            id="btn-logout"
          >
            <HiOutlineLogout />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
