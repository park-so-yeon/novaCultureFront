import React from 'react';
import { Outlet } from 'react-router-dom';
import './admin.css';
import AdminHeader from './AdminHeader';
import SideMenu from './SideMenu';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <SideMenu isAdmin={true} />
      <div className="admin-main-area">
        <AdminHeader />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}