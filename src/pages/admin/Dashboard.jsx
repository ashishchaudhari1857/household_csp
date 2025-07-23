import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const AdminDashboard = () => {
  return (
    <div>
      <NavbarStrip role="admin" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* KPIs, charts, and management panels go here */}
      </div>
    </div>
  );
};

export default AdminDashboard;