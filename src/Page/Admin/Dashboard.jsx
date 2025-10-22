import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../Authentication/useAdmin";

const SidebarLink = ({ to, children, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
          : "text-gray-700 hover:bg-purple-50"
      }`
    }
  >
    {icon}
    <span className="text-sm font-medium">{children}</span>
  </NavLink>
);

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  // If not admin, show minimal message
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access denied</h2>
          <p className="text-gray-600">You must be an administrator to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>AdmitHub | Admin Dashboard</title>
      </Helmet>

      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content flex flex-col">
          <header className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <div>
                <h1 className="text-2xl font-bold text-purple-700">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 hidden md:block">Manage universities, admissions and users</p>
              </div>
            </div>

          </header>

          <main className="p-6">
            <div className="max-w-full mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay" />
          <aside className="w-80 bg-white border-r h-full p-6 flex flex-col gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">AH</div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">AdmitHub Admin</h2>
                <p className="text-xs text-gray-500">Control panel</p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <h3 className="text-xs text-gray-400 uppercase tracking-wide mb-4">Admin Tools</h3>
              
              <div className="flex flex-col justify-center gap-3 ">
                <SidebarLink to="/dashboard/adminHome" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-5 -mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0a9 9 0 1112.727 0L21 10"/>
                  </svg>
                }>Dashboard Home</SidebarLink>

                <SidebarLink to="/dashboard/addClass" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                }>Add University</SidebarLink>

                <SidebarLink to="/dashboard/manageUser" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.879 6.196"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                }>Manage Users</SidebarLink>

                <SidebarLink to="/dashboard/studentStatus" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0H5"/>
                  </svg>
                }>Admission Status</SidebarLink>

                <SidebarLink to="/" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.75z"/>
                  </svg>
                }>Go to Home</SidebarLink>
              
              </div>
            </nav>

            <footer className="text-xs text-gray-400">
              <p>Logged in as: <span className="text-gray-700 font-medium">Admin</span></p>
              <p className="mt-2">© {new Date().getFullYear()} AdmitHub</p>
            </footer>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;