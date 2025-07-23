import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const AdminUsers = () => {
  return (
    <div>
      <NavbarStrip role="admin" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        {/* User management table goes here */}
      </div>
    </div>
  );
};

export default AdminUsers;